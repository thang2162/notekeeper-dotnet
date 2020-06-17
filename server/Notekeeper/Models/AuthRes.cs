
namespace Notekeeper.Models
{
    public class AuthRes
    {
        public string Token { get; set; }
        public string Id { get; set; }
        public string Email { get; set; }


        public AuthRes(string Id, string Email, string Token)
        {
            this.Id = Id;
            this.Email = Email;
            this.Token = Token;
        }
    }
}
