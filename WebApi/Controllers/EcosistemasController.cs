using Aplicacion;
using Aplicacion.Ecosistema;
using Aplicacion.Parques;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistencia.DapperConexion.Paginacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class EcosistemasController : MiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> Crear(NuevoEcosistema.Ejecuta data)
        {
            return await Mediator.Send(data);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(Guid id)
        {
            return await Mediator.Send(new EliminarEcosistema.Eliminar { Id = id });
        }

        [HttpGet]
        public async Task<ActionResult<List<EcosistemaDto>>> Consulta()
        {
            return await Mediator.Send(new ConsultarEcosistemas.Ejecuta());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<EcosistemaDto>> ConsultaById( Guid id)
        {
            return await Mediator.Send(new ConsultaEcosistemaById.Ejecuta { Id = id });
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Actualizar (ActualizarEcosistema.Ejecuta data , Guid id)
        {
            data.EcosistemaId = id;
            return await Mediator.Send(data);
        }
        [HttpPost("report")]
        public async Task<ActionResult<PaginacionModel>> Report(PaginacionEcosistema.Ejecuta data)
        {
            return await Mediator.Send(data);
        }


    }
}
