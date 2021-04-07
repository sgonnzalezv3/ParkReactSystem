using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia.DapperConexion.Paginacion
{
    public class PaginacionRepositorio : IPaginacion
    {
        //Importar el objeto dapper conexion
        private readonly IFactoryConnection _factory;
        public PaginacionRepositorio(IFactoryConnection factory)
        {
            _factory = factory;
        }
        public async  Task<PaginacionModel> devolverPaginacion(string storeprocedure, int numeroPagina, int cantidadElementos, IDictionary<string, object> parametrosFiltro, string ordenamientoColumna)
        {
            //Crear objeto paginacion
            PaginacionModel paginacionModel = new PaginacionModel();
            //variable Idictionary, ya que los datos tiene que ser IDictionary
            List<IDictionary<string, object>> listaReporte = null;
            //creando la data de salida
            int totalRecords = 0;
            int totalPaginas  = 0;
            try
            {
                //Crear la conexion
                var connection = _factory.GetConnection();
                // objeto que representa los parametros que se deben pasar.
                DynamicParameters parametros = new DynamicParameters();

                // parametroFIltro es dinamico para ello se necesita un foreach
                foreach(var param in parametrosFiltro)
                {
                    parametros.Add("@" + param.Key, param.Value);
                }

                /*Parametros de entrada*/
                parametros.Add("@NumeroPagina", numeroPagina);
                parametros.Add("@CantidadElementos", cantidadElementos);
                parametros.Add("@Ordenamiento", ordenamientoColumna);

                /*Parametros de salida*/
                parametros.Add(@"TotalRecords", totalRecords, System.Data.DbType.Int32, System.Data.ParameterDirection.Output);
                parametros.Add(@"TotalPaginas", totalPaginas, System.Data.DbType.Int32, System.Data.ParameterDirection.Output);

                //ejecutar el SP, debe ser convertido a tipo IDictionary
                var result = await connection.QueryAsync(storeprocedure, parametros, commandType: System.Data.CommandType.StoredProcedure);
                //HACER QUE cada registro se convierta en tipo IDictionary (x representa un registro proveniente de la tabla)
                //que es inumerable que se va convertir en tipo IDictionary
                listaReporte = result.Select(x => (IDictionary<string, object>)x).ToList();
                //asignar la data al objeto que se va retornar
                paginacionModel.ListaObjetos = listaReporte;
                //asignacion a los parametros daondole lo que retorna el store procedure
                paginacionModel.NumeroPaginas = parametros.Get<int>("@TotalPaginas");
                paginacionModel.TotalRecords = parametros.Get<int>("@TotalRecords");

            }
            catch (Exception e)
            {

                throw new Exception("No se ha podido ejecutar el procedimiento almacenado",e);
            }
            finally
            {
                _factory.CloseConnection();
            }
            return paginacionModel;
        }
    }
}
