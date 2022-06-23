import React from 'react'
import {Block} from '@/Block'
import {SnackbarProvider} from 'notistack'
import TextEditor from './components/TextEditor'

const App = () => {
  return (
    <div className="root">
      <SnackbarProvider maxSnack={6}>
        <Block className="container">
          <Block className="root-left-section">
            <div>Navbar</div>
          </Block>
          <Block className="root-right-section">
            <TextEditor />
          </Block>
        </Block>
      </SnackbarProvider>
    </div>
  )
}

export default App
