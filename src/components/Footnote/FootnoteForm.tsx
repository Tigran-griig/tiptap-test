import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {useUserState} from '@/Providers/User'
import {Button} from '@mui/material'
import { Editor } from '@tiptap/react'
import "./footnoteForm.scss"

const FootnoteForm = ({editor}:{editor:Editor}) => {
  const {addFootnote,footnotes} = useUserState()
  const currentFootnote = document.querySelector('.ProseMirror-selectednode')
  const currentFootnoteId = currentFootnote?.id
  const [footnote, setFootnote] = useState(  '')

  useEffect(() => {
   const footnoteCurrent =  footnotes?.find(item => item.id === currentFootnoteId)
    if(currentFootnoteId) {
      setFootnote(footnoteCurrent?.content ?? "")
    }
  },[currentFootnoteId,footnotes])

  if (!currentFootnoteId) {
    return <div></div>
  }
  return (
    <section className='footnote-adder-section bg-white shadow-lg'>
    <textarea
      value={footnote}
      defaultValue={ footnote}
      onChange={(e) => {
        setFootnote(e?.target.value as string)
      }}
      // onKeyDown={(e) => {
      //   if (e.key === 'enter') {
      //     e.preventDefault()
      //     e.stopPropagation()
      //     setComment()
      //   }
      // }}

      cols={30}
      rows={4}
      placeholder='Add Footnote...'
      className=''
    />
      <Button onClick={() => {
        addFootnote(footnote, currentFootnoteId)
        setFootnote('')
      }}>Add</Button>
    </section>)
}

export default FootnoteForm
