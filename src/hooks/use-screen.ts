import { useState } from "react";
import { useEventListener } from "./use-eventlistener";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-effect";

export const useScreen = (): Screen | undefined => {
    const getScreen = (): Screen | undefined =>
        typeof window !== "undefined" && window.screen
            ? window.screen
            : undefined;

    const [screen, setScreen] = useState<Screen | undefined>(getScreen());

    const handleSize = (): void => {
        setScreen(getScreen());
    };

    useEventListener("resize", handleSize);

    useIsomorphicLayoutEffect(() => {
        handleSize();
    }, []);

    return screen;
};
