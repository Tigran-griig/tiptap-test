import { IProject } from "@/types/interfaces/IProject";
import {ICitation} from "@/types/interfaces/ICitation";

export interface _I_USER {
  id: string;
  name: string;
  citations: ICitation[];
  projects: IProject[] | null;
}