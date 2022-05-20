import React from 'react';
import EditorBar from "../EditorBar/index";
import {useTextEditor} from "@/hooks/TextEditor/useTextEditor";
import {EditorContent} from "@tiptap/react";
import "./index.scss";
import {Block} from '@/Block';

const TextEditor = () => {
    const {editor} = useTextEditor()

    return (
        <Block className={"editor-container"}>
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