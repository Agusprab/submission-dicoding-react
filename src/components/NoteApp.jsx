import React from "react";
import {getInitialData} from '../utils/index.js'
import NoteAppList from './NoteAppList.jsx';
import NoteAppInput from "./NoteAppInput.jsx";
import NoteAppHeader from './NoteAppHeader.jsx';
import NoteappListArchived from './NoteAppListArchived.jsx';
import NoteAppListArchived from "./NoteAppListArchived.jsx";

class Noteapp extends React.Component{
    constructor(props){
        super(props);


        this.state = {
            notes : getInitialData(),
            searchNotes: "",
            activeNotesUpperKeyword: [],
        }
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.setInputSearchValue = this.setInputSearchValue.bind(this);
        this.setActiveNotesUpperKeyword = this.setActiveNotesUpperKeyword.bind(this);
    }
    onDeleteHandler(id) {
        const notes = this.state.notes.filter(note => note.id !== id);
        this.setState({ notes });
      }
    
    onAddNoteHandler({title,body}){
        this.setState((prevstate) =>{
            return{
                notes : [...prevstate.notes,
                {
                    id : +new Date(),
                    title,
                    body,
                    createdAt : new Date(),
                    archived : false
                }]
            }
        })
    }
    onArchiveHandler(id){
        const notes = this.state.notes.map((note) => note.id === id ? { ...note, archived: !note.archived } : note)
        this.setState({ notes });


    }
     

    searchArchivedNotes = (inputValue) => {
        const { archivedNotes } = this.state;
        const filteredArchivedNotes = archivedNotes.filter((note) => note.title.toUpperCase().includes(inputValue.toUpperCase()));
        return filteredArchivedNotes;
      };
    
      setInputSearchValue(inputKeyword) {
        this.setState({ searchNotes: inputKeyword });
      }
    
      setActiveNotesUpperKeyword(activeNotesUpperKeyword) {
        this.setState({ activeNotesUpperKeyword });
      }
    
    render(){
        

        return(
            <div>
                <NoteAppHeader searchNotes={this.state.searchNotes} setInputSearchValue={this.setInputSearchValue} notes={this.state.notes} setActiveNotesUpperKeyword={this.setActiveNotesUpperKeyword}/>            
                <div className="note-app__body">            
                    <NoteAppInput addNote={this.onAddNoteHandler}/>  
                    <h2>Catatan Aktif</h2>                    
                    {this.state.notes.filter((note) => note.archived === false).length > 0 ?<NoteAppList notes={this.state.activeNotesUpperKeyword.length > 0 ? this.state.activeNotesUpperKeyword : this.state.notes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} isArsip={this.state.notes.archived}/> : <p class="notes-list__empty-message">Tidak ada catatan</p>}
                    <h2>Arsip</h2>
                    {this.state.notes.filter((note) => note.archived === true).length > 0 ?<NoteAppListArchived notes={this.state.activeNotesUpperKeyword.length > 0 ? this.state.activeNotesUpperKeyword : this.state.notes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler}/> : <p class="notes-list__empty-message">Tidak ada catatan</p>}
                </div>
            </div>
        )
    }
}

export default Noteapp;