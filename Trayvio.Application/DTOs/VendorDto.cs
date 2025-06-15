namespace Trayvio.Application.DTOs;

public class VendorDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ContactEmail { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public int OwnerId { get; set; }
    public UserDto Owner { get; set; } = null!;
    public bool IsApproved { get; set; } = false;
    public decimal? CommissionRate { get; set; } = null;

    public ICollection<MenuDto> Menus { get; set; } = new List<MenuDto>();
}
