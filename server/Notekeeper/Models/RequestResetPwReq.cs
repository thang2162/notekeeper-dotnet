
using System.ComponentModel.DataAnnotations;

namespace Notekeeper.Models
{
    public class RequestResetPwReq
    {
        [Required]
        public string Email { get; set; }
    }
}
