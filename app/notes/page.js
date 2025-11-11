'use client'
import Editor from "@/components/Editor";
import MDX from "@/components/MDX";
import SideNav from "@/components/SideNav";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { doc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export default function NotesPage() {
  const [isViewer, setIsViewer] = useState(true)
  // const [text, setText] = useState('')
  const [showNav, setShowNav] = useState(false)
  const [note, setNote] = useState({
    content: ''
  })
  const [noteIds, setNoteIds] = useState([])
  const [savingNote, setSavingNote] = useState(false)

  const { currentUser, isLoadingUser } = useAuth()

  function handleToggleViewer() {
    setIsViewer(!isViewer)
    console.log()
  }

  function handleToggleMenu() {
    setShowNav(!showNav)
  }

  async function handleCreateNote() {
    setNote({
      content: ''
    })
  }

  async function handleEditNote(e) {
    setNote({...note, content: e.target.value})
  }

  async function handleSaveNote() {
    if (!note?.content) {return}
    
    setSavingNote(true)
    try {
      // Note already Exists
      if (note.id) {

      } else {
        // Brand new Note
        const newId = note.content.slice(0,15)+__+Date().now()
        const notesRef = doc(db,'users', currentUser.uid, 'notes', newId)
        const newDocInfo = await setDoc(notesRef, {
          content: note.content,
          createdAt: serverTimestamp()
        })
        setNote({...note, id: newId})
      }
    } catch(err) {
      console.log(err)
    } finally {
      setSavingNote(false)
    }
  }

  if (isLoadingUser) {
    return (
      <h6 className="text-gradient">Loading...</h6>
    )
  }

  if (!currentUser) {
    window.location.href = '/'
  }

  return (
    <main id="notes">
      <SideNav showNav={showNav} setShowNav={setShowNav} />
      {!isViewer &&
        (<Editor
          text={note.content}
          setText={handleEditNote}
          isViewer={isViewer}
          handleToggleViewer={handleToggleViewer}
          handleToggleMenu={handleToggleMenu}
          handleSaveNote={handleSaveNote}
          savingNote={savingNote}
        />)
      }
      {isViewer &&
        (<MDX
          text={note.content}
          isViewer={isViewer}
          handleToggleViewer={handleToggleViewer}
          handleToggleMenu={handleToggleMenu}
          handleSaveNote={handleSaveNote}
          savingNote={savingNote}
        />)
      }
    </main>
  );
}
