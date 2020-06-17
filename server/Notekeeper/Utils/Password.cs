using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Notekeeper.Utils
{
    public class Password
    {

        public static string Hash(string password, int saltLen)
        {
            // Console.WriteLine($"Orig Pwd: {password}");

            // generate a 128-bit salt using a secure PRNG
            byte[] salt = new byte[(saltLen * 8) / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            // Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            // Console.WriteLine($"Hashed: {hashed}");

            return Convert.ToBase64String(salt) + hashed;
          
        }

        public bool Verify(string password, string hash, int saltLen)
        {
            string saltStr = hash.Substring(0, (int)(4 * Math.Ceiling(((double)saltLen / 3))));
            string passwordHash = hash.Substring((int)(4 * Math.Ceiling(((double)saltLen / 3))));

            if (hash.Length > (int)(4 * Math.Ceiling(((double)saltLen / 3))))
            {
                //Extract Salt from hash
                byte[] salt = Convert.FromBase64String(saltStr);

                // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
                string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8));
                Console.WriteLine($"Hashed: {hashed}");

                if (passwordHash == hashed)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            } else {
                return false;
            }

            
        }

        public static string GenerateRandom(int length = 15)
        {
            // Create a string of characters, numbers, special characters that allowed in the password  
            string validChars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$+-_~";
            Random random = new Random();

            // Select one random character at a time from the string  
            // and create an array of chars  
            char[] chars = new char[length];
            for (int i = 0; i < length; i++)
            {
                chars[i] = validChars[random.Next(0, validChars.Length)];
            }
            return new string(chars);
        }
    }
}
