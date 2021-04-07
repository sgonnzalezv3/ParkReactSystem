using Aplicacion.Parques;
using AutoMapper;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Alojamiento
{
    public class ConsultarAlojamientoById
    {
        public class Ejecuta : IRequest<AlojamientoDto>
        {
            public Guid Id { get; set; }
        }
        public class Manejador : IRequestHandler<Ejecuta, AlojamientoDto>
        {
            private readonly IMapper _mapper;
            private readonly ParquesContext _context;
            public Manejador(IMapper mapper, ParquesContext context)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AlojamientoDto> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var alojamiento = await _context.Alojamiento.FindAsync(request.Id);
                if(alojamiento == null)
                {
                    throw new Exception("No existe el alojamiento");
                }
                var alojamientoDto = _mapper.Map<Dominio.Alojamiento, AlojamientoDto>(alojamiento);
                return alojamientoDto;
            }
        }
    }
}
