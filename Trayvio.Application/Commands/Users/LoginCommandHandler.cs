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

    public LoginCommandHandler(IUserRepository repo, IMapper mapper, IPasswordHasher hasher)
    {
        _repo = repo;
        _mapper = mapper;
        _hasher = hasher;
    }

    public async Task<string> Handle(LoginCommand command, CancellationToken cancellationToken)
    {
        var user = await _repo.GetUserByEmailAsync(command.Email);
        if (user == null || !_hasher.Verify(user.PasswordHash, command.Password))
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        // Generate JWT token or return a success message
        return "Login successful"; // Replace with actual token generation logic
    }
}
