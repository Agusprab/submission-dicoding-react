import React from "react";

function NoteAppItemAction({id,onDelete,onArchive,isArsip}){
    return(
        <div className="note-item__action">
            <button className="note-item__delete-button" onClick={() => onDelete(id)}><i class="fa fa-trash" aria-hidden="true"></i></button>
            <button className="note-item__archive-button" onClick={() => onArchive(id)}>{isArsip === false ? <i class="fa fa-archive" aria-hidden="true"></i>: <i class="fa fa-arrow-right" aria-hidden="true"></i>}</button>
        </div>
    )
}


export default NoteAppItemAction;
