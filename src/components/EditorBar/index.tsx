import React from 'react';
import {Editor} from "@tiptap/react";
import {
    FormatBoldOutlinedIcon,
    FormatItalicIcon,
    FormatListBulletedIcon,
    FormatListNumberedIcon,
    FormatUnderlinedIcon,
    MobileFriendlyRoundedIcon
} from "@/components/MateriaLicon/index";
import {classNames, mergeObjects} from "@/helpers";

import defaultClasses from "./tabBar.module.scss";

interface EditorBarProps {
    editor: Editor | null;
    classes?: React.CSSProperties | undefined | null,
}


const EditorBar = (props: EditorBarProps) => {
    const {editor} = props;
    const classes = mergeObjects(defaultClasses, props.classes);
    console.log(classes, "FootnoteFootnoteFootnoteFootnote")
    if (!editor) {
        return null;
    }

    return (
        <div className={classes.root}>
            <div className={classes.block}>
                <FormatBoldOutlinedIcon onClick={() => {
                    editor.chain().focus().toggleBold().run()
                }} className={classNames(classes.icon)}/>
                <FormatItalicIcon className={classNames(classes.icon)}
                                  onClick={() => editor.chain().focus().toggleItalic().run()}/>
                <FormatUnderlinedIcon className={classNames(classes.icon)} onClick={() => editor.chain().focus().setUnderline().run()}/>
            </div>
            <div className={classes.block}>
                <MobileFriendlyRoundedIcon className={classNames(classes.icon)}/>
                <FormatListNumberedIcon className={classNames(classes.icon)}
                                        onClick={() => editor.chain().focus().toggleOrderedList().run()}/>
                <FormatListBulletedIcon className={classNames(classes.icon)}
                                        onClick={() => editor.chain().focus().toggleBulletList().run()}/>
            </div>
            <div className={classes.block}>
                <p className={classes.section_heading}>Section</p>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                    className={classNames(classes.icon, editor.isActive('heading', {level: 1}) ? 'is-active' : '')}
                >
                    I.
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                    className={classNames(classes.icon, editor.isActive('heading', {level: 2}) ? 'is-active' : '')}
                >
                    A.
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                    className={classNames(classes.icon, editor.isActive('heading', {level: 3}) ? 'is-active' : '')}
                >
                    1.
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
                    className={classNames(classes.icon, editor.isActive('heading', {level: 4}) ? 'is-active' : '')}
                >
                    a.
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
                    className={classNames(classes.icon, editor.isActive('heading', {level: 5}) ? 'is-active' : '')}
                >
                    (1)
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
                    className={classNames(classes.icon, editor.isActive('heading', {level: 6}) ? 'is-active' : '')}
                >
                    (a)
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
                    className={classNames(classes.icon, editor.isActive('heading', {level: 6}) ? 'is-active h7' : '')}
                >
                    (i)
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
                    className={classNames(classes.icon, editor.isActive('heading', {level: 6}) ? 'is-active' : '')}
                >
                    h8
                </button>
            </div>
            <div className={classes.block}>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setBlockquote().run()}
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
        </div>

    )
}

export default EditorBar;
