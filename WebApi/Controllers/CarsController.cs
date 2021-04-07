using Aplicacion.Car;
using Aplicacion.Cars;
using Aplicacion.Parques;
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
    public class CarsController : MiControllerBase
    {
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Unit>> Crear(NuevoCar.Ejecuta data)
        {
            return await Mediator.Send(data);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(Guid id)
        {
            return await Mediator.Send(new EliminarCar.Ejecuta { Id = id });
        }
        [HttpGet]
        public async Task<ActionResult<List<CarDto>>> Consulta()
        {
            return await Mediator.Send(new ConsultarCar.ListaCars());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CarDto>> Consulta(Guid id)
        {
            return await Mediator.Send(new ConsultarCarById.Ejecuta { Id = id} );
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Actualizar(ActualizarCar.Ejecuta data , Guid id)
        {
            data.Id = id;
            return await Mediator.Send(data);

        }
        [HttpPost("report")]
        public async Task<ActionResult<PaginacionModel>> Report(PaginacionCar.Ejecuta data)
        {
            return await Mediator.Send(data);
        }
    }
}
