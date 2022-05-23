import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import './mentionList.module.scss'
import classes from "./mentionList.module.scss"
export const MentionList = forwardRef((props:any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // @ts-ignore
  const selectItem = index => {  // @ts-ignore

    const item = props.items[index]

    if (item) {  // @ts-ignore

      props.command({ id: item })
    }
  }

  const upHandler = () => {//@ts-ignore

    setSelectedIndex(((selectedIndex + props.items.length) - 1) % props.items.length)
  }

  const downHandler = () => {//@ts-ignore
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }
//@ts-ignore
  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({//@ts-ignore
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    },
  }))
//@ts-ignore
  return (
    <div className={classes.items}>
      {props?.items.length
        ? props.items.map((item:any, index:any) => (
          <button
            className={`${classes.item} ${index === selectedIndex ? classes.isSelected : ''}`}
            key={index}
            onClick={() => selectItem(index)}
          >
            {item}
          </button>
        ))
        : <div className="item">No result</div>
      }
    </div>
  )
})