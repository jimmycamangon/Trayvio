using MediatR;
using Trayvio.Application.DTOs;

public class LoginCommand : IRequest<string> // or AuthResultDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
