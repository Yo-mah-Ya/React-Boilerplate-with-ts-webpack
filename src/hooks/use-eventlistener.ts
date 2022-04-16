import { RefObject, useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-effect";

// Window Event based useEventListener interface
export function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element?: undefined,
    options?: boolean | AddEventListenerOptions
): void;

// Element Event based useEventListener interface
export function useEventListener<
    K extends keyof HTMLElementEventMap,
    T extends HTMLElement = HTMLDivElement
>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    element: RefObject<T>,
    options?: boolean | AddEventListenerOptions
): void;

// Document Event based useEventListener interface
export function useEventListener<K extends keyof DocumentEventMap>(
    eventName: K,
    handler: (event: DocumentEventMap[K]) => void,
    element: RefObject<Document>,
    options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<
    KW extends keyof WindowEventMap,
    KH extends keyof HTMLElementEventMap,
    T extends HTMLElement | void = void
>(
    eventName: KW | KH,
    handler: (
        event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event
    ) => void,
    element?: RefObject<T>,
    options?: boolean | AddEventListenerOptions
): void {
    const savedHandler = useRef(handler);

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const targetElement: T | Window = element?.current ?? window;
        if (!targetElement?.addEventListener) {
            return;
        }

        const eventListener: typeof handler = (event) =>
            savedHandler.current(event);

        targetElement.addEventListener(eventName, eventListener, options);

        return () => {
            targetElement.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element, options]);
}
