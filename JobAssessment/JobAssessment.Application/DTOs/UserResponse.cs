using JobAssessment.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobAssessment.Application.DTOs
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string Username { get; set; } = "";
        public RoleE Role { get; set; }
        public string Email { get; set; } = "";
    }
}
