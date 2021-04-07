using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using System;
using System.Data;


namespace Persistencia.DapperConexion
{
    public class FactoryConnection : IFactoryConnection
    {
        //Inyectar cadena de conexion dapper
        private IDbConnection _connection;
        //obtener acceso a la cadena de conexion dentro de la propiedad ConexionConfiguracion
        private readonly IOptions<ConexionConfiguracion> _configs;
        public FactoryConnection(IOptions<ConexionConfiguracion> configs)
        {
            _configs = configs;
        }
        public void CloseConnection()
        {
            //Si la conexion es diferente de nula y existe una conexion abierta:
            if(_connection != null && _connection.State == ConnectionState.Open)
            {
                _connection.Close();
            }
        }

        public IDbConnection GetConnection()
        {
            //Evaluar si existe la conexion
            if( _connection == null)
            {
                _connection = new SqlConnection(_configs.Value.DefaultConnection);
            }
            //evaluar estado de la cadena
            if(_connection.State != ConnectionState.Open)
            {
                _connection.Open();
            }
            return _connection;
        }
    }
}
