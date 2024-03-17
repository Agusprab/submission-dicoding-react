import React from "react";

function NoteAppItemAction({id,onDelete,onArchive,isArsip}){
    return(
        <div className="note-item__action">
            <button className="note-item__delete-button" onClick={() => onDelete(id)}>Delete</button>
            <button className="note-item__archive-button" onClick={() => onArchive(id)}>{isArsip === false ? 'Arsipkan' : 'Pindahkan'}</button>
        </div>
    )
}


export default NoteAppItemAction;