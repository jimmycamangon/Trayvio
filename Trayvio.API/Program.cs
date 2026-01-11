using System.Reflection;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Trayvio.Application.Mappings;
using Trayvio.Domain.Interfaces;
using Trayvio.Infrastructure.Data;
using Trayvio.Infrastructure.Repositories;
using Trayvio.Infrastructure.Security;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Configure Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Trayvio API", Version = "v1" });
    c.AddSecurityDefinition(
        "cookieAuth",
        new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.ApiKey,
            In = ParameterLocation.Cookie,
            Name = ".AspNetCore.Cookies",
            Description = "Cookie-based authentication",
        }
    );
});

// Database Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Repositories
builder.Services.AddScoped<IFoodItemRepository, FoodItemRepository>();
builder.Services.AddScoped<IVendorRepository, VendorRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IMenuRepository, MenuRepository>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();

// Application Layer
builder.Services.AddAutoMapper(Assembly.GetAssembly(typeof(MappingProfile)));
builder.Services.AddMediatR(typeof(GetFoodItemsQueryHandler).Assembly);

// CORS Configuration (Updated)
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "ReactApp",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        }
    );
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("https://trayvio.vercel.app", "https://trayvio.vercel.app/")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        }
    );
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowVercel",
        policy =>
        {
            policy
                .WithOrigins(
                    "https://trayvio.vercel.app",
                    "http://localhost:3000" // local dev
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        }
    );
});

// Authentication & Session
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(2);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.None; // For development
});

builder
    .Services.AddAuthentication("Cookies")
    .AddCookie(
        "Cookies",
        options =>
        {
            options.Cookie.HttpOnly = true;
            options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest; // For dev
            options.ExpireTimeSpan = TimeSpan.FromHours(2);
            options.SlidingExpiration = true;
        }
    );

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Trayvio API v1");
        c.ConfigObject.AdditionalItems["requestCookies"] = true;
    });
}

app.UseHttpsRedirection();

// Critical Middleware Order
app.UseRouting();
app.UseCors("ReactApp");
app.UseCors("AllowFrontend");
app.UseCors("AllowVercel");
app.UseAuthentication();
app.UseAuthorization();
app.UseSession();

// Test endpoint
app.MapGet(
    "/api/health",
    () => Results.Ok(new { status = "Healthy", timestamp = DateTime.UtcNow })
);

app.MapControllers();
app.Run();
