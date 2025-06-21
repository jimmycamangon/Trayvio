namespace Trayvio.Application.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public CustomerProfileDto? CustomerProfile { get; set; }

    // public ICollection<VendorDto> Vendors { get; set; } = new List<VendorDto>();
    // public ICollection<VendorStaffDto> VendorStaffs { get; set; } = new List<VendorStaffDto>();
    // public ICollection<ReservationDto> Reservations { get; set; } = new List<ReservationDto>();
}
