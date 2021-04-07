using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia.DapperConexion
{
    public interface IFactoryConnection
    {
        //metodo para cerrar conexion
        void CloseConnection();
        //metodo para obtener la conexion
        IDbConnection GetConnection();

    }
}
