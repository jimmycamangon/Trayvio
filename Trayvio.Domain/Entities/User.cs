namespace Trayvio.Domain.Entities;

public class User : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "Customer"; // Default role is Customer
    public bool IsActive { get; set; } = true;
    public CustomerProfile? CustomerProfile { get; set; }

    public ICollection<Vendor> Vendors { get; set; } = new List<Vendor>();
    public ICollection<VendorStaff> VendorStaffs { get; set; } = new List<VendorStaff>();
    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}
