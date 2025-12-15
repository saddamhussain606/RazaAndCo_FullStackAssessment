using JobAssessment.Application.DTOs;
using JobAssessment.Application.Interfaces;
using JobAssessment.Domain.Entities;
using System.Security.Cryptography;
using System.Text;

namespace JobAssessment.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;

        public UserService(IUserRepository repo) => _repo = repo;

        private string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            return Convert.ToBase64String(sha.ComputeHash(bytes));
        }

        public async Task<IEnumerable<UserResponse>> GetAllAsync()
        {
            var users = await _repo.GetAllAsync();
            return users.Select(u => new UserResponse
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                Role = u.Role
            });
        }

        public async Task<UserResponse?> GetByIdAsync(int id)
        {
            var u = await _repo.GetByIdAsync(id);
            if (u == null) return null;
            return new UserResponse { Id = u.Id, Username = u.Username, Email = u.Email, Role = u.Role };
        }

        public async Task<UserResponse> CreateAsync(CreateUpdateUserRequest req)
        {
            var user = new User(req.Username, HashPassword(req.Password), req.Role, req.Email);
            await _repo.AddAsync(user);
            return new UserResponse { Id = user.Id, Username = user.Username, Email = user.Email, Role = user.Role };
        }

        public async Task UpdateAsync(int id, CreateUpdateUserRequest req)
        {
            var user = await _repo.GetByIdAsync(id) ?? throw new Exception("User not found");
            user.Update(req.Username, HashPassword(req.Password), req.Role, req.Email);
            await _repo.UpdateAsync(user);
        }

        public async Task DeleteAsync(int id)
        {
            var user = await _repo.GetByIdAsync(id) ?? throw new Exception("User not found");
            await _repo.DeleteAsync(user);
        }

        public async Task<User?> AuthenticateAsync(string username, string password)
        {
            var user = await _repo.GetByUsernameAsync(username);
            if (user == null) return null;

            var hash = HashPassword(password);
            if (user.PasswordHash != hash) return null;
            return user;
        }
    }
}
