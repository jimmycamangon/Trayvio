using AutoMapper;
using MediatR;
using Trayvio.Application.Commands.Users;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, UserDto>
{
    private readonly IUserRepository _repo;
    private readonly IMapper _mapper;

    public CreateUserCommandHandler(IUserRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<UserDto> Handle(
        CreateUserCommand command,
        CancellationToken cancellationToken
    )
    {
        var user = _mapper.Map<User>(command);
        var created = await _repo.AddAsync(user);
        return _mapper.Map<UserDto>(created);
    }
}
