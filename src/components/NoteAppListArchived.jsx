import React from "react";
import NoteAppItem from "./NoteAppItem";


function NoteAppListArchived({notes,onDelete,onArchive}){
    return(
        <div className="notes-list">
            {
                notes.filter((note) => note.archived === true).map((note) => (
                    <NoteAppItem key={note.id} id={note.id} onDelete={onDelete} onArchive={onArchive} isArsip={note.archived}{...note}/>   
                ))
            }
        </div>
    );
}

export default NoteAppListArchived;