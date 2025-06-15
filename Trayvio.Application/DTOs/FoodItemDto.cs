namespace Trayvio.Application.DTOs;

public class FoodItemDto
{
    public int Id { get; set; }
    public VendorDto? Vendor { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string UnitOfMeasure { get; set; } = string.Empty;
    public int Serves { get; set; } = 1; // Default to 1 serving
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;

    public ICollection<MenuFoodItemDto> MenuFoodItems { get; set; } = new List<MenuFoodItemDto>();
}
