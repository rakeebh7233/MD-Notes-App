'use client'
import Editor from "@/components/Editor";
import MDX from "@/components/MDX";
import SideNav from "@/components/SideNav";
import { useState } from "react";

export default function NotesPage() {
  const [isViewer, setIsViewer] = useState(true)
  const [text, setText] = useState('' )

  function handleToggleViewer() {
    setIsViewer(!isViewer)
    console.log()
  }

  return (
    <main id="notes">
      <SideNav />
      {!isViewer && 
        (<Editor text={text} setText={setText} isViewer={isViewer} handleToggleViewer={handleToggleViewer} />)
      }
      {isViewer && 
        (<MDX text={text} isViewer={isViewer} handleToggleViewer={handleToggleViewer} />)
      }
    </main>
  );
}
