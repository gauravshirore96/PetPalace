using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using UserLoginService.Models;
using BCrypt.Net;



namespace UserLoginService.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public List<User> GetUsers()
        {
            List<User> list;
            using (var db = new petpalaceContext())
            {
                list = db.Users.ToList();
            }
            return list;
        }

        // Get user by ID
        [HttpGet]
        public User GetUser(int id)
        {
            User user;
            using (var db = new petpalaceContext())
            {
                user = db.Users.Find(id);
            }
            return user;
        }

        // Save a new user
        [HttpPost]
        public IActionResult SaveUser(User user)
        {
            using (var db = new petpalaceContext())
            {
                // Encrypt the password
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

                // Add the user to the Users table
                db.Users.Add(user);
                db.SaveChanges(); // Save changes to the Users table to get the UserId

                // Check the RoleId and add the user to the respective table
                if (user.RoleId == 1) // RoleId 1 = Buyer
                {
                    Buyer buyer = new Buyer
                    {
                        UserId = user.UserId,     // Link Buyer to the User
                        BuyerName = user.Username, // Set Buyer's name as Username
                        Address = user.Address     // Set Buyer's address
                    };
                    db.Buyers.Add(buyer);
                }
                else if (user.RoleId == 2) // RoleId 2 = Seller
                {
                    Seller seller = new Seller
                    {
                        UserId = user.UserId,      // Link Seller to the User
                        SellerName = user.Username // Set Seller's name as Username
                    };
                    db.Sellers.Add(seller);
                }

                db.SaveChanges(); // Save changes to the Buyer or Seller table
            }

            return Ok(user); // Return the saved user
        }


        // Update an existing user
        [HttpPost]
        public string UpdateUser(User user)
        {
            using (var db = new petpalaceContext())
            {
                var existingUser = db.Users.Find(user.UserId);
                if (existingUser != null)
                {
                    existingUser.Username = user.Username;
                    existingUser.Email = user.Email;
                    existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
                    existingUser.Role = user.Role;
                    db.SaveChanges(); // Save changes to the database
                }
            }
            return "User updated successfully!";
        }


        // Delete a user by ID
        [HttpDelete]
        public string DeleteUser(int id)
        {
            using (var db = new petpalaceContext())
            {
                var user = db.Users.Find(id);
                if (user != null)
                {
                    db.Users.Remove(user);
                    db.SaveChanges(); // Save changes to the database
                }
            }
            return "User deleted successfully!";
        }

        // Verify login
        [HttpPost]
        public User VerifyLogin(LoginModel login)
        {
            using (var db = new petpalaceContext())
            {
                var user = db.Users.FirstOrDefault(u => u.Username == login.Username);
                if (user != null && BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash))
                {
                    return user;
                }
            }
            return null;
        }
    }
}
