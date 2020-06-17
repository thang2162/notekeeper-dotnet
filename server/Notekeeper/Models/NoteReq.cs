
using System.ComponentModel.DataAnnotations;

namespace Notekeeper.Models
{
    public class NoteReq
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Note { get; set; }
    }
}
