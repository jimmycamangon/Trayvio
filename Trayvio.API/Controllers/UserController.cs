using System.Diagnostics;
// using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Trayvio.Application.Commands.Users;
using Trayvio.Application.DTOs;
using Trayvio.Application.Queries.Users;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;

namespace Trayvio.API.Controllers;

// [Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;
    private readonly IConfiguration _configuration;

    // Keep only this constructor
    public UserController(IMapper mapper, IMediator mediator, IConfiguration config)
    {
        _mapper = mapper;
        _mediator = mediator;
        _configuration = config;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        try
        {
            var userDtos = await _mediator.Send(new GetUsersQuery());
            if (userDtos == null || !userDtos.Any())
            {
                return NotFound("No users found.");
            }
            else
            {
                return Ok(userDtos);
            }
        }
        catch (Exception ex)
        {
            // Log the exception (not implemented here)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUser(CreateUserCommand command)
    {
        try
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetUsers), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            // Log the exception (not implemented here)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("signup")]
    public async Task<ActionResult<UserDto>> Signup(SignupCommand command)
    {
        try
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetUsers), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            // Log the exception (not implemented here)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand command)
    {
        try
        {
            // 1. First validate credentials using your existing command handler
            var userId = await _mediator.Send(command);

            // 2. Then fetch the full user details using a query
            var user = await _mediator.Send(new GetUserByEmailQuery { Email = command.Email });
            if (user == null)
            {
                return Unauthorized("User not found");
            }

            // 3. Create session
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                // Add additional claims as needed:
                // new Claim(ClaimTypes.Name, user.FullName),
                // new Claim(ClaimTypes.Role, user.Role)
            };

            await HttpContext.SignInAsync(
                scheme: "Cookies",
                new ClaimsPrincipal(new ClaimsIdentity(claims, "Cookies")),
                new AuthenticationProperties
                {
                    IsPersistent = true, // Optional: for "remember me" functionality
                    ExpiresUtc = DateTimeOffset.UtcNow.AddHours(2), // Session duration
                }
            );

            return Ok(
                new
                {
                    Message = "Logged in successfully",
                    UserId = user.Id,
                    Email = user.Email,
                }
            );
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    [HttpGet("current")]
    [AllowAnonymous] // Change from [Authorize] to [AllowAnonymous]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        try
        {
            // Check if user is authenticated
            if (!User.Identity.IsAuthenticated)
            {
                return Ok(
                    new
                    {
                        success = false,
                        message = "No active session found",
                        user = (UserDto)null,
                    }
                );
            }

            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(userEmail))
            {
                return Ok(
                    new
                    {
                        success = false,
                        message = "Invalid session data",
                        user = (UserDto)null,
                    }
                );
            }

            var user = await _mediator.Send(new GetUserByEmailQuery { Email = userEmail });
            if (user == null)
            {
                return Ok(
                    new
                    {
                        success = false,
                        message = "User not found",
                        user = (UserDto)null,
                    }
                );
            }

            return Ok(
                new
                {
                    success = true,
                    message = "User retrieved successfully",
                    user = _mapper.Map<UserDto>(user),
                }
            );
        }
        catch (Exception ex)
        {
            // Log the exception here
            return StatusCode(
                500,
                new
                {
                    success = false,
                    message = $"Internal server error: {ex.Message}",
                    user = (UserDto)null,
                }
            );
        }
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync("Cookies");
        return Ok(new { Message = "Logged out" });
    }
}
