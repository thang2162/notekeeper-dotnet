using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Notekeeper.Models;
using Notekeeper.Services;

namespace Notekeeper.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class PubController : ControllerBase
    {
        private IUserService _userService;

        public PubController(IUserService userService)
        {
            _userService = userService;
        }

        //New User - Start
        [AllowAnonymous]
        [HttpPost("newUser")]
        [Consumes("application/x-www-form-urlencoded")]
        public async Task<ActionResult> NewUserAsync([FromForm] UserReq model)
        {

            var response = await _userService.NewUser(model);

            if (response == false)
                return BadRequest(new { msg = "Account already exists.", status = "failed" });

            return Ok(new { msg = "Account successfully created! Please check your email.", status = "success" });
        }

        [AllowAnonymous]
        [HttpPost("newUser")]
        [Consumes("application/json")]
        public async Task<IActionResult> NewUserJsonAsync([FromBody] UserReq model)
        {

            var response =  await _userService.NewUser(model);

            if (response == false)
                return BadRequest(new { msg = "Account already exists.", status = "failed" });

            return Ok(new { msg = "Account successfully created! Please check your email.", status = "success" });
        }
        //New User - End

        //Login User - Start
        [AllowAnonymous]
        [HttpPost("userLogin")]
        [Consumes("application/x-www-form-urlencoded")]
        public IActionResult Authenticate([FromForm] UserReq model)
        {

            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { msg = "Email or password is incorrect", status = "failed" });

            return Ok(new { msg = "You're logged in!", status = "success", jwt = response.Token });
        }

        [AllowAnonymous]
        [HttpPost("userLogin")]
        [Consumes("application/json")]
        public IActionResult AuthenticateJson([FromBody] UserReq model)
        {

            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { msg = "Email or password is incorrect", status = "success" });

            return Ok(new { msg = "You're logged in!", status = "success", jwt = response.Token });
        }
        //Login User - End

        //Request Password Reset - Start
        [AllowAnonymous]
        [HttpPost("reqPwReset")]
        [Consumes("application/x-www-form-urlencoded")]
        public async Task<IActionResult> ReqPwReset([FromForm] RequestResetPwReq model)
        {

            var response = _userService.GetUser(model.Email);

            if (response == null)
                return BadRequest(new { message = "Account not found!", status = "failed"});

            bool status = await _userService.RequestResetPw(model.Email);

            if (status == true)
            {
                return Ok(new { msg = "Password Reset Request Successful! Please check your email.", status = "success" });
            } else
            {
                return BadRequest(new { message = "Server Error! Please try again later.", status = "error" });
            }
        }

        [AllowAnonymous]
        [HttpPost("reqPwReset")]
        [Consumes("application/json")]
        public async Task<IActionResult> ReqPwResetJson([FromBody] RequestResetPwReq model)
        {

            var response = _userService.GetUser(model.Email);

            if (response == null)
                return BadRequest(new { message = "Account not found!", status = "failed" });

            bool status = await _userService.RequestResetPw(model.Email);

            if (status == true)
            {
                return Ok(new { msg = "Password Reset Request Successful! Please check your email.", status = "success" });
            }
            else
            {
                return BadRequest(new { message = "Server Error! Please try again later.", status = "error" });
            }
        }
        //Request Password Reset - End


        //Reset Password - Start
        [AllowAnonymous]
        [HttpPost("resetPw")]
        [Consumes("application/x-www-form-urlencoded")]
        public async Task<IActionResult> PwReset([FromForm] ResetPwReq model)
        {

            string response = await _userService.ResetPw(model);

            if (response == "invalid_key")
            {
                return BadRequest(new { message = "Invalid Key!", status = "failed" });
            }
            else if (response == "error")
            {
                return BadRequest(new { message = "Server Error! Please try again later.", status = "error" });
            }
            else
            {
                return Ok(new { msg = "Your password has been reset.", status = "success" });    
            }
        }

        [AllowAnonymous]
        [HttpPost("resetPw")]
        [Consumes("application/json")]
        public async Task<IActionResult> PwResetJson([FromBody] ResetPwReq model)
        {

            string response = await _userService.ResetPw(model);

            if (response == "invalid_key")
            {
                return BadRequest(new { message = "Account not found!", status = "failed" });
            }
            else if (response == "error")
            {
                return BadRequest(new { message = "Server Error! Please try again later.", status = "error" });
            }
            else
            {
                return Ok(new { msg = "Your password has been reset.", status = "success" });
            }
        }
        //Reset Password - End

    }
}