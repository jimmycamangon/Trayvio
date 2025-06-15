namespace Trayvio.Application.DTOs;

public class MenuFoodItemDto
{
    public int Id { get; set; }
    public int MenuId { get; set; }
    public MenuDto Menu { get; set; } = null!;
    public int FoodItemId { get; set; }
    public FoodItemDto FoodItem { get; set; } = null!;
}
