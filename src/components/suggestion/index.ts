import { ReactRenderer, ReactRendererOptions } from '@tiptap/react'
import tippy, { Instance } from 'tippy.js'
import { MentionList } from './MentionList'

export default {
  items: ({ query }: { query: string }) => {
    return [
      'Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
    ].filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
  },

  render: () => {
    let reactRenderer: ReactRenderer
    let popup: Instance[];

    return {
      onStart: (props: any) => {
        reactRenderer = new ReactRenderer(MentionList, {
          props,
          editor: props.s,
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