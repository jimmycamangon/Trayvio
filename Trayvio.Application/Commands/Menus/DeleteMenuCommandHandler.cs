using MediatR;
using Trayvio.Domain.Interfaces;

public class DeleteMenuCommandHandler : IRequestHandler<DeleteMenuCommand, bool>
{
    private readonly IMenuRepository _repo;

    public DeleteMenuCommandHandler(IMenuRepository repo)
    {
        _repo = repo;
    }

    public async Task<bool> Handle(DeleteMenuCommand request, CancellationToken cancellationToken)
    {
        var menu = await _repo.GetByIdAsync(request.Id);
        if (menu == null)
            return false;

        await _repo.DeleteAsync(menu);
        return true;
    }
}
