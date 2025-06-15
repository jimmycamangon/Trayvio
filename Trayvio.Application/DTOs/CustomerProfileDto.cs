namespace Trayvio.Application.DTOs;

public class CustomerProfileDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public UserDto User { get; set; } = null!;
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? ZipCode { get; set; }
    public string? Country { get; set; }
    public string? Gender { get; set; }
    public DateTime? BirthDate { get; set; }
}
