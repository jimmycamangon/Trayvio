using System.Reflection;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Trayvio.Application.Mappings;
using Trayvio.Domain.Interfaces;
using Trayvio.Infrastructure.Data;
using Trayvio.Infrastructure.Repositories;
using Trayvio.Infrastructure.Security;

var builder = WebApplication.CreateBuilder(args);

// API Layer
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Infrastructure Layer

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddScoped<IFoodItemRepository, FoodItemRepository>();
builder.Services.AddScoped<IVendorRepository, VendorRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IMenuRepository, MenuRepository>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();

// builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
// builder.Services.AddScoped<IJwtService, JwtService>();

// Application Layer
builder.Services.AddAutoMapper(Assembly.GetAssembly(typeof(MappingProfile)));

builder.Services.AddMediatR(typeof(GetFoodItemsQueryHandler).Assembly);
builder.Services.AddMediatR(typeof(GetVendorByIdQueryHandler).Assembly);
builder.Services.AddMediatR(typeof(GetFoodItemsByVendorIdQueryHandler).Assembly);
builder.Services.AddMediatR(typeof(GetMenusQueryHandler).Assembly);
builder.Services.AddMediatR(typeof(GetMenusByVendorIdQueryHandler).Assembly);
builder.Services.AddMediatR(typeof(SignupCommandHandler).Assembly);

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowReactApp",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );
});

var app = builder.Build();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.MapControllers();

app.Run();
