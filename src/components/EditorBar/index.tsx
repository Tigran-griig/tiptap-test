import React, { Fragment } from 'react';
import { Editor } from "@tiptap/react";
import { mergeObjects } from "@/helpers";
import { HeadingGroup } from "@/components/EditorBar/HeadingGroup";
import { CustomSymbolGroup } from "@/components/EditorBar/CustomSymbolGroup";
import { CustomListGroup } from "@/components/EditorBar/CustomListGroup";
import { CustomIconGroup } from "@/components/EditorBar/CustomIconGroup";

import defaultClasses from "./tabBar.module.scss";

interface EditorBarProps {
  editor: Editor | null;
  classes?: React.CSSProperties | undefined | null,
  setIsCommentModeOn:any
}

const EditorBar = (props: EditorBarProps) => {
  const { editor,setIsCommentModeOn } = props;
  const classes = mergeObjects(defaultClasses, props.classes);

  if (!editor) {
    return null;
  }

  return (
      <div className={classes.root}>
        <CustomIconGroup editor={editor}/>
        <CustomListGroup editor={editor}/>
        <HeadingGroup editor={editor}/>
        <CustomSymbolGroup setIsCommentModeOn={setIsCommentModeOn} editor={editor}/>
      </div>
  )
}

export default EditorBar;

