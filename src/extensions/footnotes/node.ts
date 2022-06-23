import './style/footnotes.css'

import {keymap} from 'prosemirror-keymap'
import {EditorState, Transaction} from 'prosemirror-state'
import {StepMap} from 'prosemirror-transform'
import {Editor, Node} from '@tiptap/react'
import {EditorView} from 'prosemirror-view'

// @ts-ignore
export const Footnote = Node.create<FootnoteOptions>({
  name: 'footnote',
  group: 'inline',
  content: 'inline*',
  inline: true,
  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      footnote: {
        default: null,
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
      const dom = document.appendChild(document.createElement('footnote'))
      // let innerView: EditorView | null
      const setFootnote = () => {
        // @ts-ignore
        ;({comands}) => {
          open()
        }
      }

      const open =
        () =>
        // @ts-ignore
        ({comands}) => {
          const tooltip = dom.appendChild(document.createElement('div'))
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
        dom.textContent = ''
      }
      // @ts-ignore
      // @ts-ignore
      return {
        // setFootnote:
        //   (footnote: '\n') =>
        //   // @ts-ignore
        //   ({commands}) =>
        //     commands.setFootnote('footnote', {footnote}),
        toogleFootnote:
          () =>
          // @ts-ignore
          ({commands}) =>
            commands.toogleFootnote('prosemirror-footnote'),
        unsetFootnote:
          () =>
          // @ts-ignore
          ({commands}) =>
            commands.unsetMark('prosemirror-footnote'),
        selectNode:
          () =>
          // @ts-ignore
          ({commands}) => {
            commands.addAttributes({className: 'ProseMirror--footnote-selectednode'})
            open()
          },
        deselectNode:
          () =>
          // @ts-ignore
          ({commands}) => {
            commands.remove('ProseMirror--footnote-selectednode')
            if (innerView) {
              commands.close()
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
      }
    },
})
