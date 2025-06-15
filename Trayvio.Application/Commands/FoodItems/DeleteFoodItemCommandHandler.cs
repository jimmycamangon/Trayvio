using MediatR;
using Trayvio.Domain.Interfaces;

public class DeleteFoodItemCommandHandler : IRequestHandler<DeleteFoodItemCommand, bool>
{
    private readonly IFoodItemRepository _repo;

    public DeleteFoodItemCommandHandler(IFoodItemRepository repo)
    {
        _repo = repo;
    }

    public async Task<bool> Handle(
        DeleteFoodItemCommand request,
        CancellationToken cancellationToken
    )
    {
        var foodItem = await _repo.GetByIdAsync(request.Id);
        if (foodItem == null)
            return false;

        await _repo.DeleteAsync(foodItem);
        return true;
    }
}
