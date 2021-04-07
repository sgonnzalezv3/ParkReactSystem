using Aplicacion.Reserva;
using Dominio;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class ReservaDetallesController : MiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<ReservaDetalleDto>>> Obtener()
        {
            return await Mediator.Send(new ReservaDetalleObtener.ListaReservaDetalle());
        }

    }
}
