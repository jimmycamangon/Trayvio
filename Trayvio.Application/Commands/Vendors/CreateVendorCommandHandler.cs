using AutoMapper;
using MediatR;
using Trayvio.Application.Commands.Vendors;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;

public class CreateVendorCommandHandler : IRequestHandler<CreateVendorCommand, VendorDto>
{
    private readonly IVendorRepository _repo;
    private readonly IMapper _mapper;

    public CreateVendorCommandHandler(IVendorRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<VendorDto> Handle(
        CreateVendorCommand command,
        CancellationToken cancellationToken
    )
    {
        var vendor = _mapper.Map<Vendor>(command);
        var created = await _repo.AddAsync(vendor);
        return _mapper.Map<VendorDto>(created);
    }
}
