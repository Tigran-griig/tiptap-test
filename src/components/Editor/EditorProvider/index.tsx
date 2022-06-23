import {Node as ProsemirrorNode, Schema} from 'prosemirror-model'
import {EditorState, Plugin} from 'prosemirror-state'
import {EditorProps, EditorView} from 'prosemirror-view'
import React, {createContext, useContext, useState} from 'react'

const EditorStateContext = createContext<EditorState | null>(null)
const EditorViewContext = createContext<EditorView | null>(null)

export const useEditorState = (): EditorState => {
  const context = useContext(EditorStateContext)

  if (!context) {
    throw new Error(`useEditorState is only available inside EditorProvider`)
  }

  return context
}

export const useEditorView = (): EditorView => {
  const context = useContext(EditorViewContext)

  if (!context) {
    throw new Error(`useEditorView is only available inside EditorProvider`)
  }

  return context
}

export const EditorProviderProseMirror: React.FC<{
  // schema or doc
  doc?: ProsemirrorNode
  schema?: Schema
  plugins?: Plugin[]
  editorProps?: EditorProps
  children: React.ReactNode
  // handleDocChange?: (doc: ProsemirrorNode) => void
}> = ({doc, schema, plugins = [], editorProps, children}) => {
  const [state, setState] = useState(() => {
    // @ts-ignore
    return EditorState.create({doc, schema, plugins})
  })

  const [view] = useState(
    () =>
      // @ts-ignore
      new EditorView(undefined, {
        ...editorProps,
        state,
        dispatchTransaction: function (tr) {
          // const doc = this.state.doc

          const state = this.state.apply(tr)
          view.updateState(state)
          setState(state)

          // if (handleDocChange && state.doc !== doc) {
          //   handleDocChange(state.doc)
          // }
        },
      }),
  )

  // useEffect(() => {
  //   return () => view.destroy()
  // })

  return (
    <EditorStateContext.Provider value={state}>
      <EditorViewContext.Provider value={view}>{children}</EditorViewContext.Provider>
    </EditorStateContext.Provider>
  )
}
