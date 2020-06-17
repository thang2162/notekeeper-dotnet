
using System.ComponentModel.DataAnnotations;

namespace Notekeeper.Models
{
    public class EditNoteReq
    {
        [Required]
        public string note_id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Note { get; set; }
    }
}
