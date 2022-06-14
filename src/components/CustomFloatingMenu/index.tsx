import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {Editor, BubbleMenu} from '@tiptap/react'
import CommentForm from '@/components/Comment/CommentForm'
import {CommentInstance} from '@/hooks/Comment/useComment'
import './floatingMenu.scss'

export const CustomFloatingMenu = (props: {
  editor: Editor
  className?: string
  setCommentText: any
  setComment: any
  commentText: any
  setCurrentComment: any
  comments?: any
  setIsCommentModeOn: Dispatch<SetStateAction<boolean>>
  isCommentModeOn: boolean
  isTextSelected: boolean
  toggleCommentMode: () => void
  activeCommentsInstance: CommentInstance
}) => {
  const {
    editor,
    commentText,
    setCommentText,
    setComment,
    setIsCommentModeOn,
    isCommentModeOn,
    isTextSelected,
    activeCommentsInstance,
  } = props
  const [selectedText, setSelectedText] = useState<string | undefined>(
    editor?.state.doc.textBetween(
      editor?.state.selection.from as number,
      editor?.state.selection.to as number,
      '',
    ),
  )

  useEffect(() => {
    if (
      selectedText !==
      editor?.state.doc.textBetween(
        editor?.state.selection.from as number,
        editor?.state.selection.to as number,
        '',
      )
    ) {
      if (isCommentModeOn) {
        setIsCommentModeOn(false)
        setSelectedText(
          editor?.state.doc.textBetween(
            editor?.state.selection.from as number,
            editor?.state.selection.to as number,
            '',
          ),
        )
      }
    }
  }, [
    editor?.state.doc.textBetween(
      editor?.state.selection.from as number,
      editor?.state.selection.to as number,
      '',
    ),
  ])
  return (
    <BubbleMenu
      className={`custom-bubble-menu ${
        !(isCommentModeOn && isTextSelected && !activeCommentsInstance.uuid)
          ? 'custom-bubble-menu-hide'
          : 'custom-bubble-menu-show'
      }`}
      editor={editor}
      tippyOptions={{
        duration: 100,
        interactive: true,
        hideOnClick: 'toggle',
      }}
    >
      <CommentForm
        commentText={commentText}
        setCommentText={setCommentText}
        setComment={setComment}
      />
    </BubbleMenu>
  )
}
