import { RefObject, useState } from "react";
import { useEventListener } from "./use-eventlistener";

export const useHover = <T extends HTMLElement = HTMLElement>(
    elementRef: RefObject<T>
): boolean => {
    const [value, setValue] = useState<boolean>(false);

    const handleMouseEnter = (): void => setValue(true);
    const handleMouseLeave = (): void => setValue(false);

    useEventListener("mouseenter", handleMouseEnter, elementRef);
    useEventListener("mouseleave", handleMouseLeave, elementRef);

    return value;
};
