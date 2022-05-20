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

export const useTextEditor = () => {
    const {user} = useUserState();
    const [editorState, setEditorState] = useState<JSONContent>()
    const documentElement: Element | undefined = document.querySelector(".element") ?? undefined; //tag for custom  editor

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
            Mark.create({
                footnote: false,
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
    });
    return {
        editor
    }
}