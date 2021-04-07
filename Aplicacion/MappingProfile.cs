using Aplicacion.Parques;
using Aplicacion.Reserva;
using AutoMapper;
using Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aplicacion
{
    class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Parque, ParqueDto>();
            CreateMap<Dominio.Car, CarDto>();
            CreateMap<Dominio.Ecosistema, EcosistemaDto>();
            CreateMap<Dominio.Alojamiento, AlojamientoDto>();
            CreateMap<Dominio.Reserva, ReservaDto>();
            CreateMap<Dominio.ReservaDetalle, ReservaDetalleDto>();
        }
    }
}
