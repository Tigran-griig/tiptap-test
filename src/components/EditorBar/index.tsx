import React, {useState, useEffect} from 'react';
import {BubbleMenu, Editor} from "@tiptap/react";

interface EditorBarProps {
    editor: Editor | null;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const EditorBar = ({editor}: EditorBarProps) => {


    const [textSize, setTextSize] = useState(4)
    const [openHyperlink, setOpenHyperlink] = useState(false)
    const [linkValue, setLinkValue] = useState('')
    const [editMode, setEditMode] = useState(false)

    const onUpdate = () => {
        if (editor?.isActive('link')) {
            if (editMode) setLinkValue(editor?.getAttributes('link').href)
            setOpenHyperlink(true)
        }
        if (!editor?.isActive('link')) {
            setLinkValue('')
            setOpenHyperlink(false)
        }
    }

    useEffect(() => {
        editor?.on('selectionUpdate', onUpdate)
    }, [])

    if (!editor) {
        return null;
    }

    const setLink = () => {
        if (linkValue === null) {
            return
        }
        if (linkValue === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }
        editor.chain().focus().extendMarkRange('link').setLink({href: linkValue}).run()
    }
    const openLink = () => {
        setOpenHyperlink(false)
        window.open(linkValue, '_blank')
    }
    const handleCopyLink = () => {
        setOpenHyperlink(false)
    }
    const handleRemoveLink = () => {
        setLinkValue('')
        editor.chain().focus().unsetLink().run()
        setOpenHyperlink(false)
    }
    return (
                <div
                    className="w-[290px] h-[44px] bg-stone-900 flex justify-around items-center rounded-[6px] shadow-sm pl-[10px] pr-[10px] pt-[6px] pb-[6px] ">
                    <button
                        type="button"
                        onClick={() => {
                            editor.chain().focus().toggleBold().run()
                        }}
                        className={classNames(
                            editor.isActive('bold') ? 'text-editor-isActive' : '',
                            'text-editor mr-[4px] flex items-center justify-center w-[32px] h-[32px]  rounded-[6px]  bg-none hover:bg-stone-800 ',
                        )}
                    >
                        <span>Bold</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={classNames(
                            editor.isActive('italic') ? 'text-editor-isActive' : '',
                            'text-editor mr-[4px] flex items-center justify-center w-[32px] h-[32px]  rounded-[6px]  bg-none hover:bg-stone-800 ',
                        )}
                    >
                        <span>ItalicIcon</span>
                    </button>
                    <span className="w-[1px] h-[20px] bg-stone-700 ml-[8px] mr-[8px]"/>
                    <button
                        type="button"
                        onClick={() => {
                            if (textSize > 1) {
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({level: 1})
                                    .run()
                                setTextSize(textSize - 1)
                            } else {
                                setTextSize(1)
                            }
                        }}
                        className={classNames(
                            textSize < 4 ? 'text-editor-isActive' : '',
                            'text-editor mr-[4px] flex items-center justify-center w-[32px] h-[32px]  rounded-[6px]  bg-none hover:bg-stone-800 ',
                        )}
                    >
                        <span>BigTitleIcon</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (textSize < 6) {
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({level: 2})
                                    .run()
                                setTextSize(textSize + 1)
                            } else {
                                setTextSize(6)
                            }
                        }}
                        className={classNames(
                            textSize > 4 ? 'text-editor-isActive' : '',
                            'text-editor pt-[4px] flex items-center justify-center w-[32px] h-[32px]  rounded-[6px]  bg-none hover:bg-stone-800 ',
                        )}
                    >
                        <span>SmallTitleIcon</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setBlockquote().run()}
                        className={classNames(
                            editor.isActive('blockquote') ? 'text-editor-isActive' : '',
                            'text-editor mr-[4px] flex items-center justify-center w-[32px] h-[32px]  rounded-[6px]  bg-none hover:bg-stone-800 ',
                        )}
                    >
                        <span>QuoteIcon</span>
                    </button>
                    <span className="w-[1px] h-[20px] bg-stone-700 ml-[8px] mr-[8px]"/>
                    <button
                        type="button"
                        onClick={() => setOpenHyperlink(true)}
                        className="text-editor flex items-center justify-center w-[32px] h-[32px]  rounded-[6px]  bg-none hover:bg-stone-800 "
                    >
                        <span>HyperlinkIcon</span>
                    </button>
                    <button
                        type="button"
                        className="text-editor flex ml-[4px] items-center justify-center w-[32px] h-[32px]  rounded-[6px]  bg-none hover:bg-stone-800 "
                    >
                        <span>StoryNotes</span>
                    </button>
                </div>

    )
}

export default EditorBar;
