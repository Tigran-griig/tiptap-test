import {useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Placeholder} from '@tiptap/extension-placeholder'
import {Text} from '@tiptap/extension-text'
import {FontFamily} from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import {Color} from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Blockquote from '@tiptap/extension-blockquote'
import {OrderedList} from '@tiptap/extension-ordered-list'
import {Underline} from '@tiptap/extension-underline'
import {Document} from '@tiptap/extension-document'
import {Comment} from '@/components/extensions/comment'
import {useEditorState} from '@/Providers/Editor'
import {HardBreak} from '@tiptap/extension-hard-break'
import {Mention} from '@tiptap/extension-mention'
import suggestion from '@/components/suggestion'
import {BubbleMenu} from '@tiptap/extension-bubble-menu'
import {Extension} from '@tiptap/core'
import {useUserState} from '@/Providers/User/UserProvider'
import {Superscript} from '@tiptap/extension-superscript'
import {useComment} from '../Comment/useComment'

export const useTextEditor = () => {
  const {project} = useEditorState()
  const {user} = useUserState()
  const CustomExtension = Extension.create({
    name: 'customExtension',

    addStorage() {
      return {
        citations: user?.citations,
      }
    },
  })

  const editor = useEditor({
    extensions: [
      CustomExtension,
      Document,
      Comment,
      StarterKit,
      Text,
      TextStyle,
      FontFamily,
      Color,
      Blockquote,
      OrderedList,
      Underline,
      BubbleMenu,
      HardBreak,
      Superscript,
      StarterKit.configure({
        // The Collaboration extension comes with its own history handling
        history: false,
      }),
      Superscript.configure({
        HTMLAttributes: {
          class: 'my-custom-class',
        },
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
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion,
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
      <pre><code class='language-css'>body {
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
      commentProps.findCommentsAndStoreValues()
      commentProps.setCurrentComment(editor)
    },

    onSelectionUpdate({editor}) {
      commentProps.setCurrentComment(editor)
      commentProps.setIsTextSelected(!!editor.state.selection.content().size)
    },

    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },
  })

  const commentProps = useComment({editor, project})

  return {
    editor,
    ...commentProps,
  }
}
