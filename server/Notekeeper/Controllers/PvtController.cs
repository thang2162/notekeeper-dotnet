using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Notekeeper.Models;
using Notekeeper.Services;

namespace Notekeeper.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class PvtController : ControllerBase
    {

        private INoteService _noteService;
        private IUserService _userService;

        public PvtController(INoteService noteService, IUserService userService)
        {
            _noteService = noteService;
            _userService = userService;
        }

        //New Note - Start
        [HttpPost("newNote")]
        [Consumes("application/x-www-form-urlencoded")]
        public ActionResult NewNote([FromForm] NoteReq model)
        {
            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;

            var email = claimsIdentity.FindFirst("user_email").Value;

            _noteService.NewNote(model, email);

            return Ok(new { msg = "New note created!", status = "success" });

        }

        [HttpPost("newNote")]
        [Consumes("application/json")]
        public ActionResult NewNoteJson([FromBody] NoteReq model)
        {
            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;

            var email = claimsIdentity.FindFirst("user_email").Value;

            _noteService.NewNote(model, email);

            return Ok(new { msg = "New note created!", status = "success" });

        }
        //New Note - End

        //Edit Note - Start
        [HttpPost("editNote")]
        [Consumes("application/x-www-form-urlencoded")]
        public ActionResult EditNote([FromForm] EditNoteReq model)
        {
            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;

            var email = claimsIdentity.FindFirst("user_email").Value;

            _noteService.EditNote(model, email);

            return Ok(new { msg = "Note successfully edited!", status = "success" });

        }

        [HttpPost("editNote")]
        [Consumes("application/json")]
        public ActionResult EditNoteJson([FromBody] EditNoteReq model)
        {
            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;

            var email = claimsIdentity.FindFirst("user_email").Value;

            _noteService.EditNote(model, email);

            return Ok(new { msg = "Note successfully edited!", status = "success" });

        }
        //Edit Note - End

        [HttpDelete("deleteNote/{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;

            var email = claimsIdentity.FindFirst("user_email").Value;

            var note = _noteService.GetNote(id, email);

            if (note == null)
            {
                return Ok(new { msg = "Note not found!", status = "failed" });
            }

            _noteService.DeleteNote(id, email);

            return Ok(new { msg = "Note successfully deleted!", status = "success" });
        }

        [HttpGet("getNotes")]
        public ActionResult<List<NoteMod>> GetNotes()
        {
            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;

            var email = claimsIdentity.FindFirst("user_email").Value;

            return _noteService.GetNotes(email);
        }

        [HttpDelete("deleteUser")]
        public IActionResult DeleteUser()
        {
            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;

            var email = claimsIdentity.FindFirst("user_email").Value;

            var user = _userService.GetUser(email);

            if (user == null)
            {
                return Ok(new { msg = "User not found!", status = "failed" });
            } else
            {
                _userService.DeleteUser(email);
                return Ok(new { msg = "User successfully deleted!", status = "success" });
            }

        }

        //Change Password - Start
        [HttpPost("changePassword")]
        [Consumes("application/x-www-form-urlencoded")]
        public ActionResult ChangePassword([FromForm] ChangePwReq model)
        {
            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;

            var email = claimsIdentity.FindFirst("user_email").Value;

            string status = _userService.ChangePw(email, model.OldPassword, model.NewPassword);

            if (status == "wrong_pw")
            {
                return Ok(new { msg = "Email or password is incorrect!", status = "failed" });
            } else if (status == "error")
            {
                return BadRequest(new { msg = "Server Error. Please try again later.", status = "failed" });
            } else
            {
                return Ok(new { msg = "Password changed successfully!", status = "success" });
            }

        }

        [HttpPost("changePassword")]
        [Consumes("application/json")]
        public ActionResult ChangePasswordJson([FromBody] ChangePwReq model)
        {
            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;

            var email = claimsIdentity.FindFirst("user_email").Value;

            string status = _userService.ChangePw(email, model.OldPassword, model.NewPassword);

            if (status == "wrong_pw")
            {
                return Ok(new { msg = "Email or password is incorrect!", status = "failed" });
            }
            else if (status == "error")
            {
                return BadRequest(new { msg = "Server Error. Please try again later.", status = "failed" });
            }
            else
            {
                return Ok(new { msg = "Password changed successfully!", status = "success" });
            }

        }
        //Change Password - End
    }
}