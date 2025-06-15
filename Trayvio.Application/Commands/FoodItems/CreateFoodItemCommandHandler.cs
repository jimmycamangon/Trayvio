using AutoMapper;
using MediatR;
using Trayvio.Application.Commands.FoodItems;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;

public class CreateFoodItemCommandHandler : IRequestHandler<CreateFoodItemCommand, FoodItemDto>
{
    private readonly IFoodItemRepository _repo;
    private readonly IMapper _mapper;

    public CreateFoodItemCommandHandler(IFoodItemRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<FoodItemDto> Handle(
        CreateFoodItemCommand command,
        CancellationToken cancellationToken
    )
    {
        var foodItem = _mapper.Map<FoodItem>(command);
        var created = await _repo.AddAsync(foodItem);
        return _mapper.Map<FoodItemDto>(created);
    }
}
