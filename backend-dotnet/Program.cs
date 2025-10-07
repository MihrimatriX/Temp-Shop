using Microsoft.EntityFrameworkCore;
using EcommerceBackend.Infrastructure.Data;
using EcommerceBackend.Infrastructure.Repositories;
using EcommerceBackend.Application.Services;
using EcommerceBackend.Infrastructure.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "E-Commerce API",
        Version = "v1",
        Description = "Modern E-Commerce Backend API with .NET Core",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "AFU",
            Email = "afu@example.com"
        }
    });
    
    // Include XML comments if available
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = System.IO.Path.Combine(System.AppContext.BaseDirectory, xmlFile);
    if (System.IO.File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? $"Host={Environment.GetEnvironmentVariable("POSTGRES_HOST") ?? "localhost"};" +
       $"Port={Environment.GetEnvironmentVariable("POSTGRES_PORT") ?? "5432"};" +
       $"Database={Environment.GetEnvironmentVariable("POSTGRES_DB") ?? "ecommerce_db"};" +
       $"Username={Environment.GetEnvironmentVariable("POSTGRES_USER") ?? "ecommerce_user"};" +
       $"Password={Environment.GetEnvironmentVariable("POSTGRES_PASSWORD") ?? "ecommerce_password"};";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

// Repositories
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

// Services
builder.Services.AddScoped<IProductService, ProductService>();


// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "default-key"))
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "E-Commerce API v1");
    c.RoutePrefix = "swagger"; // Swagger UI will be available at /swagger
    c.DocumentTitle = "E-Commerce API Documentation";
});

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");

// Middleware
app.UseGlobalExceptionMiddleware();
app.UseValidationMiddleware();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Seed data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
    
    var seeder = new DataSeeder(context);
    await seeder.SeedAsync();
}

app.Run();
