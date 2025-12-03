using Microsoft.AspNetCore.Http;
using server.Models;
using System.Text.Json;

namespace server.Middleware
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 500;
                context.Response.ContentType = "application/json; charset=utf-8";

                var response = new ApiResponse<string>
                {
                    Success = false,
                    Message = "שגיאה פנימית בשרת",
                    Data = ex.Message
                };

                await context.Response.WriteAsync(JsonSerializer.Serialize(response));
            }
        }
    }
}
