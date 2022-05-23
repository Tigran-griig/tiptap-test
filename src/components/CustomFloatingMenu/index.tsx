import React, { Fragment, useEffect, useState} from 'react';
import {Editor, FloatingMenu, BubbleMenu,} from '@tiptap/react';

export const CustomFloatingMenu = (props: {
    editor: Editor | null;
    className?: string;
    setCommentText: any;
    setComment: any;
    commentText: any;
    setCurrentComment: any;
    comments?: any;
}) => {
    const {editor, commentText, setCommentText, setComment, comments} = props;
    const [addCommentKey,setAddCommentKey] = useState<number | string>(comments)

    useEffect(() => {
        if (editor && addCommentKey) {
            editor?.chain().setTextSelection(editor.state.selection.to -1).run()
            editor.chain().insertContent(`${addCommentKey}`).run()
        }
    }, [addCommentKey])

console.log(addCommentKey,"addCommentKeyaddCommentKey")

    if (!editor) {
        return null
    }

    const addComment = () => {
        setComment()
        if(comments?.length){
            setAddCommentKey(prev => +prev + 1)
        }else{
            setAddCommentKey(1)
        }
    }

    return (
        <Fragment>
            <BubbleMenu className="bubble-menu" tippyOptions={{duration: 100}} editor={editor}>
                <section className="comment-adder-section bg-white shadow-lg">
                <textarea
                    value={commentText}
                    onInput={(e) => setCommentText((e.target as any)?.value)}
                    onKeyDown={(e) => {
                        if (e.key === "enter") {
                            e.preventDefault()
                            e.stopPropagation()
                            addComment()
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
                            onClick={(e) => addComment()}
                        >
                            Add
                        </button>
                    </section>
                </section>
            </BubbleMenu>
            <FloatingMenu className="floating-menu" tippyOptions={{duration: 100}} editor={editor}>

            </FloatingMenu>
        </Fragment>
    );
};

