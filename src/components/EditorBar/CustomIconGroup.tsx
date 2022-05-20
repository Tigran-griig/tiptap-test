import React from 'react';
import {FormatBoldOutlinedIcon, FormatItalicIcon, FormatUnderlinedIcon} from "@/components/MateriaLicon";
import {classNames} from "@/helpers";
import classes from "./tabBar.module.scss";
import {Editor} from "@tiptap/core";

export const CustomIconGroup = ({editor}: { editor: Editor | null }) => {

    if (!editor) {
        return null;
    }

    return (
        <div className={classes.block}>
            <FormatBoldOutlinedIcon onClick={() => {
                editor.chain().focus().toggleBold().run()
            }} className={classNames(classes.icon)}/>
            <FormatItalicIcon className={classNames(classes.icon)}
                              onClick={() => editor.chain().focus().toggleItalic().run()}/>
            <FormatUnderlinedIcon className={classNames(classes.icon)}
                                  onClick={() => editor.chain().focus().toggleUnderline().run()}/>
        </div>
    );
};