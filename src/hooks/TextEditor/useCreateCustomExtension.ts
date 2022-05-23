import React from 'react';
import {Extension} from "@tiptap/core";


export const UseCreateCustomExtension = () => {

    const CustomExtension = Extension.create({
      //@ts-ignore
        addCommands() {
            return {
                yourCommand: someProp => ({ commands }) => {
                    // …
                },
            }
        },
    })

    return {

    }
};