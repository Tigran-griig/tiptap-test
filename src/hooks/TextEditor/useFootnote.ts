import {useState} from "react";
import {keymap} from "prosemirror-keymap";
import {redo, undo} from "prosemirror-history";
import {StepMap} from "prosemirror-transform"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"

export const useFootnote = (props: any) => {
    const {node, view, getPos} = props;
    const dom = document.createElement("footnote")
    const [innerView, setInnerView] = useState<any>(null);
    const outerView = view


    const dispatchInner = (tr: any) => {

        const {state, transactions} = innerView.state.applyTransaction(tr)
        innerView.updateState(state)

        if (!tr.getMeta("fromOutside")) {
            let outerTr = outerView.state.tr, offsetMap = StepMap.offset(getPos() + 1)
            for (let i = 0; i < transactions.length; i++) {
                let steps = transactions[i].steps
                for (let j = 0; j < steps.length; j++)
                    outerTr.step(steps[j].map(offsetMap))
            }
            if (outerTr.docChanged) outerView.dispatch(outerTr)
        }
    }

    const update = (node: any) => {
        if (!node.sameMarkup(node)) return false
        node = node
        if (innerView) {
            let state = innerView.state
            let start = node.content.findDiffStart(state.doc.content)
            if (start != null) {
                let {a: endA, b: endB} = node.content.findDiffEnd(state.doc.content)
                let overlap = start - Math.min(endA, endB)
                if (overlap > 0) {
                    endA += overlap;
                    endB += overlap
                }
                innerView.dispatch(
                    state.tr
                        .replace(start, endB, node.slice(start, endA))
                        .setMeta("fromOutside", true))
            }
        }
        return true
    }

    const close = () => {
        innerView.destroy()
        setInnerView(null)
        dom.textContent = ""
    }
    const selectNode = () => {
        dom.classList.add("ProseMirror-selectednode")
        if (!innerView) {
            open()
        }
    }

    const deselectNode = () => {
        dom.classList.remove("ProseMirror-selectednode")
        if (innerView) {
            close()
        }
    }

    const open = () => {
        // Append a tooltip to the outer node
        let tooltip = dom.appendChild(document.createElement("div"))
        tooltip.className = "footnote-tooltip"
        // And put a sub-ProseMirror into that
        // @ts-ignore
        setInnerView(new EditorView(tooltip, {
            // You can use any node as an editor document
            state: EditorState.create({
                doc: node,
                plugins: [keymap({
                    "Mod-z": () => undo(outerView.state, outerView.dispatch),
                    "Mod-y": () => redo(outerView.state, outerView.dispatch)
                })]
            }),
            // This is the magic part
            dispatchTransaction: dispatchInner,
            handleDOMEvents: {//@ts-ignore
                mousedown: () => {
                    // Kludge to prevent issues due to the fact that the whole
                    // footnote is node-selected (and thus DOM-selected) when
                    // the parent editor is focused.
                    if (outerView.hasFocus()) innerView.focus()
                }
            }
        }));
    }
    return {
        open,
        close,
    }
}
