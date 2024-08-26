using UserLoginService.Models;

public class User
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public int RoleId { get; set; }
    public bool Status { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string Contact { get; set; }
    public string AadharNumber { get; set; }

    public virtual Role? Role { get; set; }
    public virtual ICollection<Buyer>? Buyers { get; set; }
    public virtual ICollection<Seller>? Sellers { get; set; }
}
