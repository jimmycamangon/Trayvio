using MediatR;
using Trayvio.Application.DTOs;

namespace Trayvio.Application.Queries.Users;

public class GetUserByEmailQuery : IRequest<UserDto>
{
    public string Email { get; set; } = string.Empty;
}