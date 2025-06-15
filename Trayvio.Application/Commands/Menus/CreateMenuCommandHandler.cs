using AutoMapper;
using MediatR;
using Trayvio.Application.Commands.Menus;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;

public class CreateMenuCommandHandler : IRequestHandler<CreateMenuCommand, MenuDto>
{
    private readonly IMenuRepository _repo;
    private readonly IMapper _mapper;

    public CreateMenuCommandHandler(IMenuRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<MenuDto> Handle(
        CreateMenuCommand request,
        CancellationToken cancellationToken
    )
    {
        var menu = _mapper.Map<Menu>(request);
        var createdMenu = await _repo.AddAsync(menu);
        return _mapper.Map<MenuDto>(createdMenu);
    }
}
