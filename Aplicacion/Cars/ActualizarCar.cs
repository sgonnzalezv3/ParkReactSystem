using FluentValidation;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Cars
{
    public class ActualizarCar
    {
        public class Ejecuta : IRequest
        {
            public Guid Id { get; set; }
            public string Nombre { get; set; }
            public string Descripcion { get; set; }
            public bool? Activo { get; set; }
        }
        public class EjecutaValida : AbstractValidator<Ejecuta>
        {
            public EjecutaValida()
            {
                RuleFor(x => x.Activo).NotEmpty();
                RuleFor(x => x.Nombre).NotEmpty();
                RuleFor(x => x.Id).NotEmpty();
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
                var car = await _context.Car.FindAsync(request.Id);
                if(car == null)
                {
                    throw new Exception("No existe la Car");
                }
                car.CarId = car.CarId;
                car.Activo = request.Activo ?? car.Activo;
                car.Nombre = request.Nombre ?? car.Nombre;
                car.Descripcion = request.Descripcion ?? car.Descripcion;

                var result = await _context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("No se ha podido actualizar la data de la CAR");
            }
        }
    }
}
