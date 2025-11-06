using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using server.Services;
using Microsoft.AspNetCore.Diagnostics;
using server.Models;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var secretKey = configuration["JwtSettings:SecretKey"];
var expiry = configuration.GetValue<int>("JwtSettings:ExpiryMinutes");
builder.Services.AddSingleton(new JwtService(secretKey, expiry));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseExceptionHandler(a => a.Run(async context =>
{
    var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
    var response = new ApiResponse<string>
    {
        Success = false,
        Message = "שגיאה פנימית בשרת"
    };

    context.Response.StatusCode = 500;
    context.Response.ContentType = "application/json; charset=utf-8";
    await context.Response.WriteAsJsonAsync(response);
}));


app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
