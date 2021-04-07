using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia.DapperConexion.Paginacion
{
    public interface IPaginacion
    {
        //metodo que represente la paginacion con los parametros necesarios.
        Task<PaginacionModel> devolverPaginacion(
            string storeprocedure,
            int numeroPagina,
            int cantidadElementos,
            IDictionary<string,object> parametrosFiltro,
            string ordenamientoColumna
            );
        
    }
}
