namespace Trayvio.Domain.Entities;

public class Reservation : BaseEntity
{
    public int CustomerId { get; set; }
    public User Customer { get; set; } = null!;
    public int VendorId { get; set; }
    public Vendor Vendor { get; set; } = null!;
    public DateTime ReservationDate { get; set; }
    public int NumberOfGuests { get; set; }
    public string EventLoation { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending"; // Pending, Confirmed, Cancelled
    public string Remarks { get; set; } = string.Empty;

    public ICollection<ReservationMenu> ReservationMenus { get; set; } =
        new List<ReservationMenu>();
    public Payment? Payment { get; set; }
    public Review? Review { get; set; }
}
