namespace Trayvio.Domain.Entities;

public class Vendor : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ContactEmail { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public int OwnerId { get; set; }
    public User Owner { get; set; } = null!;
    public bool isApproved { get; set; } = false;
    public decimal? CommissionRate { get; set; } = null;

    public ICollection<VendorStaff> VendorStaffs { get; set; } = new List<VendorStaff>();
    public ICollection<Menu> Menus { get; set; } = new List<Menu>();
    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    public ICollection<FoodItem> FoodItems { get; set; } = new List<FoodItem>();
}
