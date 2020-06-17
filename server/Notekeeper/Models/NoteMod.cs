using System;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Notekeeper.Models
{
    public class NoteMod
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("email")]
        [JsonProperty("email")]
        public string Email { get; set; }

        [BsonElement("title")]
        [JsonProperty("title")]
        public string Title { get; set; }

        [BsonElement("note")]
        [JsonProperty("note")]
        public string Note { get; set; }

        [BsonElement("CreatedOn")]
        public DateTime CreatedOn { get; set; }

        public NoteMod(DateTime CreatedOn, string Email, string Title, string Note)
        {
            this.CreatedOn = CreatedOn;
            this.Email = Email;
            this.Title = Title;
            this.Note = Note;
        }

        public NoteMod(String Id, DateTime CreatedOn, string Email, string Title, string Note)
        {
            this.Id = Id;
            this.CreatedOn = CreatedOn;
            this.Email = Email;
            this.Title = Title;
            this.Note = Note;
        }
    }
}
