import React from 'react';
import {classNames} from "@/helpers";
import {Editor} from "@tiptap/core";
import classes from "./tabBar.module.scss"

export const HeadingGroup = ({editor}: { editor: Editor | null }) => {

    if (!editor) {
        return null;
    }

    return (
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
                onClick={() => {
                    editor.chain().focus().toggleHeading({level: 6}).run();
                }}
                className={classNames(classes.icon, editor.isActive('heading', {level: 6}) ? 'is-active h7' : '',)}
            >
                (i)
            </button>
            <button
                onClick={() => {
                    editor.chain().focus().toggleHeading({level: 6}).run();
                }}
                className={classNames(classes.icon, editor.isActive('heading', {level: 6}) ? 'is-active h8' : '',)}
            >
                h8
            </button>
        </div>
    );
};