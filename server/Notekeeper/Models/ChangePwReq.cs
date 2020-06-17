
using System.ComponentModel.DataAnnotations;

namespace Notekeeper.Models
{
    public class ChangePwReq
    {
        [Required]
        public string OldPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}
