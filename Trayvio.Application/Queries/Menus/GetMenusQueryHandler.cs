using AutoMapper;
using MediatR;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Interfaces;

public class GetMenusQueryHandler : IRequestHandler<GetMenusQuery, IEnumerable<MenuDto>>
{
    private readonly IMenuRepository _menuRepository;
    private readonly IMapper _mapper;

    public GetMenusQueryHandler(IMenuRepository menuRepository, IMapper mapper)
    {
        _menuRepository = menuRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<MenuDto>> Handle(
        GetMenusQuery request,
        CancellationToken cancellationToken
    )
    {
        var menus = await _menuRepository.ListAllAsync();
        return _mapper.Map<IEnumerable<MenuDto>>(menus);
    }
}
