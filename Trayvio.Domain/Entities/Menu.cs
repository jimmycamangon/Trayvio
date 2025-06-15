namespace Trayvio.Domain.Entities;

public class Menu : BaseEntity
{
    public int VendorId { get; set; }
    public Vendor Vendor { get; set; } = null!;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;

    public ICollection<MenuFoodItem> MenuFoodItems { get; set; } = new List<MenuFoodItem>();
    public ICollection<ReservationMenu> ReservationMenus { get; set; } =
        new List<ReservationMenu>();
}
