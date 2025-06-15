namespace Trayvio.Domain.Entities;

public class VendorStaff : BaseEntity
{
    public int VendorId { get; set; }
    public Vendor Vendor { get; set; } = null!;
    public int StaffUserId { get; set; }
    public User StaffUser { get; set; } = null!;
    public string RoleInVendor { get; set; } = string.Empty;
}
