namespace Trayvio.Domain.Entities;

public class Review : BaseEntity
{
    public int ReservationId { get; set; }
    public Reservation Reservation { get; set; } = null!;
    public int Rating { get; set; } // 1 to 5 scale
    public string Comment { get; set; } = string.Empty;
}
