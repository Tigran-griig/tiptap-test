import React, {Fragment, useEffect, useLayoutEffect} from 'react'
import EditorBar from '../EditorBar/index'
import {useTextEditor} from '@/hooks/TextEditor/useTextEditor'
import {EditorContent} from '@tiptap/react'
import './index.scss'
import {Block} from '@/Block'
// import {useKeyPress} from "@/hooks/useKeyPress";
import {format} from 'date-fns'
import {CustomFloatingMenu} from '../CustomFloatingMenu'
// import {useKeyState} from "use-key-state";
// import {useKeyPress} from "@/hooks/useKeyPress";

const dateTimeFormat = 'dd.MM.yyyy HH:mm'

const TextEditor = () => {
  const {
    editor,
    setCommentText,
    setComment,
    commentText,
    setCurrentComment,
    allComments,
    isCommentModeOn,
    toggleCommentMode,
    isTextSelected,
    activeCommentsInstance,
    setIsCommentModeOn,
    showCommentMenu,
  } = useTextEditor()
  // const {cmdOpt,cmdShifts} = useKeyState(
  //     {
  //         cmdOpt: ['ctrl+Alt+s', 'cmd+Alt+s'],
  //         cmdShifts:['ctrl+shift+s','cmd+shift+s']
  //     })

  const formatDate = (d: any) => (d ? format(new Date(d), dateTimeFormat) : null)
  // useEffect(() => {
  //         if(cmdOpt.down){
  //             debugger
  //             toggleCommentMode()
  //         }
  // }, [cmdOpt.down])

  if (!editor) {
    return null
  }

  return (
    <Block className="editor-container">
      <CustomFloatingMenu
        isTextSelected={isTextSelected}
        activeCommentsInstance={activeCommentsInstance}
        isCommentModeOn={isCommentModeOn}
        editor={editor}
        comments={allComments}
        toggleCommentMode={toggleCommentMode}
        setCommentText={setCommentText}
        setComment={setComment}
        setIsCommentModeOn={setIsCommentModeOn}
        setCurrentComment={setCurrentComment}
        commentText={commentText}
      />
      <Block className="tabBar">
        <EditorBar toggleCommentMode={toggleCommentMode} editor={editor} />
      </Block>
      <Block className="textEditor">
        <EditorContent editor={editor} />
      </Block>
      <section className="flex flex-col">
        {allComments.map((comment, i) => (
          <article
            className={`comment external-comment shadow-lg my-2 bg-gray-100 transition-all rounded-md overflow-hidden ${
              comment.jsonComments.uuid === activeCommentsInstance.uuid ? 'ml-4' : 'ml-8'
            }`}
            key={`${i}external_comment`}
          >
            {comment.jsonComments.comments.map((jsonComment: any, j: number) => (
              <article
                key={`${j}_${Math.random()}`}
                className="external-comment border-b-2 border-gray-200 p-3"
              >
                <div className="comment-details">
                  <span className="ml-1 date-time text-xs">{formatDate(jsonComment.time)}</span>
                </div>

                <span
                  className={`content ${
                    comment.jsonComments.uuid === activeCommentsInstance.uuid
                      ? 'active-comment'
                      : ''
                  }`}
                >
                  {jsonComment.content}
                </span>
              </article>
            ))}
          </article>
        ))}
      </section>
    </Block>
  )
}

export default TextEditor
