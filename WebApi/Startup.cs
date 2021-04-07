using Aplicacion.Alojamiento;
using Aplicacion.Contratos;
using Aplicacion.Parques;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Persistencia;
using Persistencia.DapperConexion;
using Persistencia.DapperConexion.Paginacion;
using Seguridad.TokenSeguridad;
using System.Text;
using WebApi.Middleware;
//using FluentValidation.AspNetCore;
using FluentValidation.AspNetCore;


namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("corsApp", builder =>
            {
                builder.AllowAnyOrigin();
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
            }));

            services.AddDbContext<ParquesContext>(ops =>
            {
                ops.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });
            //COnfiguracion COnexion Dapper
            services.AddOptions();
            services.Configure<ConexionConfiguracion>(Configuration.GetSection("ConnectionStrings"));
            services.AddAutoMapper(typeof(ConsultarAlojamientos.Manejador));
            services.AddMediatR(typeof(ConsultarParque.Manejador).Assembly);

            /*Implementar la Autorizacion de controllers antes de la solicitud de un cliente*/
            /*Antes de procesar el request de un cliente*/
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            }).AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<NuevoParque>());
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Servicio para mantenimiento de Parques", Version = "v1" });
                c.CustomSchemaIds(c => c.FullName);
            });
            //Variable que representa la clase Usuario
            var builder = services.AddIdentityCore<Dominio.Usuario>();
            /* Objeto tipo IdentityBuilder, recibe dos parámetros : el builder.UserType y el builder.Services */
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            //inyectar roles indicando la entidad que va representar los roles
            identityBuilder.AddRoles<IdentityRole>();
            //NECESITAMOS incluir la data de los roles dentro de los tokens de seguirdad
            identityBuilder.AddClaimsPrincipalFactory<UserClaimsPrincipalFactory<Usuario, IdentityRole>>();
            /* Al IdentityBuilder le agregamos la instancia del EF (ParquesContext)*/
            identityBuilder.AddEntityFrameworkStores<ParquesContext>();
            identityBuilder.AddSignInManager<SignInManager<Dominio.Usuario>>();
            services.TryAddSingleton<ISystemClock, SystemClock>();
            //instanciando servicio de roleManager
            //identityBuilder.AddRoles<IdentityRole>();

            //obteniendo la key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Mi palabra secreta"));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
            {
                //parametros que va tener el token
                opt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    //cualquier tipo de request tiene que ser validado primero
                    ValidateIssuerSigningKey = true,
                    //pasarle la palabra clave
                    IssuerSigningKey = key,
                    //quien va poder crear los tokens
                    ValidateAudience = false,
                    // envio de la validacion
                    ValidateIssuer = false
                };
            });
            //vincular la interface y jwt vincularlo como un servicio
            services.AddScoped<IJwtGenerador, JwtGenerador>();
            //vincular la interface y usuario sesionc
            services.AddScoped<IUsuarioSesion, UsuarioSesion>();
            // instanciar el objeto de conexion de dapper
            services.AddTransient<IFactoryConnection, FactoryConnection>();
            // instanciando la paginacion.
            services.AddScoped<IPaginacion, PaginacionRepositorio>();



        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ManejadorErrorMiddleware>();
            if (env.IsDevelopment())
            {

            }
            app.UseCors("corsApp");

            //app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
           // app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebApi v1"));
        }
    }
}
