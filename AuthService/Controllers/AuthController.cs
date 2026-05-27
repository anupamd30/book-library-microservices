using Microsoft.AspNetCore.Mvc;
using AuthService.Data;
using AuthService.Models;
using AuthService.Services;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var user = new User
            {
                UserName = request.UserName,
                Password = request.Password
            };

            _context.Users.Add(user);

           try
            {
                await _context.SaveChangesAsync();
                return Ok("User registered");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
            
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            var user = _context.Users.FirstOrDefault(x =>
                x.UserName == request.UserName &&
                x.Password == request.Password);

            if (user == null)
                return Unauthorized();

            var token = _tokenService.CreateToken(user.UserName);

            return Ok(token);
        }
    }
}