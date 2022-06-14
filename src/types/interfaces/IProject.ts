import {IComment} from '@/types/interfaces/IComment'

export interface IProject {
  id: string
  projectName?: string
  format: string
  content: string | null
  comments: IComment[] | null
}
