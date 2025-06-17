using MediatR;

public class DeleteMenuCommand : IRequest<bool>
{
    public int Id { get; set; }

    public DeleteMenuCommand(int id) => Id = id;
}
