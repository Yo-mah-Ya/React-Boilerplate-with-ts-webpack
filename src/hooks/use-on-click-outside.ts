import { RefObject } from "react";
import { useEventListener } from "./use-eventlistener";

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: MouseEvent) => void,
    mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void => {
    useEventListener(mouseEvent, (event) => {
        const el = ref?.current;

        if (!el || el.contains(event.target as Node)) {
            return;
        }

        handler(event);
    });
};
