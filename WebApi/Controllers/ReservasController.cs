using Aplicacion.Reserva;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class ReservasController : MiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> Crear(ReservarAlojamiento.Ejecuta data)
        {
            return await Mediator.Send(data);
        }
    }
}
