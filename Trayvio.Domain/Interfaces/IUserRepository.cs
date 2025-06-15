using Trayvio.Domain.Entities;

namespace Trayvio.Domain.Interfaces;

public interface IUserRepository : IGenericRepository<User>
{
    // Task<User> GetUserByEmailAsync(string email);
    // Task<User> GetUserByIdAsync(int userId);
    // Task<IReadOnlyList<User>> GetUsersByRoleAsync(string role);
    // Task<IReadOnlyList<User>> GetActiveUsersAsync();
    // Task<bool> IsEmailInUseAsync(string email);
}
