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

namespace Aplicacion.Ecosistema
{
    public class ConsultarEcosistemas
    {
        public class Ejecuta : IRequest<List<EcosistemaDto>> {}
        public class Manejador : IRequestHandler<Ejecuta, List<EcosistemaDto>>
        {
            private readonly IMapper _mapper;
            private readonly ParquesContext _context;
            public Manejador(IMapper mapper , ParquesContext context)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<EcosistemaDto>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var ecosistemas = await _context.Ecosistema.ToListAsync();
                var ecosistemasDto = _mapper.Map<List<Dominio.Ecosistema>, List<EcosistemaDto>>(ecosistemas);
                return ecosistemasDto;
            }
        }
    }
}
