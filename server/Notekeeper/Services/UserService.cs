using System;
// using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using Notekeeper.Models;
using Notekeeper.Utils;

namespace Notekeeper.Services
{
    
    public interface IUserService
    {
        AuthRes Authenticate(UserReq model);
        Task<bool> NewUser(UserReq model);
        void DeleteUser(string email);
        UserMod GetUser(string email);
        string ChangePw(string email, string oldPassword, string newPassword);
        Task<bool> RequestResetPw(string email);
        Task<string> ResetPw(ResetPwReq model);

        // Enumerable<UserMod> GetAll();
    }

    public class UserService : IUserService
    {


        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        /* private List<UserMod> _users = new List<UserMod>
        {
            new UserMod { Id = 1, ResetKey = "key", Email = "test@email.com", Password = "test" }
        }; */

        private readonly AppSettings _appSettings;

        private readonly IMongoCollection<UserMod> _users;
        private readonly IMongoCollection<NoteMod> _notes;

        public UserService(IOptions<AppSettings> appSettings, INotekeeperDatabaseSettings settings)
        {
            _appSettings = appSettings.Value;

            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<UserMod>(settings.UserCollectionName);
            _notes = database.GetCollection<NoteMod>(settings.NoteCollectionName);
        }

        /* public IEnumerable<UserMod> GetAll()
        {
            return _users.Find(user => true).ToList(); ;
        } */

        public AuthRes Authenticate(UserReq model)
        {
            var user = _users.Find<UserMod>(user => user.Email == model.Email).FirstOrDefault();

            bool verifyPw = BCrypt.Net.BCrypt.Verify(model.Password, user.Password);

            // return null if user not found
            if (user == null || verifyPw == false) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthRes(user.Id, user.Email, token);
        }

        public async Task<bool> NewUser(UserReq model)
        {
            bool status = await Task.Run(async () => { 

            DateTime saveUtcNow = DateTime.UtcNow;

            Console.WriteLine(model.Password);

            var hash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            Console.WriteLine(hash);

                var filter = Builders<UserMod>.Filter.Eq("email", model.Email);
                var update = Builders<UserMod>.Update.SetOnInsert("email", model.Email).SetOnInsert("password", hash)
                .SetOnInsert("CreatedOn", saveUtcNow).SetOnInsert("resetKey", BsonNull.Value);
                UpdateResult db_res = _users.UpdateOne(filter, update, new UpdateOptions { IsUpsert = true });

                string messBody = "Hi There, " + "\n\nEmail: " + model.Email + "\nPassword: " + model.Password;

                if (db_res.UpsertedId == null)
                {
                    return false;
                }
                else
                {
                    bool status = await MailSender.SendMail(model.Email, "Welcome To NoteKeeper!", messBody, _appSettings);

                    if (status == false)
                    {
                        _users.DeleteOne(user => user.Id == db_res.UpsertedId);
                        return false;
                    } else
                    {
                        return true;
                    }

                }

            });

            return status;

        }

        public UserMod GetUser(string email) =>
            _users.Find<UserMod>(user => user.Email == email).FirstOrDefault();

        public void DeleteUser(string email)
        {
            _notes.DeleteMany(note => note.Email == email);
            _users.DeleteOne(user => user.Email == email);
        }

        public string ChangePw(string email, string oldPassword, string newPassword)
        {
            var user = _users.Find<UserMod>(user => user.Email == email).FirstOrDefault();

            bool verifyPw = BCrypt.Net.BCrypt.Verify(oldPassword, user.Password);

            // return false if user not found or wrong password
            if (user == null || verifyPw == false) return "wrong_pw";

            var hash = BCrypt.Net.BCrypt.HashPassword(newPassword);

            var filter = Builders<UserMod>.Filter.Eq("email", email);
            var update = Builders<UserMod>.Update.Set("password", hash);
            UpdateResult db_res = _users.UpdateOne(filter, update);

            if (db_res.ModifiedCount > 0)
            {
                return "success";
            }
            else
            {
                return "error";
            }

        }

        public async Task<bool> RequestResetPw(string email)
        {
            string resetKey = Password.GenerateRandom(32);
            string messBody = "Please use the following link to reset your password: " +
                "\nhttps://dotnet-notekeeper.bithatchery.com/#/resetpassword?key=" + resetKey
                + "&email=" + email;

            var filter = Builders<UserMod>.Filter.Eq("email", email);
            var update = Builders<UserMod>.Update.Set("resetKey", resetKey);
            UpdateResult db_res = _users.UpdateOne(filter, update);

            if (db_res.ModifiedCount > 0)
            {
                bool status = await MailSender.SendMail(email, "Reset Your Password!", messBody, _appSettings);

                if (status == true)
                {
                    return true;
                } else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }

        }

        public async Task<string> ResetPw(ResetPwReq model)
        {
            string response = await Task.Run(() =>
            {
                var user = _users.Find<UserMod>(user => user.Email == model.Email &&
            user.ResetKey == model.Key && user.ResetKey != null).FirstOrDefault();

                // return false if user not found or wrong password
                if (user == null) return "invalid_key";

                var hash = BCrypt.Net.BCrypt.HashPassword(model.Password);

                var filter = Builders<UserMod>.Filter.Eq("email", model.Email);
                var update = Builders<UserMod>.Update.Set("password", hash)
                    .Set("resetKey", BsonNull.Value);
                UpdateResult db_res = _users.UpdateOne(filter, update);

                if (db_res.ModifiedCount > 0)
                {
                    return "success";
                }
                else
                {
                    return "error";
                }
            });

            return response;

        }

        // helper methods

        private string generateJwtToken(UserMod user)
        {
            // generate token that is valid for 1 day
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.JwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("user_email", user.Email.ToString()),
                    new Claim("user_id", user.Id.ToString()),
                   // new Claim(ClaimTypes.Role, "admin"),
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _appSettings.JwtIssuer
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
