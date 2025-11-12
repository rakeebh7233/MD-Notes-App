import { useAuth } from "@/context/AuthContext"
import { db } from "@/firebase"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export default function SideNav(props) {
    const {showNav, setShowNav, noteIds, setNoteIds, handleCreateNote, setNote, setIsViewer } = props
    const {currentUser, logout} = useAuth()

    const ref = useRef()
    const router = useRouter()

    async function deleteNote(noteId) {
        try {
            const noteRef = doc(db,'users', currentUser.uid, 'notes', noteId)
            await deleteDoc(noteRef)
            setNoteIds((curr) => {
                return curr.filter(id => id !== noteId)
            })
            
        } catch(err) {
            console.log(err);
        }
        window.history.replaceState(null, '', '/notes')
        setNote({
            content: ''
        })
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowNav(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [ref])

    useEffect( () => {
        if (!currentUser) {return}

        async function fetchNoteIds() {
            try {
                const notesRef = collection(db, 'users', currentUser.uid, 'notes')
                const snapshot = await getDocs(notesRef)
                const notesIndexes = snapshot.docs.map((doc) => {
                    return doc.id
                })
                setNoteIds(notesIndexes)
            } catch(err) {
                console.log(err)
            } 
        }
        console.log('Fetching Note Ids')
        fetchNoteIds()
    },[])

    return (
        <section ref={ref} className={"nav " + (showNav? '' : ' hidden-nav ')}>
            <h1 className="text-gradient">MDNOTES</h1>
            <h6>Easy Breezy Notes</h6>
            <div className="full-line"></div>   
            <button onClick={handleCreateNote}>
                <h6>New Note</h6>
                <i className="fa-solid fa-plus"></i>
            </button>
            <div className="notes-list">
                {noteIds.length == 0 ?
                    <p>You have 0 notes</p> :
                    noteIds.map((note, idx) => {
                        const [n, d] = note.split("__")
                        const date = (new Date(parseInt(d))).toString()
                        return (
                            <button onClick={() => {
                                router.push('/notes?id='+note)
                                setIsViewer(true)
                            }} key={idx} className="card-button-secondary list-btn">
                                <p>{n}</p>
                                <small>{date.split(' ').slice(1,4).join(' ')}</small>
                                <div onClick={(e) => {
                                    e.stopPropagation()
                                    deleteNote(note)}
                                } className="delete-btn">
                                    <i className="fa-solid fa-trash-can"></i>
                                </div>
                            </button>
                        )
                    })}
            </div>
            <div className="full-line"></div>
            <button onClick={logout}>
                <h6>Logout</h6>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
        </section>
    )
}