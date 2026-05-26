using AuthService.Data;
using AuthService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔥 CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

// DI
builder.Services.AddScoped<TokenService>();

var app = builder.Build();

// 🔥 USE CORS
app.UseCors("AllowReact");

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Controllers
app.MapControllers();

app.Run();