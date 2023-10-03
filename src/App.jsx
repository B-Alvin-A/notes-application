import React from "react"
import { nanoid } from "nanoid"
import Split from "react-split"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"

export default function App() {
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem('notes')) || [])
  const [currentNoteId, setCurrentNoteId] = React.useState(notes[0]?.id || '')
  
  React.useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]

  function createNewNote(){
    const newNote = {
      id : nanoid(),
      body : "#Type your Markdown note's title here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  // Alternative way of finding current note id
  // function findCurrentNote(){
  //   return notes.find(note => {
  //     return note.id === currentNoteId
  //   }) || notes[0]
  // }

  function updateNote(text){
    // This option re-arranges notes after editting
    setNotes(oldNotes => {
      const newArray = []
      for(let i=0; i<oldNotes.length;i++){
        oldNotes[i].id === currentNoteId ? 
          newArray.unshift({...oldNotes[i], body:text}) : newArray.push(oldNotes[i])
      }
      return newArray
    })

    // This option doesn't re-arrange notes after editting
    // setNotes(oldNotes => oldNotes.map(oldNote => {
    //   return oldNote.id === currentNoteId
    //   ?
    //   {...oldNote,body:text}
    //   :
    //   oldNote
    // }))
  }

  function deleteNote(event, noteId){
    event.stopPropagation()
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
  }

  return (
    <main>
      {notes.length > 0
      ?
        <Split
          sizes={[30,70]}
          direction="horizontal"
          gutterSize={10}
          className="split"
        >
          <Sidebar 
              notes={notes}
              newNote={createNewNote}
              currentNote={currentNote}
              setCurrentNoteId={setCurrentNoteId}
              deleteNote={deleteNote}
          />
          <Editor 
            currentNote={currentNote}
            updateNote={updateNote}
          />
        </Split>
      :
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note"
                  onClick={createNewNote}>
            Create one now
          </button>
        </div>
      }
    </main>
  )
}