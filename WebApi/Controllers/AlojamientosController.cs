using Aplicacion.Alojamiento;
using Aplicacion.Parques;
using Aplicacion.Reserva;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistencia.DapperConexion.Paginacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [AllowAnonymous]
    public class AlojamientosController : MiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> Crear(NuevoAlojamiento.Ejecuta data)
        {
            return await Mediator.Send(data);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(Guid id)
        {
            return await Mediator.Send(new EliminarAlojamiento.Ejecuta { Id = id });
        }
        [HttpGet]
        public async Task<ActionResult<List<AlojamientoDto>>> Obtener()
        {
            return await Mediator.Send(new ConsultarAlojamientos.ListaAlojmientos());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<AlojamientoDto>> Obtener(Guid id)
        {
            return await Mediator.Send(new ConsultarAlojamientoById.Ejecuta { Id = id});
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Actualizar(Guid id , ActualizarAlojamiento.Ejecuta data)
        {
            data.Id = id;
            return await Mediator.Send(data);
        }
        [HttpPost("report")]
        public async Task<ActionResult<PaginacionModel>> Report(PaginacionAlojamiento.Ejecuta data)
        {
            return await Mediator.Send(data);
        }

        [HttpPost("buscar/{parqueId}")]
        public async Task<ActionResult<List<AlojamientoDto>>> ObtenerByFecha(Guid parqueId, AlojamientosPorFecha.ListaAlojamientos data )
        {
            data.ParqueId = parqueId;
            return await Mediator.Send(data);
        }
    }
}
