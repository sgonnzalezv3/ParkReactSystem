using Aplicacion.ManejadorError;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Documentos
{
    public class ObtenerArchivo
    {
        public class Ejecuta : IRequest<ArchivoGenerico>
        {
            public Guid Id { get; set; }
        }
        public class Manejador : IRequestHandler<Ejecuta, ArchivoGenerico>
        {
            private readonly ParquesContext _context;
            public Manejador(ParquesContext context)
            {
                _context = context;
            }
            public async Task<ArchivoGenerico> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                //obtener el archivo desde la bd
                var archivo = await _context.Documento.Where(x => x.ObjetoReferencia == request.Id).FirstOrDefaultAsync();
                if(archivo == null)
                {
                    throw new ManejadorExcepcion(System.Net.HttpStatusCode.NotFound, new { message = "No se encontró la imagen" });
                }
                var archivoGenerico = new ArchivoGenerico
                {
                    Data = Convert.ToBase64String(archivo.Contenido),
                    Nombre = archivo.NombreD,
                    Extension = archivo.ExtensionD
                };
                return archivoGenerico;
            }
        }
    }
}
