import React, {useState} from "react"
import {JSONContent, Mark, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Placeholder} from '@tiptap/extension-placeholder'
import {Text} from '@tiptap/extension-text'
import {FontFamily} from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import {Color} from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Blockquote from '@tiptap/extension-blockquote'
import {OrderedList} from "@tiptap/extension-ordered-list";
import {useUserState} from "@/Providers";
import {Underline} from "@tiptap/extension-underline";
import {Document} from "@tiptap/extension-document";
import { Superscript } from '@tiptap/extension-superscript'
import format from "date-fns/format"
import { Extension } from '@tiptap/core'
import { Comment } from '@/components/extensions/comment'
import { v4 as uuidv4 } from 'uuid'

const dateTimeFormat = 'dd.MM.yyyy HH:mm';

interface CommentInstance {
    uuid?: string
    comments?: any[]
}
const CustomExtension = Extension.create({
    name: 'customExtension',

    // Your code goes here.
})

export const useTextEditor = () => {
    const {user} = useUserState();
    const [editorState, setEditorState] = useState<JSONContent>()
    const documentElement: Element | undefined = document.querySelector(".element") ?? undefined; //tag for custom  editor

    const editor = useEditor({
        extensions: [
            Comment,
            Document,
            StarterKit,
            Text,
            TextStyle,
            FontFamily,
            Color,
            Blockquote,
            OrderedList,
            Underline,
            Superscript,
            CustomExtension,
            Superscript.configure({

            }),
            Mark.create({
                name:"custom-footnote",
                footnote: true,
            }),
            CustomExtension.configure({

            }),
            StarterKit.configure({
                // The Collaboration extension comes with its own history handling
                history: false,
            }),
            OrderedList.configure({
                itemTypeName: 'listItem',
            }),
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder: 'New story',
            }),
        ],
        content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `,
        onUpdate({ editor }) {
            findCommentsAndStoreValues();

            setCurrentComment(editor);
        },
        editorProps: {
            attributes: {
                spellcheck: 'false',
            },
        },
    });

    const [isCommentModeOn, setIsCommentModeOn] = React.useState(false)

    const [currentUserName, setCurrentUserName] = React.useState('sereneinserenade');

    const [commentText, setCommentText] = React.useState('');

    const [showCommentMenu, setShowCommentMenu] = React.useState(false);

    const [isTextSelected, setIsTextSelected] = React.useState(false);

    const [showAddCommentSection, setShowAddCommentSection] = React.useState(true);

    const formatDate = (d: any) => (d ? format(new Date(d), dateTimeFormat) : null);

    const [activeCommentsInstance, setActiveCommentsInstance] = React.useState<CommentInstance>({});
console.log(commentText,"commentTe3xt",activeCommentsInstance,":::::::::")
    const [allComments, setAllComments] = React.useState<any[]>([]);
    React.useEffect((): any => {
        setTimeout(findCommentsAndStoreValues, 100)
    }, []);

    const findCommentsAndStoreValues = () => {
        const proseMirror = document.querySelector('.ProseMirror');

        const comments = proseMirror?.querySelectorAll('span[data-comment]');

        const tempComments: any[] = [];

        if (!comments) {
            setAllComments([])
            return;
        }

        comments.forEach((node) => {
            const nodeComments = node.getAttribute('data-comment');

            const jsonComments = nodeComments ? JSON.parse(nodeComments) : null;

            if (jsonComments !== null) {
                tempComments.push({
                    node,
                    jsonComments,
                });
            }
        });

        setAllComments(tempComments)
    };
    const setCurrentComment = (editor: any) => {
        const newVal = editor.isActive('comment');

        if (newVal) {
            setTimeout(() => setShowCommentMenu(newVal), 50);

            setShowAddCommentSection(!editor.state.selection.empty)

            const parsedComment = JSON.parse(editor.getAttributes('comment').comment);

            parsedComment.comment = typeof parsedComment.comments === 'string' ? JSON.parse(parsedComment.comments) : parsedComment.comments;

            setActiveCommentsInstance(parsedComment)
        } else {
            setActiveCommentsInstance({})
        }
    };

    const setComment = () => {
        if (!commentText.trim().length) return;

        const activeCommentInstance: CommentInstance = JSON.parse(JSON.stringify(activeCommentsInstance));

        const commentsArray = typeof activeCommentInstance.comments === 'string' ? JSON.parse(activeCommentInstance.comments) : activeCommentInstance.comments;

        if (commentsArray) {
            commentsArray.push({
                userName: currentUserName,
                time: Date.now(),
                content: commentText,
            });

            const commentWithUuid = JSON.stringify({
                uuid: activeCommentsInstance.uuid || uuidv4(),
                comments: commentsArray,
            });

            // eslint-disable-next-line no-unused-expressions
            editor?.chain().setComment(commentWithUuid).run();
        } else {
            const commentWithUuid = JSON.stringify({
                uuid: uuidv4(),
                comments: [{
                    userName: currentUserName,
                    time: Date.now(),
                    content: commentText,
                }],
            });

            // eslint-disable-next-line no-unused-expressions
            editor?.chain().setComment(commentWithUuid).run();
        }

        setTimeout(() => setCommentText(''), 50);
    };


    const toggleCommentMode = () => {
        setIsCommentModeOn(!isCommentModeOn)

        if (isCommentModeOn) editor?.setEditable(false);
        else editor?.setEditable(true);
    };

    const { log } = console


    return {
        editor,
        setCommentText,
        commentText,
        setComment,
        setCurrentComment,
    }
}