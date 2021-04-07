using Aplicacion.Documentos;
using Aplicacion.ManejadorError;
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

namespace Aplicacion
{
    public class NuevoEcosistema
    {
        public class Ejecuta : IRequest
        {
            public Guid? EcosistemaId { get; set; }
            public string Nombre { get; set; }
            public string NombreCientifico { get; set; } 
            public string Descripcion { get; set; }
            public ImagenGeneral ImagenEcosistema { get; set; }
        }
        public class EjecutaValida : AbstractValidator<Ejecuta>
        {
            public EjecutaValida()
            {
                RuleFor(x => x.Nombre).NotEmpty();
                RuleFor(x => x.NombreCientifico).NotEmpty();
                RuleFor(x => x.Descripcion).NotEmpty();
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
                /*
                var parque =  _context.Parque.Find(request.ParqueId);
                if(parque == null)
                {
                    throw new Exception("El parque no existe en el sistema.");
                }
                */
                var ecosistemaExiste = await _context.Ecosistema.Where(x => x.Nombre == request.Nombre || x.NombreCientifico == request.NombreCientifico).FirstOrDefaultAsync();
                
                if(ecosistemaExiste != null)
                {
                    throw new ManejadorExcepcion(System.Net.HttpStatusCode.BadRequest, new { message = "La fauna ya se encuentra en el sistema" });
                }

                Guid _ecosistemaId = Guid.NewGuid();
                if(request.EcosistemaId != null)
                {
                    _ecosistemaId = request.EcosistemaId ?? Guid.NewGuid();
                }

                var ecosistema = new Dominio.Ecosistema
                {
                    EcosistemaId = _ecosistemaId,
                    Nombre = request.Nombre,
                    NombreCientifico = request.NombreCientifico,
                    Descripcion = request.Descripcion,
                };

                _context.Ecosistema.Add(ecosistema);

                if(request.ImagenEcosistema != null)
                {
                    var imagen = new Documento
                    {
                        Contenido = Convert.FromBase64String(request.ImagenEcosistema.Data),
                        ExtensionD = request.ImagenEcosistema.Extension,
                        FechaCreacion = DateTime.UtcNow,
                        NombreD = request.ImagenEcosistema.Nombre,
                        ObjetoReferencia = _ecosistemaId,
                        DocumentoId = Guid.NewGuid()
                    };
                    _context.Documento.Add(imagen);
                }

                var valor = await _context.SaveChangesAsync();
                if(valor > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("No se ha podido crear el ecosistema");

            }
        }
    }
}
