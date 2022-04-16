import { useState } from "react";
import { useEventListener } from "./use-eventlistener";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-effect";

export interface WindowSize {
    width: number;
    height: number;
}

export const useWindowSize = (): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
    });

    const handleSize = (): void => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEventListener("resize", handleSize);

    // Set size at the first client-side load
    useIsomorphicLayoutEffect(() => {
        handleSize();
    }, []);

    return windowSize;
};
