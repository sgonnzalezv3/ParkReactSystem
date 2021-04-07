using Aplicacion.Documentos;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Ecosistema
{
    public class ActualizarEcosistema
    {
        public class Ejecuta : IRequest
        {
            public Guid EcosistemaId { get; set; }
            public string Nombre { get; set; }
            public string NombreCientifico { get; set; }
            public string Descripcion { get; set; }
            public ImagenGeneral ImagenEcosistema { get; set; }
        }
        public class EjecutaValida : AbstractValidator<Ejecuta>
        {
            public EjecutaValida()
            {
                RuleFor(x=> x.Nombre).NotEmpty();
                RuleFor(x=> x.NombreCientifico).NotEmpty();
                RuleFor(x=> x.Descripcion).NotEmpty();
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
                var ecosistema = await _context.Ecosistema.FindAsync(request.EcosistemaId);
                var ecosistemaId = ecosistema.EcosistemaId;
                if(ecosistema == null)
                {
                    throw new Exception("No existe el ecosistema");
                }
                if(request.ImagenEcosistema != null)
                {
                    var imagenExistente = await _context.Documento.Where(x => x.ObjetoReferencia == ecosistemaId).FirstOrDefaultAsync();
                    if(imagenExistente == null)
                    {
                        var imagen = new Documento
                        {
                            Contenido = Convert.FromBase64String(request.ImagenEcosistema.Data),
                            ExtensionD = request.ImagenEcosistema.Extension,
                            NombreD = request.ImagenEcosistema.Nombre,
                            FechaCreacion = DateTime.UtcNow,
                            ObjetoReferencia = ecosistemaId,
                            DocumentoId = Guid.NewGuid()
                        };
                        _context.Documento.Add(imagen);
                    }
                    else
                    {
                        imagenExistente.Contenido = Convert.FromBase64String(request.ImagenEcosistema.Data);
                        imagenExistente.NombreD = request.ImagenEcosistema.Nombre;
                        imagenExistente.ExtensionD = request.ImagenEcosistema.Extension;
                    }
                }
                ecosistema.EcosistemaId = ecosistema.EcosistemaId;
                ecosistema.Nombre = request.Nombre ?? ecosistema.Nombre;
                ecosistema.Descripcion = request.Descripcion ?? ecosistema.Descripcion;
                ecosistema.NombreCientifico = request.NombreCientifico ?? ecosistema.NombreCientifico;

                var result = await _context.SaveChangesAsync();
                if(result > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("No se ha podido actualizar el ecosistema");
            }
        }
    }
}
