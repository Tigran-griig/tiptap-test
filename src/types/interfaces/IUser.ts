import { IProject } from "@/types/interfaces/IProject";

export interface _I_USER {
  id: string;
  name: string;
  projects: IProject[] | null;
}