using MediatR;
using Trayvio.Application.DTOs;

public class SignupCommand : IRequest<UserDto>
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Role { get; set; } = "Customer"; // Default role
}
