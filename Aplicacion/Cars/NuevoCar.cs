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

namespace Aplicacion.Car
{
    public class NuevoCar
    {
        public class Ejecuta : IRequest
        {
            public string Nombre { get; set; }
            public string Descripcion { get; set; }
            public bool Activo { get; set; }
            public Guid? CarId { get; set; }
        }
        public class EjecutaValida : AbstractValidator<Ejecuta>
        {
            public EjecutaValida()
            {
                RuleFor(x => x.Nombre).NotEmpty();
                RuleFor(x => x.Descripcion).NotEmpty();
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
                    // Buscar si existe parque con ese Nombre 
                    var car = await _context.Car.Where(x => x.Nombre == request.Nombre).FirstOrDefaultAsync(); 
                    if(car != null)
                    {
                         throw new Exception("El nombre del Car ya existe en el sistema");
                    }
                    Guid _carId = Guid.NewGuid();
                    if(request.CarId != null)
                    {
                        _carId = request.CarId ?? Guid.NewGuid();
                    }
                    var carObject = new Dominio.Car 
                    {
                        CarId = _carId,
                        Nombre = request.Nombre,
                        Descripcion = request.Descripcion,
                        Activo = request.Activo,
                    };
                    _context.Car.Add(carObject);

                    var valor = await _context.SaveChangesAsync();
                    if(valor> 0)
                    {
                        return Unit.Value;
                    }
                    throw new Exception("No se pudo crear La Car");

                }

            }
            
        }
    }
}
