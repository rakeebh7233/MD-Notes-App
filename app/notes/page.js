'use client'
import Editor from "@/components/Editor";
import MDX from "@/components/MDX";
import SideNav from "@/components/SideNav";
import { useState } from "react";

export default function NotesPage() {
  const [isViewer, setIsViewer] = useState(true)
  const [text, setText] = useState('')
  const [showNav, setShowNav] = useState(false)


  function handleToggleViewer() {
    setIsViewer(!isViewer)
    console.log()
  }

  function handleToggleMenu() {
    setShowNav(!showNav)
  }

  return (
    <main id="notes">
      <SideNav showNav={showNav} setShowNav={setShowNav} />
      {!isViewer &&
        (<Editor 
          text={text} 
          setText={setText} 
          isViewer={isViewer} 
          handleToggleViewer={handleToggleViewer} 
          handleToggleMenu={handleToggleMenu}
        />)
      }
      {isViewer &&
        (<MDX 
          text={text} 
          isViewer={isViewer} 
          handleToggleViewer={handleToggleViewer} 
          handleToggleMenu={handleToggleMenu}
        />)
      }
    </main>
  );
}
