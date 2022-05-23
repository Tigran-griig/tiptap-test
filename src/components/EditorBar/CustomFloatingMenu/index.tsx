import React, { Fragment } from 'react';
import { Editor, FloatingMenu, BubbleMenu } from '@tiptap/react';
import { useComment } from '@/hooks/Comment/useComment';

export const CustomFloatingMenu = (props: {
  editor: Editor | null;
  className?: string;
  setCommentText: any;
  setComment: any;
  commentText: any;
  setCurrentComment: any;
}) => {
  const { editor, commentText, setCommentText, setComment, setCurrentComment } = props;

  if (!editor) {
    return null
  }

  return (
    <Fragment>
      <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
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
      <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet List
        </button>
      </FloatingMenu>
    </Fragment>
  );
};

