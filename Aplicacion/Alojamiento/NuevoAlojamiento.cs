using Aplicacion.Documentos;
using Dominio;
using FluentValidation;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Alojamiento
{
    public class NuevoAlojamiento
    {
        public class Ejecuta : IRequest
        {
            public string Nombre { get; set; }

            public int Capacidad { get; set; }

            public decimal Precio { get; set; }
            public Guid ParqueId { get; set; }
            public bool Activo { get; set; }
            public Guid? AlojamientoId { get; set; }
            public ImagenGeneral ImagenAlojamiento { get; set; }
        }
        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Nombre).NotEmpty();
                RuleFor(x => x.Capacidad).NotEmpty();
                RuleFor(x => x.Precio).NotEmpty();
                RuleFor(x => x.ParqueId).NotEmpty();
                RuleFor(x => x.Activo).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly ParquesContext _context;
            public Manejador(ParquesContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                Guid _alojamientoId = Guid.NewGuid();
                if(request.AlojamientoId != null)
                {
                    _alojamientoId = request.AlojamientoId ?? Guid.NewGuid();
                }

                var alojamiento = new Dominio.Alojamiento
                {
                    AlojamientoId = _alojamientoId,
                    Capacidad = request.Capacidad,
                    ParqueId = request.ParqueId,
                    Activo = request.Activo,
                    Precio = request.Precio,
                    Nombre = request.Nombre
                };
                _context.Alojamiento.Add(alojamiento);
                if(request.ImagenAlojamiento != null)
                {
                    var imagen = new Documento
                    {
                        Contenido = Convert.FromBase64String(request.ImagenAlojamiento.Data),
                        NombreD = request.ImagenAlojamiento.Nombre,
                        ExtensionD = request.ImagenAlojamiento.Extension,
                        ObjetoReferencia = _alojamientoId,
                        DocumentoId = Guid.NewGuid(),
                        FechaCreacion = DateTime.UtcNow
                    };
                    _context.Documento.Add(imagen);
                }
                var result = await _context.SaveChangesAsync();
                if(result > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("No se ha podido agregar el alojamiento.");

            }
        }
    }
}
