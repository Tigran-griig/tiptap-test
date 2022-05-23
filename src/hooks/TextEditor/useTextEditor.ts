import { useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Placeholder} from '@tiptap/extension-placeholder'
import {Text} from '@tiptap/extension-text'
import {FontFamily} from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import {Color} from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Blockquote from '@tiptap/extension-blockquote'
import {OrderedList} from "@tiptap/extension-ordered-list";
import {Underline} from "@tiptap/extension-underline";
import {Document} from "@tiptap/extension-document";
import {Comment} from '@/components/extensions/comment'
import {useComment} from "../Comment/useComment"
import {useEditorState} from "@/Providers/Editor";
import {HardBreak} from "@tiptap/extension-hard-break";

export const useTextEditor = () => {
    const {project} = useEditorState();

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
            HardBreak,
            Comment,
            // Mention.configure({
            //     HTMLAttributes: {
            //         class: 'mention',
            //     },
            //     suggestion,
            // }),
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
        onUpdate({editor}) {
            commentProps.findCommentsAndStoreValues();
            commentProps.setCurrentComment(editor);
        },

        onSelectionUpdate({ editor }) {
            commentProps.setCurrentComment(editor);

            commentProps.setIsTextSelected(!!editor.state.selection.content().size)
        },

        editorProps: {
            attributes: {
                spellcheck: 'false',
            },
        },
    });

    const commentProps = useComment({editor, project})

    return {
        editor,
        ...commentProps,
    }
}