import { CallSite, warn } from "./logger";

export const errorMessageOf = (error: unknown): string =>
    error instanceof Error ? error.message : "unknown error";

export const unexpectedDefault = <T, C extends CallSite>(
    unknownValue: never,
    defaultValue: T,
    callSite?: C
): T => {
    warn({
        message: "unknown value",
        unknownValue,
        callSite,
    });
    return defaultValue;
};
