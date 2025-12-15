using JobAssessment.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobAssessment.Application.DTOs
{
    public class CreateUpdateUserRequest
    {
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
        public string Email { get; set; } = "";
        public RoleE Role { get; set; } = RoleE.User;
    }
}
