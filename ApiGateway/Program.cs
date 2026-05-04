using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// load config
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

// ✅ Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Ocelot
builder.Services.AddOcelot();

var app = builder.Build();


app.UseCors("AllowAll");
// ✅ Enable Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("http://localhost:5271/swagger/v1/swagger.json", "Book Service");
    c.SwaggerEndpoint("http://localhost:5002/swagger/v1/swagger.json", "Borrow Service");
});

// Ocelot middleware
await app.UseOcelot();

app.Run();