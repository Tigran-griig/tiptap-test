import React from 'react';
import {classNames} from "@/helpers";
import classes from "./tabBar.module.scss";
import {Editor} from "@tiptap/core";
import {RedoIcon, UndoIcon, InsertPageBreakIcon} from "@/components/MateriaLicon";

export const CustomSymbolGroup = (props: { editor: Editor | null;toggleCommentMode?:() => void }) => {
    const {editor} = props;

    if (!editor) {
        return null
    }

    const handleSetSymbol = (symbol: "§" | "¶") => {
        return editor?.commands.insertContent(symbol)
    }

    return (
        <div className={classes.block}>
            <button
                type="button"
                onClick={props?.toggleCommentMode}
            >
                <span>ab1</span>
            </button>
            <button
                type="button"
                onClick={() => handleSetSymbol("§")}
                className={classNames(classes.icon,
                    editor.isActive('§') ? 'text-editor-isActive' : '',
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
            <InsertPageBreakIcon onClick={() => editor.chain().focus().setHardBreak().run()}
                                 className={classNames(classes.icon)}/>
            <UndoIcon onClick={() => editor.chain().focus().undo().run()} className={classNames(classes.icon)}/>
            <RedoIcon onClick={() => editor.chain().focus().redo().run()} className={classNames(classes.icon)}/>
        </div>
    );
};