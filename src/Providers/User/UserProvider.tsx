import React, {SetStateAction, Dispatch, useCallback} from "react"
import createSafeContext from "@/lib/createSafeContext";
import EditorProvider from "../Editor";
import {_I_USER} from "@/types/interfaces/IUser";
import {ICitation} from "@/types/interfaces/ICitation";

export const [useContext, Provider] = createSafeContext<UserConsumerProps>();

export interface UserConsumerProps {
    user: _I_USER;
    setUser: Dispatch<SetStateAction<_I_USER>>
}

export interface UserProviderProps {
    children: React.ReactNode;
}

export function UserProvider({children}: React.PropsWithChildren<UserProviderProps>) {
    const [user, setUser] = React.useState<_I_USER>({
        id: "adfsgjmh5524952",
        name: 'Cyndi Lauper',
        citations: [
            {
                id: "1234567898765",
                symbol: "@",
                names: ['Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',]
            }
        ],
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


    const updateCitations = useCallback((cit:ICitation[]) => {
    }, [user])

    const updateProjects = useCallback((cit:ICitation[]) => {
    }, [user])

   const  updateUser = useCallback(() => {
   },[])

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