namespace Trayvio.Application.DTOs;

public class PaymentDto
{
    public int ReservationId { get; set; }
    public ReservationDto Reservation { get; set; } = null!;
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending"; // Pending, Completed, Failed
    public DateTime? PaidAt { get; set; }
    public decimal PlatformFee { get; set; }
}
