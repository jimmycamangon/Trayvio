namespace Trayvio.Application.DTOs;

public class ReviewDto
{
    public int ReservationId { get; set; }
    public ReservationDto Reservation { get; set; } = null!;
    public int Rating { get; set; } // 1 to 5 scale
    public string Comment { get; set; } = string.Empty;
}
