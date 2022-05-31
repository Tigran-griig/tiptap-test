import React, {useState} from 'react';
import {classNames} from "@/helpers";
import classes from "./tabBar.module.scss";
import {Editor} from "@tiptap/core";
import {UndoIcon, InsertPageBreakIcon, RedoIcon} from "@/components/MateriaLicon";
import Modal from "@/components/Modal";
import CitationForm from "@/components/Citation/CitationForm";

export const CustomSymbolGroup = (props: { editor: Editor | null; toggleCommentMode?: () => void }) => {
    const {editor} = props;
    const [open, setOpen] = useState<boolean>(false)
    if (!editor) {
        return null
    }

    const handleSetSymbol = (symbol: "§" | "¶") => {
        return editor?.commands.insertContent(symbol)
    }


    return (
        <React.Fragment>
            <div className={classes.block}>
                <button
                    type="button"
                    onClick={props?.toggleCommentMode}
                    className={classNames(classes.icon)}
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
                <button onClick={() => setOpen(true)}>Add citation
                </button>
            </div>
            <Modal setOpen={setOpen} open={open}>
                <div>
                    <h1>Addd your citation</h1>
                    <CitationForm closeModal={() =>setOpen(false)} />
                </div>
            </Modal>
        </React.Fragment>
    );
};