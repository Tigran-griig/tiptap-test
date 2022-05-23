import React, {Fragment} from 'react';
import {Editor, BubbleMenu, FloatingMenu} from '@tiptap/react';
import {CommentForm} from "@/components/Comment/CommentForm";
import {CommentInstance} from '@/hooks/Comment/useComment';

export const CustomFloatingMenu = (props: {
    editor: Editor;
    className?: string;
    setCommentText: any;
    setComment: any;
    commentText: any;
    setCurrentComment: any;
    comments?: any;
    toggleCommentMode: () => void;
    isCommentModeOn: boolean;
    isTextSelected: boolean;
    activeCommentsInstance: CommentInstance;
}) => {
    const {
        editor,
        commentText,
        setCommentText,
        setComment,
        isCommentModeOn,
        isTextSelected,
        activeCommentsInstance
    } = props;

    if (!editor) {
        return null
    }
    if (!editor || (!isTextSelected || !isCommentModeOn)) {
        return null
    }

    return (
        <Fragment>
            <BubbleMenu
                className="bubble-menu"
                tippyOptions={{duration: 100}}
                editor={editor}
            >
                <CommentForm commentText={commentText} setCommentText={setCommentText} setComment={setComment}/>
            </BubbleMenu>
        </Fragment>


    );
};

