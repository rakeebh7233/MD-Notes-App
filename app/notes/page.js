'use client'
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import SideNav from "@/components/SideNav";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const [isViewer, setIsViewer] = useState(true)
  const [showNav, setShowNav] = useState(false)
  const [note, setNote] = useState({
    content: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [noteIds, setNoteIds] = useState([])
  const [savingNote, setSavingNote] = useState(false)

  const { currentUser, isLoadingUser } = useAuth()

  const searchParams = useSearchParams()

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
    setIsViewer(false)
    window.history.replaceState(null, '', '/notes')
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
        const notesRef = doc(db,'users', currentUser.uid, 'notes', note.id)
        await setDoc(notesRef, {
          ...note
        }, {merge: true})

      } else {
        // Brand new Note
        const newId = note.content.replaceAll("#",'').slice(0,15)+"__"+Date.now()
        const notesRef = doc(db,'users', currentUser.uid, 'notes', newId)
        const newDocInfo = await setDoc(notesRef, {
          content: note.content,
          createdAt: serverTimestamp()
        })
        setNoteIds(curr => [...curr, newId])
        setNote({...note, id: newId})
        console.log('Note created with ID:', newId)
        window.history.pushState(null, '',`?id=${newId}`)
      }
    } catch(err) {
      console.log(err)
    } finally {
      setSavingNote(false)
    }
  }

  useEffect(() => {
    const value = searchParams.get('id')

    if (!value || !currentUser) { return }

    async function fetchNote()  {
      if (isLoading) { return }
      try {
        setIsLoading(true)
        const notesRef = doc(db,'users', currentUser.uid, 'notes', value)
        const snapshot = await getDoc(notesRef)
        const docData = snapshot.exists() ? { id: snapshot.id, ...snapshot.data()} : null
        if (docData) {
          setNote({...docData})
        }
      } catch (error) {
        console.log(err.message)
      } finally {
        setIsLoading(false)

      }
    }
    fetchNote()
  }, [currentUser, searchParams])

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
      <SideNav showNav={showNav} setShowNav={setShowNav} noteIds={noteIds} setNoteIds={setNoteIds} handleCreateNote={handleCreateNote} setNote={setNote} setIsViewer={setIsViewer}/>
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
        (<Preview
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
