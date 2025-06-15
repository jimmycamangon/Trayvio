namespace Trayvio.Application.DTOs;

public class ReservationMenuDto
{
    public int ReservationId { get; set; }
    public ReservationDto Reservation { get; set; } = null!;
    public int MenuId { get; set; }
    public MenuDto Menu { get; set; } = null!;
    public int Quantity { get; set; } = 1;
}
