using System;
namespace Notekeeper.Utils
{
    public class NotekeeperDatabaseSettings : INotekeeperDatabaseSettings
    {
        public string UserCollectionName { get; set; }
        public string NoteCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface INotekeeperDatabaseSettings
    {
        string UserCollectionName { get; set; }
        string NoteCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
