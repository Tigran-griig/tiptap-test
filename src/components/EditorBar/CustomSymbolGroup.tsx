import React, {useState, Fragment} from 'react'
import {classNames} from '@/helpers'
// @ts-ignore
import {Editor} from '@tiptap/core'
import {UndoIcon, InsertPageBreakIcon, RedoIcon} from '@/components/MateriaLicon'
import Modal from '@/components/Modal'
import CitationForm from '@/components/Citation/CitationForm'
import classes from './tabBar.module.scss'

interface CustomSymbolGroupProps {
  editor: Editor | null
  // eslint-disable-next-line react/require-default-props
  toggleCommentMode?: () => void
  toggleFootnote?: () => void
}

export const CustomSymbolGroup = (props: CustomSymbolGroupProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const {editor, toggleFootnote} = props
  if (!editor) {
    return null
  }

  const handleSetSymbol = (symbol: '§' | '¶') => editor?.commands.insertContent(symbol)

  return (
    <>
      <div className={classes.block}>
        <button
          type="button"
          className={classNames(classes.icon)}
          onClick={() => {
            props?.editor?.isActive('footnote')
            // @ts-ignore
            props?.editor?.chain().focus()?.setImage({src: 'footnote'}).run()
          }}
        >
          <span>ab1</span>
        </button>
        <button
          type="button"
          onClick={() => handleSetSymbol('§')}
          className={classNames(classes.icon, editor.isActive('§') ? 'text-editor-isActive' : '')}
        >
          <span>§</span>
        </button>
        <button
          type="button"
          onClick={() => handleSetSymbol('¶')}
          className={classNames(
            classes.icon,
            editor.isActive('blockquote') ? 'text-editor-isActive' : '',
          )}
        >
          <span>¶</span>
        </button>
        <InsertPageBreakIcon
          onClick={() => editor?.chain().focus().setHardBreak().run()}
          className={classNames(classes.icon)}
        />
        <UndoIcon
          onClick={() => editor?.chain().focus().undo().run()}
          className={classNames(classes.icon)}
        />
        <RedoIcon
          onClick={() => editor?.chain().focus().redo().run()}
          className={classNames(classes.icon)}
        />
        <button type="button" onClick={() => setOpen(true)}>
          Add citation
        </button>
      </div>
      <Modal setOpen={setOpen} open={open}>
        <div>
          <h1>Addd your citation</h1>
          <CitationForm closeModal={() => setOpen(false)} />
        </div>
      </Modal>
    </>
  )
}
