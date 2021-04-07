using Aplicacion.Seguridad;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [AllowAnonymous]
    public class UsuarioController : MiControllerBase
    {
        //http:local.../api/Usuario/login
        [HttpPost("login")]
        public async Task<ActionResult<UsuarioData>> Login(Login.Ejecuta parametros)
        {
            return await Mediator.Send(parametros);
        }
        [HttpPost("registrar")]
        public async Task<ActionResult<UsuarioData>> Registrar(Registrar.Ejecuta parametros)
        {
            return await Mediator.Send(parametros);
        }
        [HttpGet]
        public async Task<ActionResult<UsuarioData>> ObtenerUsuarioActual()
        {
            return await Mediator.Send(new UsuarioActual.Ejecuta());
        }
        [HttpPut]
        public async Task<ActionResult<UsuarioData>> Actualizar(UsuarioActualizar.Ejecuta data)
        {
            return await Mediator.Send(data);
        }
        [HttpGet("lista")]
        public async Task<ActionResult<List<UsuarioData>>> UsuariosLista()
        {
            return await Mediator.Send(new UsuarioLista.ListaUsuarios());
        }

    }
}
