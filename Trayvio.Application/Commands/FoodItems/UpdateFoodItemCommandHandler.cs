using AutoMapper;
using MediatR;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Interfaces;

public class UpdateFoodItemCommandHandler : IRequestHandler<UpdateFoodItemCommand, FoodItemDto>
{
    private readonly IFoodItemRepository _repo;
    private readonly IMapper _mapper;

    public UpdateFoodItemCommandHandler(IFoodItemRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<FoodItemDto> Handle(
        UpdateFoodItemCommand request,
        CancellationToken cancellationToken
    )
    {
        var foodItem = await _repo.GetByIdAsync(request.Id);
        if (foodItem == null)
            return null;

        foodItem.Name = request.Name;
        foodItem.Description = request.Description;
        foodItem.ImageUrl = request.ImageUrl;
        foodItem.Category = request.Category;
        foodItem.IsActive = request.IsActive;
        foodItem.UpdatedAt = DateTime.UtcNow;

        await _repo.UpdateAsync(foodItem);

        return _mapper.Map<FoodItemDto>(foodItem);
    }
}
