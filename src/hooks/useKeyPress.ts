import {useEffect, useState} from 'react'

export const useKeyPress = (targetKey: string) => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false)
  const [event, setEvent] = useState<KeyboardEvent>()

  // If pressed key is our target key then set to true
  function downHandler(event: KeyboardEvent) {
    const {key}: {key: string} = event
    setEvent(event)
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  // If released key is our target key then set to false
  const upHandler = (event: KeyboardEvent) => {
    const {key}: {key: string} = event
    setEvent(event)
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }
  // Add event listeners
  useEffect(() => {
    window.addEventListener('keyup', upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keyup', upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount
  return {
    event,
    key: keyPressed,
  }
}
