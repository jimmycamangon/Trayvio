using MediatR;
using Trayvio.Application.DTOs;

public class GetVendorByIdQuery : IRequest<VendorDto>
{
    public int Id { get; set; }

    public GetVendorByIdQuery(int id) => Id = id;
}
