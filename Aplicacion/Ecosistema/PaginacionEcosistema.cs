using MediatR;
using Persistencia.DapperConexion.Paginacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Ecosistema
{
    public class PaginacionEcosistema
    {
        public class Ejecuta : IRequest<PaginacionModel>
        {
            public string Nombre { get; set; }
            public int NumeroPagina { get; set; }
            public int CantidadElementos { get; set; }
        }
        public class Manejador : IRequestHandler<Ejecuta, PaginacionModel>
        {
            private readonly IPaginacion _paginacion;
            public Manejador(IPaginacion paginacion)
            {
                _paginacion = paginacion;
            }
            public async Task<PaginacionModel> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var storedProcedure = "usp_obtener_ecosistema_paginacion";
                var ordenamiento = "Nombre";
                var parametros = new Dictionary<string, object>();
                parametros.Add("NombreEcosistema", request.Nombre);
                return await _paginacion.devolverPaginacion(storedProcedure, request.NumeroPagina, request.CantidadElementos, parametros, ordenamiento);
            }
        }
    }
}
