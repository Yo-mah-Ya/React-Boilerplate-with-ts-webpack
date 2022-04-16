import { useEffect, useRef, useState } from "react";

type UserIdleCallbackProps = {
    callback?: () => void;
    options: IdleRequestOptions;
};
export const useIdleCallback = (options: UserIdleCallbackProps): boolean => {
    const option = useRef<UserIdleCallbackProps>();
    const [isIdle, setIsIdle] = useState(false);

    useEffect(() => {
        option.current = options;
    }, [options]);

    useEffect(() => {
        const id = window.requestIdleCallback(() => {
            if (option.current?.callback) option.current.callback();
            setIsIdle(true);
        }, option.current?.options);

        return () => window.cancelIdleCallback(id);
    }, []);

    return isIdle;
};
