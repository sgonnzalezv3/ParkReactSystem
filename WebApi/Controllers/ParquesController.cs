using Aplicacion.Parques;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistencia.DapperConexion.Paginacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParquesController : MiControllerBase
    {
        [HttpPost]

        public async Task<ActionResult<Unit>> Crear(NuevoParque.Ejecuta data)
        {
            return await Mediator.Send(data);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(Guid id)
        {
            return await Mediator.Send(new EliminarParque.Ejecuta { Id = id });
        }
        [HttpGet]
        public async Task<ActionResult<List<ParqueDto>>> Consultar()
        {
            return await Mediator.Send(new ConsultarParque.ListaParques());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ParqueDto>> ConsultarById(Guid id)
        {
            return await Mediator.Send(new ConsultarParqueById.Ejecuta { Id = id });
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Actualizar(ActualizarParque.Ejecuta data , Guid id)
        {
            data.ParqueId = id;
            return await Mediator.Send(data);
        }
        [HttpPost("report")]
        public async Task<ActionResult<PaginacionModel>> Report(PaginacionParque.Ejecuta data )
        {
            return await Mediator.Send(data);
        }
    }
}
