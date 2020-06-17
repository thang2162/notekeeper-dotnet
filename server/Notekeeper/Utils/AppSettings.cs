
namespace Notekeeper.Utils
{
    public class AppSettings
    {
        public string JwtSecret { get; set; }
        public string JwtIssuer { get; set; }

        public string EmailHost { get; set; }
        public int EmailPort { get; set; }
        public string EmailUser { get; set; }
        public string EmailPass { get; set; }
        public string EmailFrom { get; set; }
        public string EmailName { get; set; }
        public bool EmailIsSecure { get; set; }

        public int SaltLength { get; set; }

    }
}
