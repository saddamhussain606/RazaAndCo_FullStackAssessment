using JobAssessment.Api.Auth;
using JobAssessment.Application.DTOs;
using JobAssessment.Application.Interfaces;
using JobAssessment.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace JobAssessment.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly JwtTokenGenerator _jwt;

        public AuthController(IUserService userService, JwtTokenGenerator jwt)
        {
            _userService = userService;
            _jwt = jwt;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest req)
        {
            var user = await _userService.AuthenticateAsync(req.Username, req.Password);
            if (user == null) return Unauthorized("Invalid credentials");

            var token = _jwt.Generate(user);
            return Ok(new { token });
        }
    }
}
