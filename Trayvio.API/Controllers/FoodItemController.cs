using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Trayvio.Application.Commands.FoodItems;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;

namespace Trayvio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoodItemController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public FoodItemController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FoodItemDto>>> GetFoodItems()
    {
        try
        {
            var foodItemDtos = await _mediator.Send(new GetFoodItemsQuery());
            if (foodItemDtos == null || !foodItemDtos.Any())
            {
                return NotFound("No food items found.");
            }
            else
            {
                return Ok(foodItemDtos);
            }
        }
        catch (Exception ex)
        {
            // Log the exception (not implemented here)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<ActionResult<FoodItemDto>> CreateFoodItem(CreateFoodItemCommand command)
    {
        try
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetFoodItems), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            // Log the exception (not implemented here)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("vendor/{vendorId}")]
    public async Task<ActionResult<IEnumerable<FoodItemDto>>> GetFoodItemsByVendorId(int vendorId)
    {
        try
        {
            var foodItemDtos = await _mediator.Send(new GetFoodItemsByVendorIdQuery(vendorId));
            // Always return 200 OK with an array (empty or not)
            return Ok(foodItemDtos ?? new List<FoodItemDto>());
        }
        catch (Exception ex)
        {
            // Log the exception (not implemented here)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<FoodItemDto>> UpdateFoodItem(
        int id,
        UpdateFoodItemCommand command
    )
    {
        if (id != command.Id)
        {
            return BadRequest("ID mismatch.");
        }

        try
        {
            var result = await _mediator.Send(command);
            if (result == null)
            {
                return NotFound($"Food item with ID {id} not found.");
            }
            return Ok(result);
        }
        catch (Exception ex)
        {
            // Log the exception (not implemented here)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFoodItem(int id)
    {
        try
        {
            var result = await _mediator.Send(new DeleteFoodItemCommand(id));
            if (!result)
            {
                return NotFound($"Food item with ID {id} not found.");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            // Log the exception (not implemented here)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
