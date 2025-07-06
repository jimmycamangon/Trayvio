using AutoMapper;
using MediatR;
using Trayvio.Application.DTOs;
using Trayvio.Application.Queries.Users;
using Trayvio.Domain.Interfaces;

namespace Trayvio.Application.Queries.Users;

public class GetUserByEmailQueryHandler : IRequestHandler<GetUserByEmailQuery, UserDto>
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public GetUserByEmailQueryHandler(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<UserDto> Handle(GetUserByEmailQuery request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByEmailAsync(request.Email);
        return _mapper.Map<UserDto>(user);
    }
}