import React, {LegacyRef, useEffect, useLayoutEffect, useRef} from 'react'
import EditorBar from '../EditorBar/index'
import {useTextEditor} from '@/hooks/TextEditor/useTextEditor'
import {EditorContent} from '@tiptap/react'
import './index.scss'
import {Block} from '@/Block'
import {useKeyState} from 'use-key-state'
import {format} from 'date-fns'
import {Floater} from '@/components/Toolbar/floater'
import FootnoteForm from '@/components/Footnote/FootnoteForm'
import {useUserState} from '@/Providers/User'

const dateTimeFormat = 'dd.MM.yyyy HH:mm'

const TextEditor = () => {
  const {editor} = useTextEditor()
  const footnotesContent = useRef<any>(null)
  const {cmdOpt, cmdShifts} = useKeyState({
    cmdOpt: ['ctrl+Alt+s', 'cmd+Alt+s'],
    cmdShifts: ['ctrl+shift+s', 'cmd+shift+s'],
  })

  const {footnotes} = useUserState()
  const formatDate = (d: any) => (d ? format(new Date(d), dateTimeFormat) : null)


  useEffect(() => {
  }, [footnotesContent])

  if (!editor) {
    return null
  }

  return (
    <Block className='editor-container'>
      <Block className='tabBar'>
        <EditorBar editor={editor} />
      </Block>
      <Floater
        //@ts-ignore
        editor={editor}
      >
        <FootnoteForm editor={editor} />
      </Floater>
      <Block className='textEditor'>
        <EditorContent editor={editor} />
      </Block>
    </Block>
  )
}

export default TextEditor
