import React, {SetStateAction, Dispatch} from 'react'
import createSafeContext from '@/lib/createSafeContext'
import {IProject} from '@/types/interfaces/IProject'

export const [useContext, Provider] = createSafeContext<EditorConsumerProps>()

export interface EditorConsumerProps {
  project: IProject | null
}

export interface EditorProviderProps {
  children: React.ReactNode
  project: IProject | null
}

export const EditorProvider = ({
  children,
  project,
}: React.PropsWithChildren<EditorProviderProps>) => {
  if (!project) {
    return null
  }

  const providerValues: EditorConsumerProps = {
    project,
  }

  return <Provider value={providerValues}>{children}</Provider>
}

export const useEditorState = useContext

export default EditorProvider
