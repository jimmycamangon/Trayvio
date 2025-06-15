namespace Trayvio.Domain.Entities;

public class CustomerProfile : BaseEntity
{
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? ZipCode { get; set; }
    public string? Country { get; set; }
    public string? Gender { get; set; }
    public DateTime? BirthDate { get; set; }
}
