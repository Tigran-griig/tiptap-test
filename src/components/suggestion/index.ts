import {Editor, ReactRenderer} from '@tiptap/react'
import tippy, {Instance} from 'tippy.js'
import {ICitation} from '@/types/interfaces/ICitation'
import {MentionList} from './MentionList'

export default {
  items: async (props: any) => {
    const {citations} = props.editor.extensionStorage.customExtension
    return ([...citations.find((item: ICitation) => item.symbol === '@')?.names] ?? [''])
      .filter((item) => item?.toLowerCase().indexOf(props.query.toLowerCase()) > -1)
      .slice(0, 5)
  },

  render: () => {
    let reactRenderer: ReactRenderer
    let popup: Instance[]

    return {
      onStart: (props: any) => {
        reactRenderer = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        })

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: reactRenderer.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: any) {
        reactRenderer.updateProps(props)

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          debugger
          popup[0].hide()

          return true
        }

        // @ts-ignore
        return reactRenderer.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        reactRenderer.destroy()
      },
    }
  },
}
