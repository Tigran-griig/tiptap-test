import React, {Dispatch, Fragment, SetStateAction} from 'react';
import {Editor} from "@tiptap/react";
import {mergeObjects} from "@/helpers";
import {HeadingGroup} from "@/components/EditorBar/HeadingGroup";
import {CustomSymbolGroup} from "@/components/EditorBar/CustomSymbolGroup";
import {CustomListGroup} from "@/components/EditorBar/CustomListGroup";
import {CustomIconGroup} from "@/components/EditorBar/CustomIconGroup";

import defaultClasses from "./tabBar.module.scss";

interface EditorBarProps {
    editor: Editor | null;
    classes?: React.CSSProperties | undefined | null,
    setShowCommentMenu: Dispatch<SetStateAction<boolean>>
    showCommentMenu?:boolean;
}

const EditorBar = (props: EditorBarProps) => {
    const {editor, setShowCommentMenu,showCommentMenu} = props;
    const classes = mergeObjects(defaultClasses, props.classes);

    if (!editor) {
        return null;
    }
    return (
        <div className={classes.root}>
            <CustomIconGroup editor={editor}/>
            <CustomListGroup editor={editor}/>
            <HeadingGroup editor={editor}/>
            <CustomSymbolGroup  setShowCommentMenu={setShowCommentMenu}  showCommentMenu={showCommentMenu}  editor={editor}/>
        </div>
    )
}

export default EditorBar;

