using MediatR;
using Persistencia.DapperConexion.Paginacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Alojamiento
{
    public class PaginacionAlojamiento
    {
        public class Ejecuta : IRequest<PaginacionModel>
        {
            // Filtrar por Nombre del alojamiento
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
                // Nombre del SP
                var storedProcedure = "usp_obtener_alojamiento_paginacion";
                // data por la cual se va ordenar
                var ordenamiento = "Nombre";
                // Diccionario con la data
                var parametros = new Dictionary<string, object>();
                // parametro de filtro
                parametros.Add("NombreAlojamiento", request.Nombre);
                return await _paginacion.devolverPaginacion(storedProcedure,request.NumeroPagina,request.CantidadElementos,parametros,ordenamiento); 
            }
        }
    }
}
