using System.Collections.Generic;
using MediatR;
using Trayvio.Application.DTOs;

public class GetFoodItemsByVendorIdQuery : IRequest<IEnumerable<FoodItemDto>>
{
    public int VendorId { get; set; }

    public GetFoodItemsByVendorIdQuery(int vendorId) => VendorId = vendorId;
}
