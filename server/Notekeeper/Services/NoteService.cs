using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Notekeeper.Models;
using Notekeeper.Utils;

namespace Notekeeper.Services
{
    public interface INoteService
    {
        public void NewNote(NoteReq noteIn, string email);
        public List<NoteMod> GetNotes(string email);
        public void EditNote(EditNoteReq noteIn, string email);
        public void DeleteNote(string noteId, string email);
        public NoteMod GetNote(string noteId, string email);
    }

    public class NoteService : INoteService
    {
        private readonly AppSettings _appSettings;

        private readonly IMongoCollection<NoteMod> _notes;

        public NoteService(IOptions<AppSettings> appSettings, INotekeeperDatabaseSettings settings)
        {
            _appSettings = appSettings.Value;

            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _notes = database.GetCollection<NoteMod>(settings.NoteCollectionName);
        }

        public List<NoteMod> GetNotes(string email) =>
            _notes.Find(note => note.Email == email).ToList();

        public NoteMod GetNote(string id, string email) =>
            _notes.Find<NoteMod>(note => note.Id == id && note.Email == email).FirstOrDefault();

        public void NewNote(NoteReq noteIn, string email)
        {
            DateTime saveUtcNow = DateTime.UtcNow;
            NoteMod note = new NoteMod(saveUtcNow, email, noteIn.Title, noteIn.Note);

            _notes.InsertOne(note);
        }

        public void EditNote(EditNoteReq noteIn, string email)
        {
            DateTime saveUtcNow = DateTime.UtcNow;
            NoteMod note = new NoteMod(noteIn.note_id,saveUtcNow, email, noteIn.Title, noteIn.Note);

            _notes.ReplaceOne(note => note.Id == noteIn.note_id && note.Email == email, note);
        }

        public void DeleteNote(string noteId, string email) =>
            _notes.DeleteOne(note => note.Id == noteId && note.Email == email);
    }
}
