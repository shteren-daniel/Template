using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;


namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtService _jwtService;

        // דוגמה למשתמשים סטטיים
        private List<User> _users = new()
        {
            new User { Username = "daniel", Password = "1234" }
        };

        public AuthController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var validUser = _users.FirstOrDefault(u =>
                u.Username == user.Username && u.Password == user.Password);

            if (validUser == null)
                return Unauthorized("Username or password invalid");

            var token = _jwtService.GenerateToken(validUser.Username);
            return Ok(new { Token = token });
        }

        [Authorize]
        [HttpGet("secret")]
        public IActionResult Secret()
        {
            return Ok("This is a protected endpoint");
        }
    }
}
