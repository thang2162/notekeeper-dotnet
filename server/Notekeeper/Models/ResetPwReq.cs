
using System.ComponentModel.DataAnnotations;

namespace Notekeeper.Models
{
    public class ResetPwReq
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Key { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
