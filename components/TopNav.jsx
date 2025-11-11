export default function TopNav(props) {
    const { isViewer, handleToggleViewer } = props
    
    return (
        <>
            <div className="notes-btn">
                <button className="card-button-primary menu">
                    <i className="fa-solid fa-bars"></i>
                </button>
                <button>
                    <h6>Save</h6>
                    <i className="fa-solid fa-floppy-disk"></i>
                </button>
                <button onClick={handleToggleViewer} className="card-button-secondary">
                    {isViewer ?
                        <>
                            <h6>Editor</h6>
                            <i className="fa-solid fa-pencil"></i>
                        </>
                        :
                        <>
                            <h6>Viewer</h6>
                            <i className="fa-solid fa-check-double"></i>
                        </>
                    }

                </button>
            </div>
            <div className="full-line"></div>
        </>

    )
}