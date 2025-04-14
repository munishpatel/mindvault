import React, { useEffect, useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import journalDB from "../db/journalDB";
import "./Journal.css";

const Journal = () => {
  const [content, setContent] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      const allNotes = await journalDB.notes.reverse().toArray();
      setSavedNotes(allNotes);
    };
    loadNotes();
  }, []);

  const handleSave = async () => {
    if (content.trim() === "") return;

    await journalDB.notes.add({
      content,
      timestamp: new Date().toISOString(),
    });

    setContent("");
    const updated = await journalDB.notes.reverse().toArray();
    setSavedNotes(updated);
  };

  const handleDelete = async (id) => {
    await journalDB.notes.delete(id);
    const updated = await journalDB.notes.reverse().toArray();
    setSavedNotes(updated);
  };

  return (
    <div className="journal-container">
      <h2>✍️ Trip Journal</h2>
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="Write about your day..."
        className="editor"
      />
      <button className="save-btn" onClick={handleSave}>
        Save Note
      </button>

      <div className="note-list">
        <h3>🗂 Saved Notes</h3>
        {savedNotes.map((note) => (
          <div className="note-card" key={note.id}>
            <div
              className="note-content"
              dangerouslySetInnerHTML={{ __html: note.content }}
            ></div>
            <p className="timestamp">
              {new Date(note.timestamp).toLocaleString()}
            </p>
            <button className="delete-btn" onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
