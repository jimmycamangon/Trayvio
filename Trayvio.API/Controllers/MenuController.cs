using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Trayvio.Application.Commands.Menus;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;

namespace Trayvio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MenuController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public MenuController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MenuDto>>> GetMenus()
    {
        try
        {
            var menuDtos = await _mediator.Send(new GetMenusQuery());
            if (menuDtos == null || !menuDtos.Any())
            {
                return NotFound("No menus found.");
            }
            else
            {
                return Ok(menuDtos);
            }
        }
        catch (Exception ex)
        {
            // Log the exception (not implemented here)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<ActionResult<MenuDto>> CreateMenu(CreateMenuCommand command)
    {
        try
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetMenus), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            // Log the exception (not implemented here)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("vendor/{vendorId}")]
    public async Task<ActionResult<IEnumerable<MenuDto>>> GetMenusByVendor(int vendorId)
    {
        try
        {
            var menuDtos = await _mediator.Send(new GetMenusByVendorIdQuery(vendorId));
            if (menuDtos == null || !menuDtos.Any())
            {
                return NotFound($"No menus found for vendor with ID {vendorId}.");
            }
            else
            {
                return Ok(menuDtos);
            }
        }
        catch (Exception ex)
        {
            // Log the exception (not implemented here)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
