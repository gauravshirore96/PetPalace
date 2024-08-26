using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; } = null!;
    }
}
