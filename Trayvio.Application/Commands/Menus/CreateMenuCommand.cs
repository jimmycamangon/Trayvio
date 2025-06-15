using MediatR;
using Trayvio.Application.DTOs;

namespace Trayvio.Application.Commands.Menus;

public class CreateMenuCommand : IRequest<MenuDto>
{
    public int VendorId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}
