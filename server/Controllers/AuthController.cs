using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserService _userService;
        private readonly JwtService _jwtService;
        private readonly TokenService _tokenService;

        public AuthController(
            IConfiguration configuration,
            UserService userService,
            JwtService jwtService,
            TokenService tokenService)
        {
            _configuration = configuration;
            _userService = userService;
            _jwtService = jwtService;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var validUser = await _userService.GetUser(user.Email, user.Password);

            if (validUser == null)
                return Unauthorized(new ApiResponse<string>
                {
                    Success = false,
                    Message = "דוא\"ל או סיסמא לא נכונים"
                });

            var token = _jwtService.GenerateToken(validUser.Email);
            var expiry = DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("JwtSettings:ExpiryMinutes"));

            await _tokenService.SaveTokenAsync(validUser.Id, token, expiry);

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "התחברת בהצלחה",
                Data = new { Token = token }
            });
        }
    }
}
