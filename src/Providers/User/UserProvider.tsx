import React, { SetStateAction, Dispatch } from "react"
import createSafeContext from "@/lib/createSafeContext";
import EditorProvider from "../Editor";
import { _I_USER } from "@/types/interfaces/IUser";

export const [useContext, Provider] = createSafeContext<UserConsumerProps>();

export interface UserConsumerProps {
  user: _I_USER;
  setUser: Dispatch<SetStateAction<_I_USER>>
}

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: React.PropsWithChildren<UserProviderProps>) {
  const [user, setUser] = React.useState<_I_USER>({
    id: "adfsgjmh5524952",
    name: 'Cyndi Lauper',
    projects: [
      {
        id: "adfsgjmh5524952_adfsgsthy251jmh5524952",
        projectName: "First  Project",
        format: "sdfsgfhg",
        content: "<h3>Vazgenchikkk</h3>",
        comments: null,
      }
    ]

  },)

  const providerValues: UserConsumerProps = {
    user,
    setUser,
  };

  return (
    <Provider value={providerValues}>
      <EditorProvider project={!!user?.projects?.length ? user.projects[0] : null}>
        {children}
      </EditorProvider>
    </Provider>
  );
}

export const useUserState = useContext;

export default UserProvider;