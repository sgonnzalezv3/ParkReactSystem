using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Documentos
{
    public class SubirArchivo
    {
        public class Ejecuta : IRequest
        {
            public Guid? ObjetoReferencia { get; set; }
            public string Nombre { get; set; }
            public string Extension { get; set; }
            public string Data { get; set; }
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
                //Evaluar si el archivo existe
                var documento = await _context.Documento.Where(x => x.ObjetoReferencia == request.ObjetoReferencia).FirstOrDefaultAsync();
                if(documento == null)
                {
                    //crear
                    var doc = new Documento
                    {
                        //Convertir la data a base64String
                        Contenido = Convert.FromBase64String(request.Data),
                        NombreD = request.Nombre,
                        ExtensionD = request.Extension,
                        DocumentoId = Guid.NewGuid(),
                        FechaCreacion = DateTime.UtcNow,
                        ObjetoReferencia = request.ObjetoReferencia ?? Guid.Empty
                    };
                    _context.Documento.Add(doc);
                }
                else
                {
                    //ya existe un documento, solo es reemplazarlo.
                    documento.Contenido = Convert.FromBase64String(request.Data);
                    documento.NombreD = request.Nombre;
                    documento.ExtensionD = request.Extension;
                    documento.FechaCreacion = DateTime.UtcNow;
                }
                var resultado = await _context.SaveChangesAsync();
                if(resultado > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("No se pudo Guardar El Archivo");
            }
        }
    }
}
