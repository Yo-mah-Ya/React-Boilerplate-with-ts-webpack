import { useEventListener } from "./use-eventlistener";

export const useClickAnyWhere = (
    handler: (event: MouseEvent) => void
): void => {
    useEventListener("click", (event) => {
        handler(event);
    });
};
