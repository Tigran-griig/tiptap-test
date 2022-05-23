import React, {Dispatch, SetStateAction} from 'react';
import {FormatListBulletedIcon, FormatListNumberedIcon, MobileFriendlyRoundedIcon} from "@/components/MateriaLicon";
import {classNames} from "@/helpers";
import classes from "./tabBar.module.scss"
import {Editor} from "@tiptap/core";

export const CustomListGroup = ({editor}: { editor: Editor | null }) => {

    if (!editor) {
        return null;
    }

    return (
        <div className={classes.block}>
            <MobileFriendlyRoundedIcon onClick={() => editor.chain().focus().setBlockquote().run()}
                                       className={classNames(classes.icon)}/>
            <FormatListNumberedIcon className={classNames(classes.icon)}
                                    onClick={() => editor.chain().focus().toggleOrderedList().run()}/>
            <FormatListBulletedIcon className={classNames(classes.icon)}
                                    onClick={() => editor.chain().focus().toggleBulletList().run()}/>
        </div>
    );
};

