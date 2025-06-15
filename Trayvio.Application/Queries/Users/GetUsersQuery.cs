using System.Collections.Generic;
using MediatR;
using Trayvio.Application.DTOs;

public class GetUsersQuery : IRequest<IEnumerable<UserDto>>
{
    public string? Role { get; set; } = null; // Optional filter by role
    public bool? IsActive { get; set; } = null; // Optional filter by active status
}
