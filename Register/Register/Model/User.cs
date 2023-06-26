namespace Register.Model
{
  public class User
  {
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set;}
    public string Mobile { get; set; }
    public string Gender { get; set; }
    public DateTime MemberSince { get; set; }
  }
}
