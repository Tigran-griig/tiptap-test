import React from 'react';
import {classNames} from "@/helpers";
import classes from "./tabBar.module.scss";
import {Editor} from "@tiptap/core";
import {RedoIcon, UndoIcon,InsertPageBreakIcon} from "@/components/MateriaLicon";

export const CustomSymbolGroup = ({editor,showCommentMenu,setShowCommentMenu}: { editor: Editor | null,showCommentMenu:any; setShowCommentMenu:any }) => {

    if (!editor) {
        return null
    }

    const handleSetSymbol = (symbol: "§" | "¶") => {
       return  editor?.commands.insertContent(symbol)
    }

    return (
        <div className={classes.block}>
            <button
                type="button"
                onClick={() => ({})}
                className={classNames(classes.icon,
                    editor.isActive('blockquote') ? 'text-editor-isActive' : '',
                    'text-editor mr-[4px] flex items-center justify-center w-[32px] h-[32px]  rounded-[6px]  bg-none hover:bg-stone-800 ',
                )}
            >
                <span>ab1</span>
            </button>
            <button
                type="button"
                onClick={() => handleSetSymbol("§")}
                className={classNames(classes.icon,
                    editor.isActive('blockquote') ? 'text-editor-isActive' : '',
                    'text-editor mr-[4px] flex items-center justify-center w-[32px] h-[32px]  rounded-[6px]  bg-none hover:bg-stone-800 ',
                )}
            >
                <span>§</span>
            </button>
            <button
                type="button"
                onClick={() => handleSetSymbol("¶")}
                className={classNames(classes.icon,
                    editor.isActive('blockquote') ? 'text-editor-isActive' : '',
                )}
            >
                <span>¶</span>
            </button>
            <button
                type="button"
                onClick={() => handleSetSymbol("¶")}
                className={classNames(classes.icon,
                    editor.isActive('blockquote') ? 'text-editor-isActive' : '',
                )}
            >
                <span>¶</span>
            </button>
            <InsertPageBreakIcon onClick={() => editor.chain().focus().setHardBreak().run()} className={classNames(classes.icon)} />
            <UndoIcon onClick={() => editor.chain().focus().undo().run()} className={classNames(classes.icon)} />
            <RedoIcon onClick={() => editor.chain().focus().redo().run()} className={classNames(classes.icon)} />
        </div>
    );
};