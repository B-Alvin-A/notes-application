export default function Sidebar(props){
    const notesElement = props.notes.map((note, index)=>(
        <div key={note.id}>
            <div 
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note":""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                {/* <h4>Note {index + 1}</h4> */}
                <h4>{props.notes[index].body.split('\n')[0]}</h4>
                <button className="delete-btn"
                        onClick={() => props.deleteNote(event, note.id)}>
                    &times;
                </button>
            </div>
        </div>
    ))
    return(
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {notesElement}
        </section>
    )
}