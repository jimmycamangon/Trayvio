using MediatR;
using Trayvio.Application.DTOs;

namespace Trayvio.Application.Commands.Vendors;

public class CreateVendorCommand : IRequest<VendorDto>
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ContactEmail { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public int OwnerId { get; set; }
    public bool IsApproved { get; set; } = false;
    public decimal? CommissionRate { get; set; } = null;
    public string ImageUrl { get; set; } = string.Empty;
}
