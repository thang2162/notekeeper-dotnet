
using System.ComponentModel.DataAnnotations;

namespace Notekeeper.Models
{
    public class UserReq
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
