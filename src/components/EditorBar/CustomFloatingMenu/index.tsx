import React, { Fragment } from 'react';
import { Editor, BubbleMenu } from '@tiptap/react';

export const CustomFloatingMenu = (props: {
  editor: Editor | null;
  className?: string;
  setCommentText: any;
  setComment: any;
  commentText: any;
  isTextSelected: boolean;
  setCurrentComment: any;
  isCommentModeOn: boolean;
  activeCommentsInstance: any;
  showAddCommentSection: boolean
}) => {
  const {
    editor,
    commentText,
    setCommentText,
    setComment,
    setCurrentComment,
    isCommentModeOn,
    isTextSelected,
    activeCommentsInstance,
  } = props;
  if (!editor) {
    return null
  }

  return (
    <Fragment>
      <BubbleMenu className="bubble-menu"
                  tippyOptions={{ duration: 100 ,
                    showOnCreate:!(!isCommentModeOn && !isTextSelected && !activeCommentsInstance.uuid)
      }} editor={editor}>
        <section className="comment-adder-section bg-white shadow-lg">
            <textarea
              value={commentText}
              onInput={(e) => setCommentText((e.target as any)?.value)}
              onKeyDown={(e) => {
                if (e.key === "enter") {
                  e.preventDefault()
                  e.stopPropagation()
                  setComment()
                }
              }}
              cols={30}
              rows={4}
              placeholder="Add comment..."
              className="border-none outline-none"
            />

          <section className="flex flex-row w-full gap-1">
            <button
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded shadow-lg w-1/3"
              onClick={() => setCommentText('')}>
              Clear
            </button>

            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow-lg w-2/3"
              onClick={() => setComment()}
            >
              Add
            </button>
          </section>
        </section>
      </BubbleMenu>
    </Fragment>
  );
};

