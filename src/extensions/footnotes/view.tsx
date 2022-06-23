import {Editor, Node} from '@tiptap/react'
import {EditorView} from 'prosemirror-view'
import {EditorState, Transaction} from 'prosemirror-state'
import {keymap} from 'prosemirror-keymap'
import {StepMap} from 'prosemirror-transform'
import {footnoteSchema} from './spec'

export interface FootnoteOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    footnote: {
      /**
       * Toggle a footnote node
       */
      /**
       * select a node
       */
      selectNode: () => ReturnType
      /**
       * desselect a node
       */
      deselectNode: () => ReturnType
      /**
       * update a node
       */
      update: () => ReturnType
      /**
       * dispatch a node
       */
      dispatchTransaction: () => ReturnType
    }
  }
}

export declare const inputRegex = `/(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/`

export const Footnote = Node.create<FootnoteOptions>({
  name: 'footnote',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      footnote: {
        default: {
          group: 'inline',
          content: 'inline*',
          inline: true,
          atom: true,
        },
        // @ts-ignore
        parseHTML: (el) => (el as HTMLSpanElement).getAttribute('footnote'),
        // @ts-ignore
        renderHTML: (attrs) => ({'prosemirror-footnote': attrs.footnote}),
      },
    }
  },
  //@ts-ignore
  addCommands:
    () =>
    //@ts-ignore
    (innerView, node) => {
      const footnote = document.createElement('footnote')

      const open =
        () =>
        // @ts-ignore
        ({comands}) => {
          const tooltip = footnote.appendChild(document.createElement('div'))
          tooltip.className = 'footnote-tooltip'
          innerView = new EditorView(tooltip, {
            state: EditorState.create({
              doc: node,
              plugins: [
                keymap({
                  // eslint-disable-next-line @typescript-eslint/unbound-method
                  'Mod-z': () =>
                    comands.undo(comands.state.view.state, comands.state.view.dispatch),
                  // eslint-disable-next-line @typescript-eslint/unbound-method
                  'Mod-y': () =>
                    comands.redo(comands.state.view.state, comands.state.view.dispatch),
                }),
              ],
            }),
            //@ts-ignore
            dispatchTransaction: function (tr: Transaction, editor: Editor) {
              const {state, transactions} = this.state.applyTransaction(tr)
              editor.view.updateState(state)
              if (!tr.getMeta('fromOutside')) {
                const outerTr = editor.view.state.tr
                //@ts-ignore
                const offsetMap = StepMap.offset(Number(editor?.getPos()) + 1)

                transactions.forEach((transaction) => {
                  transaction.steps.forEach((step) => {
                    const newStep = step.map(offsetMap)
                    if (newStep) {
                      outerTr.step(newStep)
                    }
                  })
                })

                if (outerTr.docChanged) {
                  editor.view.dispatch(outerTr)
                }
              }
            },
            handleDOMEvents: {
              mousedown: (editroview) => {
                if (innerView && editroview.hasFocus()) {
                  innerView.focus()
                }
                return false
              },
            },
          })

          innerView.focus()
        }

      const close = () => {
        if (innerView) {
          innerView.destroy()
          innerView = null
        }
        footnote.textContent = ''
      }
      return {
        selectNode:
          () =>
          // @ts-ignore
          ({commands}) => {
            commands.addAttributes({className: 'ProseMirror-selectednode'})
            if (!innerView) {
              open()
            }
          },
        deselectNode:
          () =>
          // @ts-ignore
          ({commands}) => {
            commands.remove('ProseMirror-selectednode')

            if (innerView) {
              close()
            }
          },
        // @ts-ignore
        update:
          (newNode: any) =>
          // @ts-ignore
          ({commands}) => {
            if (!newNode.sameMarkup(node)) {
              return false
            }
            debugger
            node = newNode

            if (innerView) {
              const {state} = innerView
              const start = node.content.findDiffStart(state.doc.content)

              if (start != null) {
                // @ts-ignore
                let {a: endA, b: endB} = node.content.findDiffEnd(state.doc.content)

                const overlap = start - Math.min(endA, endB)

                if (overlap > 0) {
                  endA += overlap
                  endB += overlap
                }

                innerView.dispatch(
                  state.tr
                    .replace(start, endB, node.slice(start, endA))
                    .setMeta('fromOutside', true),
                )
              }
            }

            return true
          },
        destroy:
          () =>
          // @ts-ignore
          ({commands}) => {
            if (innerView) {
              commands.close()
            }
          },
        // @ts-ignore
        stopEvent:
          (event: any) =>
          // @ts-ignore
          ({commands}) => {
            return Boolean(innerView && innerView.dom.contains(event.target))
          },
        ignoreMutation() {
          return true
        },
        dom: document,
        content: footnote,
      }
    },
})
