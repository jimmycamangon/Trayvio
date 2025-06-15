using System.Collections.Generic;
using MediatR;
using Trayvio.Application.DTOs;

public class GetMenusByVendorIdQuery : IRequest<IEnumerable<MenuDto>>
{
    public int VendorId { get; set; }

    public GetMenusByVendorIdQuery(int vendorId) => VendorId = vendorId;
}
