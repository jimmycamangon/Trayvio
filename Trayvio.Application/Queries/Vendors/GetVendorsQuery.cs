using System.Collections.Generic;
using MediatR;
using Trayvio.Application.DTOs;

public class GetVendorsQuery : IRequest<IEnumerable<VendorDto>>
{
    // This query does not require any parameters, but you can add properties if needed
}
