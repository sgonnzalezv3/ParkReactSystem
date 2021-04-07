using Aplicacion.Documentos;
using Aplicacion.Parques;
using AutoMapper;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Alojamiento
{
    public class ActualizarAlojamiento
    {
        public class Ejecuta : IRequest
        {
            public string Nombre { get; set; }
            public int? Capacidad { get; set; }
            public decimal? Precio { get; set; }
            public bool? Activo { get; set; }
            public Guid Id { get; set; }
            public ImagenGeneral ImagenAlojamiento { get; set; }
        } 
        public class EjecutaValida : AbstractValidator<Ejecuta>
        {
            public EjecutaValida()
            {
                RuleFor(x=>x.Nombre).NotEmpty();
                RuleFor(x=>x.Capacidad).NotEmpty();
                RuleFor(x=>x.Precio).NotEmpty();
                RuleFor(x=>x.Activo).NotEmpty();
                RuleFor(x=>x.Id).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly IMapper _mapper;
            private readonly ParquesContext _context;
            public Manejador(IMapper mapper, ParquesContext context)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var alojamiento = await _context.Alojamiento.FindAsync(request.Id);
                var alojamientoId = alojamiento.AlojamientoId;
                if(alojamiento == null)
                {
                    throw new Exception("No existe el alojamiento seleccionado");
                }
                if(request.ImagenAlojamiento != null)
                {
                    var imagenExistente = await _context.Documento.Where(x => x.ObjetoReferencia == alojamientoId).FirstOrDefaultAsync();
                    if(imagenExistente == null)
                    {
                        var imagen = new Documento
                        {
                            Contenido = Convert.FromBase64String(request.ImagenAlojamiento.Data),
                            NombreD = request.ImagenAlojamiento.Nombre,
                            ExtensionD = request.ImagenAlojamiento.Extension,
                            ObjetoReferencia = alojamientoId,
                            DocumentoId = Guid.NewGuid(),
                            FechaCreacion = DateTime.UtcNow
                        };
                        _context.Documento.Add(imagen);
                    }
                    else
                    {
                        imagenExistente.Contenido = Convert.FromBase64String(request.ImagenAlojamiento.Data);
                        imagenExistente.NombreD = request.ImagenAlojamiento.Nombre;
                        imagenExistente.ExtensionD = request.ImagenAlojamiento.Extension;
                    }
                }
                    alojamiento.AlojamientoId = alojamiento.AlojamientoId;
                    alojamiento.Activo = request.Activo ?? alojamiento.Activo;
                    alojamiento.Capacidad = request.Capacidad ?? alojamiento.Capacidad;
                    alojamiento.Nombre = request.Nombre ?? alojamiento.Nombre;
                    alojamiento.Precio = request.Precio ?? alojamiento.Precio;
                
                var result = await _context.SaveChangesAsync();
                if(result > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("No se ha podido actualizar el alojamiento");

                

            }
        }
    }
}
