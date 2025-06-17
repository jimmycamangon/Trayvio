using AutoMapper;
using MediatR;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Interfaces;

public class UpdateMenuCommandHandler : IRequestHandler<UpdateMenuCommand, MenuDto>
{
    private readonly IMenuRepository _repo;
    private readonly IMapper _mapper;

    public UpdateMenuCommandHandler(IMenuRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<MenuDto> Handle(
        UpdateMenuCommand request,
        CancellationToken cancellationToken
    )
    {
        var menu = await _repo.GetByIdAsync(request.Id);
        if (menu == null)
            return null;

        menu.Name = request.Name;
        menu.Description = request.Description;
        menu.ImageUrl = request.ImageUrl;
        menu.IsActive = request.IsActive;
        menu.UpdatedAt = DateTime.UtcNow;

        await _repo.UpdateAsync(menu);

        return _mapper.Map<MenuDto>(menu);
    }
}
