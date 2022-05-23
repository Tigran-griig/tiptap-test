import React from 'react';
import EditorBar from "../EditorBar/index";
import {useTextEditor} from "@/hooks/TextEditor/useTextEditor";
import {EditorContent} from "@tiptap/react";
import "./index.scss";
import {Block} from '@/Block';
import { CustomFloatingMenu } from '../CustomFloatingMenu';

const TextEditor = () => {
    const {editor,setCommentText,setComment,commentText,setCurrentComment,comments} = useTextEditor()

    return (
        <Block className={"editor-container"}>
            <CustomFloatingMenu editor={editor} comments={comments} setCommentText={setCommentText} setComment={setComment} setCurrentComment={setCurrentComment} commentText={commentText}/>
            <Block className={"tabBar"}>
                <EditorBar editor={editor}/>
            </Block>
            <Block className={"textEditor"}>
                <EditorContent editor={editor}/>
            </Block>
        </Block>
    );
};

export default TextEditor;