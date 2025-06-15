using AutoMapper;
using MediatR;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Interfaces;

public class GetVendorsQueryHandler : IRequestHandler<GetVendorsQuery, IEnumerable<VendorDto>>
{
    private readonly IVendorRepository _vendorRepository;
    private readonly IMapper _mapper;

    public GetVendorsQueryHandler(IVendorRepository vendorRepository, IMapper mapper)
    {
        _vendorRepository = vendorRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<VendorDto>> Handle(
        GetVendorsQuery request,
        CancellationToken cancellationToken
    )
    {
        var vendors = await _vendorRepository.ListAllWithOwnerAsync();
        return _mapper.Map<IEnumerable<VendorDto>>(vendors);
    }

    public async Task<VendorDto> Handle(
        GetVendorByIdQuery request,
        CancellationToken cancellationToken
    )
    {
        var vendor = await _vendorRepository.GetByIdAsync(request.Id);
        return vendor == null ? null : _mapper.Map<VendorDto>(vendor);
    }
}
