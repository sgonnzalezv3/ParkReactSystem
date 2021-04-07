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

namespace Aplicacion.Ecosistema
{
    public class ConsultaEcosistemaById
    {
        public class Ejecuta : IRequest<EcosistemaDto>
        {
            public Guid Id { get; set; }
        }
        public class Manejador : IRequestHandler<Ejecuta, EcosistemaDto>
        {
            private readonly ParquesContext _context;
            private readonly IMapper _mapper;
            public Manejador(IMapper mapper, ParquesContext context)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<EcosistemaDto> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var ecosistema = await _context.Ecosistema.FindAsync(request.Id);
                if(ecosistema == null)
                {
                    throw new Exception("No existe El ecosistema");
                }

                var ecosistemaDto = _mapper.Map<Dominio.Ecosistema, EcosistemaDto>(ecosistema);
                return ecosistemaDto;
            }
        }
    }
}
