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

namespace Aplicacion.Alojamiento
{
    public class ConsultarAlojamientos
    {
        public class ListaAlojmientos : IRequest<List<AlojamientoDto>>{}
        public class Manejador : IRequestHandler<ListaAlojmientos, List<AlojamientoDto>>
        {
            private readonly IMapper _mapper;
            private readonly ParquesContext _context;
            public Manejador(IMapper mapper, ParquesContext context)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<List<AlojamientoDto>> Handle(ListaAlojmientos request, CancellationToken cancellationToken)
            {
                var alojamientos = await _context.Alojamiento
                    .ToListAsync();

                var alojamientoDto = _mapper.Map<List<Dominio.Alojamiento>, List<AlojamientoDto>>(alojamientos);

                return alojamientoDto;
            }
        }
    }
}
