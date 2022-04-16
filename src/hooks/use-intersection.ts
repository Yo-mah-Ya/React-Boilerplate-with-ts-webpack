import { useState, useEffect, RefObject, useRef } from "react";

export const useIntersection = <T extends HTMLElement>(
    ref: RefObject<T | undefined | null>,
    options: {
        observerOption?: IntersectionObserverInit;
        once?: boolean;
    }
): IntersectionObserverEntry | undefined => {
    const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>();
    const { current: opt } = useRef(options);

    useEffect(() => {
        if (!ref.current) return undefined;

        const el = ref.current;
        const observer = new IntersectionObserver(
            ([intersectionEntry]): void => {
                setEntry(intersectionEntry);
                if (opt.once && intersectionEntry.isIntersecting) {
                    observer.unobserve(el);
                }
            },
            opt.observerOption
        );
        observer.observe(el);

        return (): void => {
            observer.unobserve(el);
        };
    }, [opt.observerOption, opt.once, ref]);

    return entry;
};
