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
    public class ConsultarCar
    {
        public class ListaCars : IRequest<List<CarDto>> { }
        public class Manejador : IRequestHandler<ListaCars, List<CarDto>>
        {
            private readonly IMapper _mapper;
            private readonly ParquesContext _context;
            public Manejador(IMapper mapper, ParquesContext context)
            {
                _mapper = mapper;
                _context = context;
            }

            public async  Task<List<CarDto>> Handle(ListaCars request, CancellationToken cancellationToken)
            {
                var cars = await _context.Car
                    .Include(x=>x.Parques)
                    .AsSingleQuery()
                    .ToListAsync();

                var carsDto = _mapper.Map<List<Dominio.Car>, List<CarDto>>(cars);

                return carsDto;
            }
        }
    }
}
