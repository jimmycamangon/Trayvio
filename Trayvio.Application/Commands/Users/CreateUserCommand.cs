using MediatR;
using Trayvio.Application.DTOs;

namespace Trayvio.Application.Commands.Users;

public class CreateUserCommand : IRequest<UserDto>
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = "Customer"; // Default role
    public bool IsActive { get; set; } = true;

    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? ZipCode { get; set; }
    public string? Country { get; set; }
    public string? Gender { get; set; }
    public DateTime? BirthDate { get; set; }
}
