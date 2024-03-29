﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ClickButtonLink.Services.Implementation;
using ClickButtonLink.Services.Interfaces;
using DBRepository.Factories;
using DBRepository.Interfaces;
using DBRepository.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ClickButtonLink.Helpers;

namespace ClickButtonLink
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   options.RequireHttpsMetadata = false;
                   options.SaveToken = true;
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidIssuer = AuthOptions.ISSUER,
                       ValidAudience = AuthOptions.AUDIENCE,
                       IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                       ValidateLifetime = true,
                       ValidateIssuerSigningKey = true,
                       ClockSkew = TimeSpan.Zero
                   };
               });

            //services.AddCors();
            services.AddMvc();
            services.AddAutoMapper();

            services.AddScoped<IRepositoryContextFactory, RepositoryContextFactory>();
            services.AddScoped<IProjectRepository>(provider => new ProjectRepository(Configuration.GetConnectionString("DefaultConnection"), 
                provider.GetService<IRepositoryContextFactory>()));
            services.AddScoped<ILinkRepository>(provider => new LinkRepository(Configuration.GetConnectionString("DefaultConnection"), 
                provider.GetService<IRepositoryContextFactory>()));
            services.AddScoped<IRedirectRepository>(provider => new RedirectRepository(Configuration.GetConnectionString("DefaultConnection"), 
                provider.GetService<IRepositoryContextFactory>()));
            services.AddScoped<IIdentityRepository>(provider => new IdentityRepository(Configuration.GetConnectionString("DefaultConnection"),
                provider.GetService<IRepositoryContextFactory>()));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ILinkService, LinkService>();
            services.AddScoped<IIdentityService, IdentityService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            //loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware();
            }

            //app.UseCors(builder => builder.AllowAnyOrigin());
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute(
                    name: "DefaultApi",
                    template: "api/{controller}/{action}");
                routes.MapRoute(
                    name: "RedirectApi",
                    template: "{id:int}",
                    defaults: new { controller = "Redirect", action = "StartRedirect" });
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
            });
        }
    }
}
