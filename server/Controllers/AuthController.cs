using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;


namespace server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;

        private List<User> _users = new()
        {
            new User { Email = "shteren.daniel@gmail.com", Password = "123456" }
        };

        public AuthController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var validUser = _users.FirstOrDefault(u =>
                u.Email == user.Email && u.Password == user.Password);

            if (validUser == null)
                return Unauthorized(new ApiResponse<string>
                {
                    Success = false,
                    Message = ("דוא\"ל או סיסמא לא נכונים")
                });

            var token = _jwtService.GenerateToken(validUser.Email);
            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "התחברת בהצלחה",
                Data = new { Token = token }
            });
        }
    }
}
