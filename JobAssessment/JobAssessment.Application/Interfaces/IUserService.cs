using JobAssessment.Application.DTOs;
using JobAssessment.Domain.Entities;

namespace JobAssessment.Application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponse>> GetAllAsync();
        Task<UserResponse?> GetByIdAsync(int id);
        Task<UserResponse> CreateAsync(CreateUpdateUserRequest req);
        Task UpdateAsync(int id, CreateUpdateUserRequest req);
        Task DeleteAsync(int id);
        Task<User?> AuthenticateAsync(string username, string password);
    }
}
