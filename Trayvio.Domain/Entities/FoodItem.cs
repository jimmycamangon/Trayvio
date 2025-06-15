namespace Trayvio.Domain.Entities;

public class FoodItem : BaseEntity
{
    public int VendorId { get; set; }

    public Vendor Vendor { get; set; } = null!;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string UnitOfMeasure { get; set; } = string.Empty;
    public int Serves { get; set; } = 1; // Default to 1 serving
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;

    public ICollection<MenuFoodItem> MenuFoodItems { get; set; } = new List<MenuFoodItem>();
}
