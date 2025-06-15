namespace Trayvio.Application.DTOs;

public class ReservationDto
{
    public int Id { get; set; }
    public UserDto Customer { get; set; } = null!;
    public int VendorId { get; set; }
    public VendorDto Vendor { get; set; } = null!;
    public DateTime ReservationDate { get; set; }
    public int NumberOfGuests { get; set; }
    public string EventLocation { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending"; // Pending, Confirmed, Cancelled
    public string Remarks { get; set; } = string.Empty;

    public ICollection<ReservationMenuDto> ReservationMenus { get; set; } =
        new List<ReservationMenuDto>();
    public PaymentDto? Payment { get; set; }
    public ReviewDto? Review { get; set; }
}
