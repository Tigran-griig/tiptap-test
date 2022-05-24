import React from 'react';
import {classNames} from "@/helpers";
import classes from "./tabBar.module.scss";
import {Editor} from "@tiptap/core";

export const CustomSymbolGroup = ({editor,setIsCommentModeOn}: { editor: Editor | null, setIsCommentModeOn:any }) => {

    if (!editor) {
        return null
    }

    return (
        <div className={classes.block}>
            <button
                type="button"
                onClick={setIsCommentModeOn}
                className={classNames(classes.icon,
                    editor.isActive('blockquote') ? 'text-editor-isActive' : '',
                    'text-editor mr-[4px] flex items-center justify-center w-[32px] h-[32px]  rounded-[6px]  bg-none hover:bg-stone-800 ',
                )}
            >
                <span>ab1</span>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setBlockquote().run()}
                className={classNames(classes.icon,
                    editor.isActive('blockquote') ? 'text-editor-isActive' : '',
                    'text-editor mr-[4px] flex items-center justify-center w-[32px] h-[32px]  rounded-[6px]  bg-none hover:bg-stone-800 ',
                )}
            >
                <span>symbol1</span>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setBlockquote().run()}
                className={classNames(classes.icon,
                    editor.isActive('blockquote') ? 'text-editor-isActive' : '',
                )}
            >
                <span>symbol2</span>
            </button>
        </div>
    );
};