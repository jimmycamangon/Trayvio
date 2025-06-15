using AutoMapper;
using MediatR;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Interfaces;

public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, IEnumerable<UserDto>>
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public GetUsersQueryHandler(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<UserDto>> Handle(
        GetUsersQuery request,
        CancellationToken cancellationToken
    )
    {
        var users = await _userRepository.ListAllAsync();
        return _mapper.Map<IEnumerable<UserDto>>(users);
    }
}
