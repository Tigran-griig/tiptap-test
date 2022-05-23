import React, { useLayoutEffect} from 'react';
import EditorBar from "../EditorBar/index";
import {useTextEditor} from "@/hooks/TextEditor/useTextEditor";
import {EditorContent} from "@tiptap/react";
import "./index.scss";
import {Block} from '@/Block';
import {CustomFloatingMenu} from '../CustomFloatingMenu';
import {useKeyPress} from "@/hooks/useKeyPress";

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
        showCommentMenu,
    } = useTextEditor()
    const keyCmd = useKeyPress("Meta");
    const keyOpt = useKeyPress("Alt");
    const keyS = useKeyPress("s");

    useLayoutEffect(() => {
        if (keyOpt && keyCmd && keyS) {
            toggleCommentMode();
        }
    }, [keyCmd, keyOpt, keyS])
    console.log(showCommentMenu, "showCommentMenu,")

    if (!editor) {
        return null
    }
    return (
        <Block className={"editor-container"}>
            {editor && <CustomFloatingMenu isTextSelected={isTextSelected} activeCommentsInstance={activeCommentsInstance}
                                 isCommentModeOn={isCommentModeOn} editor={editor} comments={allComments}
                                 setCommentText={setCommentText}
                                 setComment={setComment} setCurrentComment={setCurrentComment}
                                 commentText={commentText} toggleCommentMode={toggleCommentMode}/>}
            <Block className={"tabBar"}>
                <EditorBar toggleCommentMode={toggleCommentMode} editor={editor}/>
            </Block>
            <Block className={"textEditor"}>
                <EditorContent editor={editor}/>
            </Block>
        </Block>
    );
};

export default TextEditor;