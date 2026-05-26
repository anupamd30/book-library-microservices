using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Ocelot config
builder.Configuration
    .AddJsonFile(
        "ocelot.json",
        optional: false,
        reloadOnChange: true
    );

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

// JWT Authentication
builder.Services.AddAuthentication(
    JwtBearerDefaults.AuthenticationScheme
)
.AddJwtBearer("Bearer", options =>
{
    options.TokenValidationParameters =
        new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            IssuerSigningKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        builder.Configuration["Jwt:Key"]!
                    )
                )
        };
});

// Authorization
builder.Services.AddAuthorization();

// Ocelot
builder.Services.AddOcelot(builder.Configuration);

var app = builder.Build();

// 🔥 Use CORS
app.UseCors("AllowReact");

// Authentication
app.UseAuthentication();

app.UseAuthorization();

// Ocelot
await app.UseOcelot();

app.Run();