namespace Trayvio.Domain.Entities;

public class Payment : BaseEntity
{
    public int ReservationId { get; set; }
    public Reservation Reservation { get; set; } = null!;
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending"; // Pending, Completed, Failed
    public DateTime? PaidAt { get; set; }
    public decimal PlatformFee { get; set; }
}
