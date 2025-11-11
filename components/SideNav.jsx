import { useEffect, useRef } from "react"

export default function SideNav(props) {
    const notes = ['hello', 'world']
    const {showNav, setShowNav } = props

    const ref = useRef()

    useEffect(() => {
        console.log(ref)
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowNav(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown'. handleClickOutside)
        }

    }, [ref])

    return (
        <section ref={ref} className={"nav " + (showNav? '' : ' hidden-nav ')}>
            <h1 className="text-gradient">MDNOTES</h1>
            <h6>Easy Breezy Notes</h6>
            <div className="full-line"></div>   
            <button>
                <h6>New Note</h6>
                <i className="fa-solid fa-plus"></i>
            </button>
            <div className="notes-list">
                {notes.length == 0 ?
                    <p>You have 0 notes</p> :
                    notes.map((note, idx) => {
                        return (
                            <button key={idx} className="card-button-secondary list-btn">
                                <p>{note}</p>
                                <small>DATETIME</small>
                                <div className="delete-btn">
                                    <i className="fa-solid fa-trash-can"></i>
                                </div>
                                DELETE BUTTON ICON
                            </button>
                        )
                    })}
            </div>
            <div className="full-line"></div>
            <button>
                <h6>Logout</h6>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
        </section>
    )
}