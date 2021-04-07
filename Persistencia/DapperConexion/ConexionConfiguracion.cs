using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia.DapperConexion
{
    public class ConexionConfiguracion
    {
        /*VA CONTENER LA CADENA DE CONEXION HACIA EL SERVIDOR DE LA BD*/
        /*VIENE DE WEBAPI DENTRO DE STARTUP ALIMENTADO DE LA CADENA DE CONEXION*/
        public string DefaultConnection { get; set; }
    }
}
