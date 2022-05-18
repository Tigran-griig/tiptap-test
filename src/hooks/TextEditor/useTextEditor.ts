import React, {useState} from "react"
import {useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Placeholder} from '@tiptap/extension-placeholder'
import {Text} from '@tiptap/extension-text'
import {FontFamily} from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import {Color} from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Blockquote from '@tiptap/extension-blockquote'
import * as Y from "yjs"
import {OrderedList} from "@tiptap/extension-ordered-list";
import {useUserState} from "@/Providers";
import {Underline} from "@tiptap/extension-underline";
import {Document} from "@tiptap/extension-document";

const yDoc = new Y.Doc()
console.log(yDoc, "yDoc")

export const useTextEditor = () => {
    const {user} = useUserState();
    // const [editorState, setEditorState] = useState<string>();

    console.log(user, "9876543")
    const editor = useEditor({
        extensions: [
            Document,
            StarterKit,
            Text,
            TextStyle,
            FontFamily,
            Color,
            Blockquote,
            OrderedList,
            Underline,
            // Collaboration,
            OrderedList.configure({
                itemTypeName: 'listItem',
            }),
            Link.configure({
                openOnClick: false,
            }),
            // CollaborationCursor.configure({
            //     user: user,
            // }),
            Placeholder.configure({
                placeholder: 'New story',
            }),
            StarterKit.configure({
                // The Collaboration extension comes with its own history handling
                history: false,
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
    });

    // React.useEffect(() => {
    //     if (editor) {
    //         editor.chain().focus()?.user({name:'sadfg',color:"sdfsdg"}).run();
    //     }
    // }, [editor]);

    return {
        editor
    }
}