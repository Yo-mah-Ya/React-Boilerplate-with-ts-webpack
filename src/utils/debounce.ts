type DebounceFn<P extends unknown[]> = (...args: P) => void;

export const debounceFn = <P extends unknown[], R>(
    func: (...args: P) => R,
    milliSeconds: number
): DebounceFn<P> => {
    let timerId: NodeJS.Timeout;
    return (...args: P): void => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            func(...args);
        }, milliSeconds);
    };
};
