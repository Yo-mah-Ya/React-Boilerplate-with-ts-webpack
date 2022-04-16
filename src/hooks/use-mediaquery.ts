import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
    const getMatches = (query: string): boolean =>
        typeof window !== "undefined"
            ? window.matchMedia(query).matches
            : false;

    const [matches, setMatches] = useState<boolean>(getMatches(query));

    const handleChange = (): void => {
        setMatches(getMatches(query));
    };

    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        // Triggered at the first client-side load and if query changes
        handleChange();

        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange);
        } else {
            matchMedia.addEventListener("change", handleChange);
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange);
            } else {
                matchMedia.removeEventListener("change", handleChange);
            }
        };
    }, [query]);

    return matches;
};
