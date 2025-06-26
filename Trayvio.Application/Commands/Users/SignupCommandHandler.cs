using AutoMapper;
using MediatR;
using Trayvio.Application.Commands.Users;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;

public class SignupCommandHandler : IRequestHandler<SignupCommand, UserDto>
{
    private readonly IUserRepository _repo;
    private readonly IMapper _mapper;
    private readonly IPasswordHasher _hasher;

    public SignupCommandHandler(IUserRepository repo, IMapper mapper, IPasswordHasher hasher)
    {
        _repo = repo;
        _mapper = mapper;
        _hasher = hasher;
    }

    public async Task<UserDto> Handle(SignupCommand command, CancellationToken cancellationToken)
    {
        var user = _mapper.Map<User>(command);
        user.PasswordHash = _hasher.Hash(command.Password);
        var created = await _repo.AddAsync(user);
        return _mapper.Map<UserDto>(created);
    }
}
