using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Alojamiento
{
    public class EliminarAlojamiento
    {
        public class Ejecuta : IRequest
        {
            public Guid Id { get; set; }
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
                var alojamiento = await _context.Alojamiento.FindAsync(request.Id);
                if(alojamiento == null)
                {
                    throw new Exception("No existe el alojamiento");
                }
                var imagen = await _context.Documento.Where(x => x.ObjetoReferencia == request.Id).FirstOrDefaultAsync();
                if(imagen != null)
                {
                    _context.Documento.Remove(imagen);
                }
                _context.Alojamiento.Remove(alojamiento);
                var resultado = await _context.SaveChangesAsync();
                if(resultado > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("No se ha podido eliminar el alojamiento");
            }
        }
    }
}
