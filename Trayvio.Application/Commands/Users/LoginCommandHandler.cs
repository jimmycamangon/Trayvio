using AutoMapper;
using MediatR;
using Trayvio.Application.Commands.Users;
using Trayvio.Application.DTOs;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;

public class LoginCommandHandler : IRequestHandler<LoginCommand, string>
{
    private readonly IUserRepository _repo;
    private readonly IMapper _mapper;

    private readonly IPasswordHasher _hasher;

    public LoginCommandHandler(
        IUserRepository repo,
        IMapper mapper,
        IPasswordHasher hasher
    )
    {
        _repo = repo;
        _mapper = mapper;
        _hasher = hasher;
    }

    public async Task<string> Handle(LoginCommand command, CancellationToken cancellationToken)
    {
        var user = await _repo.GetUserByEmailAsync(command.Email);
        if (user == null)
        {
            throw new UnauthorizedAccessException("User not found");
        }

        var isPasswordValid = _hasher.Verify(user.PasswordHash, command.Password);
        if (!isPasswordValid)
        {
            throw new UnauthorizedAccessException("Invalid password");
        }

        return user.Id.ToString();
    }
}
