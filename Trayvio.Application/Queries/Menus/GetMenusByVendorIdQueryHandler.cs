using AutoMapper;
using MediatR;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Interfaces;

public class GetMenusByVendorIdQueryHandler
    : IRequestHandler<GetMenusByVendorIdQuery, IEnumerable<MenuDto>>
{
    private readonly IMenuRepository _menuRepository;
    private readonly IMapper _mapper;

    public GetMenusByVendorIdQueryHandler(IMenuRepository menuRepository, IMapper mapper)
    {
        _menuRepository = menuRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<MenuDto>> Handle(
        GetMenusByVendorIdQuery request,
        CancellationToken cancellationToken
    )
    {
        var menus = await _menuRepository.GetMenusByVendorIdAsync(request.VendorId);
        return _mapper.Map<IEnumerable<MenuDto>>(menus);
    }
}
