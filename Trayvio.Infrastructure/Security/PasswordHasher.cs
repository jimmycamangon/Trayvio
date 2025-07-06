using Trayvio.Domain.Interfaces;

namespace Trayvio.Infrastructure.Security;

// Infrastructure/Security/PasswordHasher.cs
public class PasswordHasher : IPasswordHasher
{
    public string Hash(string password) => BCrypt.Net.BCrypt.HashPassword(password);

    public bool Verify(string hashedPassword, string inputPassword)
    {
        try
        {
            return BCrypt.Net.BCrypt.Verify(inputPassword, hashedPassword);
        }
        catch
        {
            return false; // Invalid hash format
        }
    }
}
