using MediatR;
using Trayvio.Application.DTOs;

namespace Trayvio.Application.Commands.FoodItems;

public class CreateFoodItemCommand : IRequest<FoodItemDto>
{
    public int VendorId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string UnitOfMeasure { get; set; } = string.Empty;
    public int Serves { get; set; } = 1;
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}
