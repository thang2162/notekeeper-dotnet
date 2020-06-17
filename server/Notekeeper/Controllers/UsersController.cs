using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Notekeeper.Services;
using Notekeeper.Models;

namespace Notekeeper.Controllers
{
    [Authorize(Roles = "admin")]
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {

        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        [Consumes("application/x-www-form-urlencoded")]
        public IActionResult Authenticate([FromForm] UserReq model)
        {

            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        [Consumes("application/json")]
        public IActionResult AuthenticateJson([FromBody] UserReq model)
        {

            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

       /*[HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();

            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;

            var claims = claimsIdentity.Claims.Select(x => new { type = x.Type, value = x.Value });

            var email = claimsIdentity.FindFirst("user_email").Value;

            return Ok(new { users = users, email = email, claims = claims });

        } */
    }

}