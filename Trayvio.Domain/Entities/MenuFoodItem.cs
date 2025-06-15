namespace Trayvio.Domain.Entities;

public class MenuFoodItem : BaseEntity
{
    public int MenuId { get; set; }
    public Menu Menu { get; set; } = null!;
    public int FoodItemId { get; set; }
    public FoodItem FoodItem { get; set; } = null!;
}
