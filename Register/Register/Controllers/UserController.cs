using Microsoft.AspNetCore.Mvc;
using Register.Model;

namespace Register.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly IConfiguration _config;
    private readonly UserContext _userContext;

    public UserController(IConfiguration configuration, UserContext userContext)
    {
      _config = configuration;
      _userContext = userContext; 
    }

    [HttpPost("CreateUser")]
    public IActionResult Create(User user)
    {
      if(_userContext.Users.Where(u => u.Email == user.Email).FirstOrDefault() != null)
      {
        return Ok("AlreadyExist");
      }

      user.MemberSince= DateTime.Now;
      _userContext.Users.Add(user);
      _userContext.SaveChanges();
      return Ok("Success");
    }

    [HttpPost("LoginUser")]
    public IActionResult Login(Login login)
    {
      var validUser = _userContext.Users.Where(u => u.Email == login.Email && u.Password == login.Password).FirstOrDefault();
      if(validUser != null)
      {
        return Ok(new JwtService(_config).GenerateToken(
          validUser.UserId.ToString(),
          validUser.FirstName,
          validUser.LastName,
          validUser.Email,
          validUser.Mobile,
          validUser.Gender
          ));
      }
      return Ok("Failure");
    }
  }
}
