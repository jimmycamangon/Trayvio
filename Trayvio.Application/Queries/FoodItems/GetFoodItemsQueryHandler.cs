using AutoMapper;
using MediatR;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Interfaces;

public class GetFoodItemsQueryHandler : IRequestHandler<GetFoodItemsQuery, IEnumerable<FoodItemDto>>
{
    private readonly IFoodItemRepository _foodItemRepository;
    private readonly IMapper _mapper;

    public GetFoodItemsQueryHandler(IFoodItemRepository foodItemRepository, IMapper mapper)
    {
        _foodItemRepository = foodItemRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<FoodItemDto>> Handle(
        GetFoodItemsQuery request,
        CancellationToken cancellationToken
    )
    {
        var foodItems = await _foodItemRepository.ListAllAsync();
        return _mapper.Map<IEnumerable<FoodItemDto>>(foodItems);
    }
}
