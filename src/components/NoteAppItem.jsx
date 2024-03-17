import React from "react";
import NoteAppItemAction from "./NoteAppItemAction";
import NoteAppItemContent from './NoteAppItemContent'


function NoteAppItem({id,title,body,createdAt,onDelete,onArchive,isArsip}){
    return(
        <div className="note-item">
            <NoteAppItemContent title={title} body={body} createdAt={createdAt} />
            <NoteAppItemAction id={id} onDelete={onDelete} onArchive={onArchive} isArsip={isArsip}/>
        </div>
    )
}

export default NoteAppItem;