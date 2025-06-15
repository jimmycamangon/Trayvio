using AutoMapper;
using MediatR;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Interfaces;

public class GetFoodItemsByVendorIdQueryHandler
    : IRequestHandler<GetFoodItemsByVendorIdQuery, IEnumerable<FoodItemDto>>
{
    private readonly IFoodItemRepository _foodItemRepository;
    private readonly IMapper _mapper;

    public GetFoodItemsByVendorIdQueryHandler(
        IFoodItemRepository foodItemRepository,
        IMapper mapper
    )
    {
        _foodItemRepository = foodItemRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<FoodItemDto>> Handle(
        GetFoodItemsByVendorIdQuery request,
        CancellationToken cancellationToken
    )
    {
        var foodItems = await _foodItemRepository.GetFoodItemsByVendorIdAsync(request.VendorId);
        return _mapper.Map<IEnumerable<FoodItemDto>>(foodItems);
    }
}
