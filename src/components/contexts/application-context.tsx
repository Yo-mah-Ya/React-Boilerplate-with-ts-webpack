import { createContext, FC, ReactNode, useMemo, useState } from "react";

type ApplicationState = {
    isLogin: boolean;
    setIsLogin: (login: boolean) => void;
};

export const ApplicationContext = createContext({
    isLogin: false,
} as ApplicationState);

export const ApplicationProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const value = useMemo(
        () => ({ isLogin, setIsLogin }),
        [isLogin, setIsLogin]
    );

    return (
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    );
};
