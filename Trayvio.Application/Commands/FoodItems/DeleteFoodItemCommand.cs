using MediatR;

public class DeleteFoodItemCommand : IRequest<bool>
{
    public int Id { get; set; }

    public DeleteFoodItemCommand(int id) => Id = id;
}
