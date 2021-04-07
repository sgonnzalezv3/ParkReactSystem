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
    public class EliminarEcosistema
    {
        public class Eliminar : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Manejador : IRequestHandler<Eliminar>
        {
            private readonly ParquesContext _context;
            public Manejador(ParquesContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Eliminar request, CancellationToken cancellationToken)
            {
                //Buscando el dato
                var ecosistema = await _context.Ecosistema.FindAsync(request.Id);

                if(ecosistema == null)
                {
                    throw new Exception("No existe el Ecosistema");
                }
                var foto = await _context.Documento.Where(x => x.ObjetoReferencia == request.Id).FirstOrDefaultAsync();
                _context.Remove(foto);
                _context.Remove(ecosistema);

                var resultado = await _context.SaveChangesAsync();
                if(resultado > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("No se pudo eliminar El Ecosistema");

            }
        }
    }
}
