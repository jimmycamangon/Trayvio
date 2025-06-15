namespace Trayvio.Domain.Entities;

public class ReservationMenu : BaseEntity
{
    public int ReservationId { get; set; }
    public Reservation Reservation { get; set; } = null!;
    public int MenuId { get; set; }
    public Menu Menu { get; set; } = null!;
    public int Quantity { get; set; } = 1;
}
