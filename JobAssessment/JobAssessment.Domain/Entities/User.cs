using System.Data;

namespace JobAssessment.Domain.Entities
{
    public class User
    {
        public int Id { get; private set; }
        public string Username { get; private set; } = "";
        public string PasswordHash { get; private set; } = "";
        public RoleE Role { get; private set; } = RoleE.User;
        public string Email { get; private set; } = "";

        private User() { } // EF Core

        public User(string username, string passwordHash, RoleE role, string email)
        {
            Username = username;
            PasswordHash = passwordHash;
            Role = role;
            Email = email;
        }

        public void Update(string username, string passwordHash, RoleE role, string email)
        {
            Username = username;
            PasswordHash = passwordHash;
            Role = role;
            Email = email;
        }
    }
}
