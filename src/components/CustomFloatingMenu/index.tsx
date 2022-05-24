import React, {Fragment, useEffect, useLayoutEffect, useRef, useState} from 'react';
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
    isCommentModeOn: boolean;
    isTextSelected: boolean;
    toggleCommentMode: () => void;
    activeCommentsInstance: CommentInstance;
}) => {
    const {
        editor,
        commentText,
        setCommentText,
        setComment,
        isCommentModeOn,
        toggleCommentMode,
        isTextSelected,
        activeCommentsInstance,
    } = props;

    if (!editor) {
        return null
    }

    return (
        <Fragment>
            <BubbleMenu
                className={`${!!(!isCommentModeOn && !isTextSelected && activeCommentsInstance.uuid ? "" : "bubble-menu")}`}
                editor={editor}
                tippyOptions={{
                    duration: 100,
                    hideOnClick: !!(isCommentModeOn && isTextSelected && !activeCommentsInstance.uuid) && editor.isEditable,
                    showOnCreate: !!(isCommentModeOn && isTextSelected && !activeCommentsInstance.uuid) && editor.isEditable,
                }}
            >
                <CommentForm commentText={commentText} setCommentText={setCommentText} setComment={setComment}/>
            </BubbleMenu>
        </Fragment>


    );
};

