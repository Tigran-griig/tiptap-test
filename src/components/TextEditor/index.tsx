import React from 'react';
import EditorBar from "../EditorBar/index";
import {useTextEditor} from "@/hooks/TextEditor/useTextEditor";
import {EditorContent} from "@tiptap/react";
import "./index.scss";
import {Block} from '@/Block';
import {CustomFloatingMenu} from "@/components/EditorBar/CustomFloatingMenu";

const TextEditor = () => {
    const {editor,setCommentText,setComment,toggleCommentMode,commentText,setCurrentComment,isTextSelected,isCommentModeOn,setIsCommentModeOn,setShowAddCommentSection,showCommentMenu,showAddCommentSection,activeCommentsInstance} = useTextEditor()

    return (
        <Block className={"editor-container"}>
            <CustomFloatingMenu isTextSelected={isTextSelected}  isCommentModeOn={isCommentModeOn} editor={editor} showAddCommentSection={showAddCommentSection} setCommentText={setCommentText} activeCommentsInstance={activeCommentsInstance} setComment={setComment} setCurrentComment={setCurrentComment} commentText={commentText}/>
            <Block className={"tabBar"}>
                <EditorBar setIsCommentModeOn={toggleCommentMode} editor={editor}/>
            </Block>
            <Block className={"textEditor"}>
                <EditorContent editor={editor}/>
            </Block>
        </Block>
    );
};

export default TextEditor;