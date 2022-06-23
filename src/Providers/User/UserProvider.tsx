import React, {SetStateAction, Dispatch, useState} from 'react'
import createSafeContext from '@/lib/createSafeContext'
import {_I_USER} from '@/types/interfaces/IUser'
import {ICitation} from '@/types/interfaces/ICitation'
import EditorProvider from '../Editor'
import {Editor} from '@tiptap/react'

export const [useContext, Provider] = createSafeContext<UserConsumerProps>()

export interface UserConsumerProps {
  user: _I_USER
  setUser: Dispatch<SetStateAction<_I_USER>>
  removeCitationById: (citationId: string) => void
  addCitation: (citation: ICitation) => void
  addCitationNameBySymbol: ({citation, symbol}: {citation: string; symbol: string}) => void
  addFootnote: (content: string, id: string) => void
  footnotes: {id: string, content: string}[] | []
  setEditor: (editor: Editor) => void
  currentFootnoteHtml:unknown | string;
  setCurrentFootnoteHtml:Dispatch<SetStateAction<string>>
}

export interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider = ({children}: React.PropsWithChildren<UserProviderProps>) => {
  const [editor, setEditor] = React.useState<Editor>()
  const [currentFootnoteHtml,setCurrentFootnoteHtml] = useState('')
  const [user, setUser] = React.useState<_I_USER>({
    id: 'adfsgjmh5524952',
    name: 'Cyndi Lauper',
    footnotes: null,
    citations: [
      {
        id: '1234567898765',
        symbol: '@',
        names: [
          '(Bush v. Gore, (Cal.App. 2012), 59 Cal.App.4th 1159.)',
          '(Bush v. Gore, (Cal.App. 2012), 59 Cal.App.4th 1159, 1172 [holding that Bush won])',
        ],
      },
    ],
    projects: [
      {
        id: 'adfsgjmh5524952_adfsgsthy251jmh5524952',
        projectName: 'First  Project',
        format: 'sdfsgfhg',
        content: '<h3>Vazgenchikkk</h3>',
        comments: null,
      },
    ],
  })
  const [footnotes, setFootnotes] = React.useState<{id: string, content: string}[] | []>([])

  const removeCitationById = (citationId: string) => {
    setUser((prevState) => ({
      ...prevState,
      citations: [...prevState.citations.filter((cit) => cit?.id !== citationId)],
    }))
  }

  const addCitation = (citation: ICitation) => {
    setUser((prevState) => ({...prevState, citations: [...prevState.citations, citation]}))
  }

  const addCitationNameBySymbol = ({citation, symbol}: {citation: string; symbol: string}) => {
    setUser((prevState) => ({
      ...prevState,
      citations: [
        ...prevState.citations.map((cit) => {
          if (cit?.symbol === symbol) {
            cit.names.push(citation)
            return cit
          }
          return cit
        }),
      ],
    }))
  }
  const addFootnote = (content: string, id: string) => {
    const footnote = {
      id: id,
      content: content,
    }
    if (footnotes.find(item => item?.id === id)) {
      // @ts-ignore
      setFootnotes([...footnotes?.map(item => item?.id !== id).filter(item => item?.id), footnote])
    } else {
      setFootnotes(prev => [...prev, footnote])
    }
    editor?.chain()?.focus()?.selectTextblockEnd()?.run()
    // @ts-ignore
    // editor?.view.dispatch(Text)
  setCurrentFootnoteHtml(`<span :id=${id}>${content}</span>`)
  }
  const providerValues: UserConsumerProps = {
    user,
    setUser,
    footnotes,
    setEditor,
    removeCitationById,
    addCitation,
    addCitationNameBySymbol,
    addFootnote,
    currentFootnoteHtml,
    setCurrentFootnoteHtml
  }

  return (
    <Provider value={providerValues}>
      <EditorProvider project={user?.projects?.length ? user.projects[0] : null}>
        {children}
      </EditorProvider>
    </Provider>
  )
}

export const useUserState = useContext

export default UserProvider
