import React, {Fragment, MutableRefObject, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Editor, BubbleMenu, FloatingMenu} from '@tiptap/react';
import {CommentForm} from "@/components/Comment/CommentForm";
import {CommentInstance} from '@/hooks/Comment/useComment';
import './floatingMenu.scss';

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
        toggleCommentMode,
        isCommentModeOn,
        isTextSelected,
        activeCommentsInstance,
    } = props;

    return (
        <Fragment>
            <BubbleMenu
                className={`custom-bubble-menu ${!(isCommentModeOn && isTextSelected && !activeCommentsInstance.uuid) ? "custom-bubble-menu-hide" : "custom-bubble-menu-show"}`}
                editor={editor}
                tippyOptions={{
                    duration: 100,
                    interactive: true,
                    hideOnClick: "toggle",
                }}
            >
                <CommentForm commentText={commentText} setCommentText={setCommentText} setComment={setComment}/>
            </BubbleMenu>
        </Fragment>


    );
};

