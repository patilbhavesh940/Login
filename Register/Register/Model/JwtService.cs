using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Register.Model
{
  public class JwtService
  {
    public string SecretKey { get; set; }
    public int TokenDuration { get; set; }
    private readonly IConfiguration configuration;

    public JwtService(IConfiguration _configuration)
    {
      this.configuration = _configuration;
      this.SecretKey = configuration.GetSection("jwtConfig").GetSection("Duration").Value;
      this.TokenDuration = Int32.Parse(configuration.GetSection("jwtConfig").GetSection("Duration").Value);
    }

    public string GenerateToken(String id, String firstName, String lastName, String email, String mobile, String gender)
    {
      var hmac = new HMACSHA256();
      var key = new SymmetricSecurityKey(hmac.Key);
      var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      var payload = new[]
      {
        new Claim("id",id),
        new Claim("firstName",firstName),
        new Claim("lastName",lastName),
        new Claim("email",email),
        new Claim("mobile",mobile),
        new Claim("gender",gender),
      };

      var jwtToken = new JwtSecurityToken(
          issuer: "localhost",
          audience: "localhost",
          claims: payload,
          expires: DateTime.Now.AddMinutes(TokenDuration),
          signingCredentials:signature
        );

      return new JwtSecurityTokenHandler().WriteToken(jwtToken);
    }
  }
}
