using Aplicacion.Parques;
using AutoMapper;
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
    public class ConsultarCarById
    {
        public class Ejecuta : IRequest<CarDto>
        {
            public Guid Id { get; set; }
        }
        public class Manejador : IRequestHandler<Ejecuta, CarDto>
        {
            private readonly IMapper _mapper;
            private readonly ParquesContext _context;
            public Manejador(IMapper mapper , ParquesContext context)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<CarDto> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var car = await _context.Car
                    .Include(x => x.Parques)
                    .AsSingleQuery()
                    .FirstOrDefaultAsync(x=> x.CarId == request.Id);

                if(car == null)
                {
                    throw new Exception("No existe la Car");
                }
                var carDto = _mapper.Map<Dominio.Car, CarDto>(car);
                return carDto;
            }
        }
    }
}
