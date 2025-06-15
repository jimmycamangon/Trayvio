namespace Trayvio.Application.DTOs;

public class MenuDto
{
    public int Id { get; set; }
    public int VendorId { get; set; }
    public VendorDto Vendor { get; set; } = null!;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;

    public ICollection<MenuFoodItemDto> MenuFoodItems { get; set; } = new List<MenuFoodItemDto>();
    public ICollection<ReservationMenuDto> ReservationMenus { get; set; } =
        new List<ReservationMenuDto>();
}
