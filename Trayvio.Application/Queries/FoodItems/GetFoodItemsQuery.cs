using System.Collections.Generic;
using MediatR;
using Trayvio.Application.DTOs;

public class GetFoodItemsQuery : IRequest<IEnumerable<FoodItemDto>>
{
    // This query does not require any parameters, but you can add properties if needed
}
