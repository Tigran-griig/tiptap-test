import React from 'react';
import defaultClasses from "./Block.module.css"
import {mergeObjects} from "@/helpers";
import {classNames} from "@/helpers";

export const Block = (props: { children: React.ReactNode, className?: string; classes?: string | { [key: string]: string } }) => {
    const classes = mergeObjects(defaultClasses, props.classes);
    return (
        <div className={classNames(classes.root, props.className ?? "")}>{props.children}</div>
    )
}
