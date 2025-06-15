using AutoMapper;
using MediatR;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Interfaces;

public class GetVendorByIdQueryHandler : IRequestHandler<GetVendorByIdQuery, VendorDto>
{
    private readonly IVendorRepository _vendorRepository;
    private readonly IMapper _mapper;

    public GetVendorByIdQueryHandler(IVendorRepository vendorRepository, IMapper mapper)
    {
        _vendorRepository = vendorRepository;
        _mapper = mapper;
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
