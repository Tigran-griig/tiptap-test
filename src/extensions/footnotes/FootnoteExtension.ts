import Image from '@tiptap/extension-image'
import {uuidv4} from 'lib0/random'
import {Footnote} from '@/extensions/footnotes'

export const FootnoteExtension = Image.extend({

  addNodeView() {
    return ({node, editor}) => {
      const {view} = editor
      const footnote = document.createElement('footnote')
      footnote.className = 'prosemirror-footnote'
      footnote.id = uuidv4()
      footnote.addEventListener('click', (event) => {
        const modalContent = document.querySelector('footnote')
        console.log(modalContent,"modalContent")
      })

      return {
        dom: footnote,
        contentDOM: footnote,
      }
    }
  },
  ...Footnote,
})