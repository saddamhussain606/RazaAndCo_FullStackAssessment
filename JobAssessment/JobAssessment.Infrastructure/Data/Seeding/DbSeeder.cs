using JobAssessment.Domain;
using JobAssessment.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace JobAssessment.Infrastructure.Data.Seeding
{
    public static class DbSeeder
    {
        private static string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            return Convert.ToBase64String(sha.ComputeHash(bytes));
        }

        public static async Task SeedAdminUserAsync(this AppDbContext context)
        {
            if (!await context.Users.AnyAsync(u => u.Role == RoleE.Admin))
            {
                var adminUser = new User(
                    username: "admin",
                    passwordHash: HashPassword("Admin@123"),
                    role: RoleE.Admin,
                    email: "admin@example.com"
                );

                context.Users.Add(adminUser);
                await context.SaveChangesAsync();
            }
        }
    }
}
