import React, {SetStateAction, Dispatch} from "react"
import createSafeContext from "@/lib/createSafeContext";

export const [useContext, Provider] = createSafeContext<UserConsumerProps>();


export interface UserConsumerProps {
    user: any;
    setUser: Dispatch<SetStateAction<any>>
}

export interface UserProviderProps {
    children: React.ReactNode;
}

export function UserProvider({children}: React.PropsWithChildren<UserProviderProps>) {
    const [user, setUser] = React.useState<any>({
        name: 'Cyndi Lauper',
        color: '#f783ac',
    },)

    const providerValues: UserConsumerProps = {
        user,
        setUser,
    };

    return (
        <Provider value={providerValues}>
            {children}
        </Provider>
    );
}

export const useUserState = useContext;

export default UserProvider;