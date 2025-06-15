using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Trayvio.Application.Commands.Users;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;

namespace Trayvio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
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
}
