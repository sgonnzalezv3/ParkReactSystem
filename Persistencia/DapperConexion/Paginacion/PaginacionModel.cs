using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia.DapperConexion.Paginacion
{
    public class PaginacionModel
    {
        //Debe retornar Lista de objetos o el contenido en si
        // se va convertir en un json
        // [{cursoId : "123" ,"titulo:"aspnet""}, {cursoId : "123" ,"titulo:"aspnet""}]
        public List<IDictionary<string,object>> ListaObjetos { get; set; }
        //debe retornar el total de registros en la base de datos
        public int TotalRecords { get; set; }

        //Debe retornar el numero de paginas que se debe hacer dependiendo de la cantidad de objetos
        public int NumeroPaginas { get; set; }
    }
}
