import React from "react";
import NoteAppItem from "./NoteAppItem";


function NoteAppList({notes,onDelete,onArchive}){
    return(
        <div className="notes-list">
            {
                notes.filter((note) => note.archived === false).map((note) => (
                    <NoteAppItem key={note.id} id={note.id} onDelete={onDelete} onArchive={onArchive} isArsip={note.archived}{...note}/>   
                ))
            }
        </div>
    );
}

export default NoteAppList;