import './toolbar.css'

import {Schema} from 'prosemirror-model'
// @ts-ignore
import {EditorState, Transaction} from '@tiptap/react'
import {EditorView} from 'prosemirror-view'
import {useEditorView} from '@/components/Editor/EditorProvider'

export interface ToolbarItem<S extends Schema = any> {
  id: string
  action: (
    state: EditorState<S>,
    dispatch: (tr: Transaction<S>) => void,
    view: EditorView,
  ) => boolean
  content: JSX.Element
  title?: string
  active?: (state: EditorState<S>) => boolean
  enable?: (state: EditorState<S>) => boolean
}

export interface ToolbarGroup<S extends Schema = any> {
  id: string
  items: ToolbarItem<S>[]
}

const ToolbarButton: React.FC<{item: ToolbarItem<Schema>}> = ({item}) => {
  // @ts-ignore
  const view = useEditorView()

  const executeAction = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      // eslint-disable-next-line @typescript-eslint/unbound-method
      item.action(view.state, view.dispatch, view)
    },
    [item, view.state, view],
  )

  return (
    // @ts-ignore
    <button
      type="button"
      className="prosemirror-toolbar-item"
      data-active={item.active && item.active(view.state)}
      disabled={item.enable && !item.enable(view.state)}
      // @ts-ignore
      onMouseDown={executeAction}
      title={item.title}
    >
      {item.content}
    </button>
  )
}

const ToolbarGroup: React.FC<{items: ToolbarItem[]}> = ({items}) => {
  // @ts-ignore
  return (
    // @ts-ignore

    <div className="prosemirror-toolbar-group">
      {items.map(
        (
          item, // @ts-ignore
        ) => (
          // @ts-ignore
          <ToolbarButton key={item.id} item={item} />
        ),
      )}
    </div>
  )
}

export const Toolbar: React.FC<{
  toolbar: ToolbarGroup[]
  className?: string
  // @ts-ignore
}> = React.memo(({toolbar, className = ''}) => {
  return (
    // @ts-ignore
    <div className={`prosemirror-toolbar ${className}`}>
      {toolbar.map((group) => (
        // @ts-ignore
        <ToolbarGroup key={group.id} items={group.items} />
      ))}
    </div>
  )
})

function useCallback(arg0: (event: React.MouseEvent<HTMLButtonElement>) => void, arg1: any[]) {
  throw new Error('Function not implemented.')
}

Toolbar.displayName = 'Toolbar'
