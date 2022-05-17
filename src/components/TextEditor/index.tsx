import React from 'react';
import EditorBar from "../EditorBar/index";
import {useTextEditor} from "../../hooks/TextEditor/useTextEditor";
import {Grid, ListItem} from '@mui/material';
import {EditorContent} from "@tiptap/react";

import "./index.scss";

const TextEditor = () => {
    const {editor} = useTextEditor()

    return (
        <Grid container rowSpacing={1} columnSpacing={1}>
            <ListItem>
                <EditorBar editor={editor}/>
            </ListItem>
            <ListItem>
                <EditorContent editor={editor}/>
            </ListItem>
        </Grid>
    );
};

export default TextEditor;