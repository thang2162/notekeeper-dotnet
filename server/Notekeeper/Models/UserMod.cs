using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Notekeeper.Models
{
    public class UserMod
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("email")]
        [JsonProperty("email")]
        public string Email { get; set; }

        [BsonElement("password")]
        [JsonProperty("password")]
        public string Password { get; set; }

        [BsonElement("resetKey")]
        [JsonProperty("resetKey")]
        public string ResetKey { get; set; }

        [BsonElement("CreatedOn")]
        public DateTime CreatedOn { get; set; }
    }
}
