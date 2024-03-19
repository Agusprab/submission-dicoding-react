import React from "react";
import { getInitialData } from "../utils/index.js";
import NoteAppList from "./NoteAppList.jsx";
import NoteAppInput from "./NoteAppInput.jsx";
import NoteAppHeader from "./NoteAppHeader.jsx";
import NoteAppListArchived from "./NoteAppListArchived.jsx";

class Noteapp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      searchNotes: "",
      activeNotesUpperKeyword: [],
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.setInputSearchValue = this.setInputSearchValue.bind(this);
    this.setActiveNotesUpperKeyword =
      this.setActiveNotesUpperKeyword.bind(this);
  }
  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevstate) => {
      return {
        notes: [
          ...prevstate.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date(),
            archived: false,
          },
        ],
      };
    });
  }
  onArchiveHandler(id) {
    const notes = this.state.notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    this.setState({ notes });
  }

  searchArchivedNotes = (inputValue) => {
    const { archivedNotes } = this.state;
    const filteredArchivedNotes = archivedNotes.filter((note) =>
      note.title.toUpperCase().includes(inputValue.toUpperCase())
    );
    return filteredArchivedNotes;
  };

  setInputSearchValue(inputKeyword) {
    this.setState({ searchNotes: inputKeyword });
  }

  setActiveNotesUpperKeyword(activeNotesUpperKeyword) {
    this.setState({ activeNotesUpperKeyword });
  }

  render() {
    
    const filteredNotes = this.state.searchNotes
      ? this.state.notes.filter((note) =>
          note.title
            .toUpperCase()
            .includes(this.state.searchNotes.toUpperCase())
        )
      : this.state.notes;

    const activeNotes = filteredNotes.filter((note) => !note.archived);
    const archivedNotes = filteredNotes.filter((note) => note.archived);

    return (
      <div>
        <NoteAppHeader
          searchNotes={this.state.searchNotes}
          setInputSearchValue={this.setInputSearchValue}
          notes={this.state.notes}
          setActiveNotesUpperKeyword={this.setActiveNotesUpperKeyword}
        />
        <div className="note-app__body">
          <NoteAppInput addNote={this.onAddNoteHandler} />
          <h2>Catatan Aktif</h2>
          {activeNotes.length > 0 ? (
            <NoteAppList
              notes={activeNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
            />
          ) : (
            <p className="notes-list__empty-message">Tidak ada catatan aktif</p>
          )}
          <h2>Arsip</h2>
          {archivedNotes.length > 0 ? (
            <NoteAppListArchived
              notes={archivedNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
            />
          ) : (
            <p className="notes-list__empty-message">
              Tidak ada catatan dalam arsip
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Noteapp;
