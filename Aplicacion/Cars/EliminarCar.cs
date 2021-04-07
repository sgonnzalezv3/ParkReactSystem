using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Cars
{
    public class EliminarCar
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
                //obtener la Car.
                var car = await _context.Car.FindAsync(request.Id);
                if(car == null)
                {
                    throw new Exception("No existe la Car");
                }
                else
                {
                    var parques = await _context.Parque.Where(x => x.ParqueId == request.Id).ToListAsync();

                    foreach(var parque in parques)
                    {
                        _context.Remove(parque);
                    }
                    _context.Remove(car);
                }
                var result = await _context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("No se pudo eliminar la CAR");

            }
        }

    }
}
