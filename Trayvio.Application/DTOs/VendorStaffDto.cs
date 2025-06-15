namespace Trayvio.Application.DTOs;

public class VendorStaffDto
{
    public int Id { get; set; }
    public VendorDto Vendor { get; set; } = null!;
    public int StaffUserId { get; set; }
    public UserDto StaffUser { get; set; } = null!;
    public string RoleInVendor { get; set; } = string.Empty;
}
