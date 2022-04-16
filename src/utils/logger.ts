import { isObject } from "./object";

export type CallSite = {
    file?: string;
    function?: string;
    line?: string;
};
type LogMessage = {
    message: string;
    callSite?: CallSite;
};

enum LogLevel {
    Trace = "TRACE",
    Debug = "DEBUG",
    Info = "INFO",
    Warn = "WARN",
    Error = "ERROR",
    Critical = "CRITICAL",
}

export const parseObjectToString = <V>(message: Record<string, V>): string => {
    const body = Object.entries(message)
        .map(([key, value]) => `${key}: ${stringEscape(value)}`)
        .join(", ");
    return `{ ${body} }`;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const functionEscape = (message: Function): string =>
    message.constructor.name === "Function"
        ? message.name === ""
            ? "arrow function"
            : `${message.name} function`
        : message.constructor.name === "AsyncFunction"
        ? message.name === ""
            ? "async arrow function"
            : `async ${message.name} function`
        : "unknown function";

const stringEscape = (message: unknown): string =>
    typeof message === "string"
        ? `"${message}"`
        : isObject(message)
        ? parseObjectToString(message)
        : Array.isArray(message)
        ? `[${message.map(stringEscape).join(", ")}]`
        : // avoid to call class object like "Date(), Error()" to escape "Uncaught TypeError: Class constructor xxx cannot be invoked without 'new'"
        typeof message === "function"
        ? functionEscape(message)
        : String(message);

const messageWith =
    (paramLogLevel: LogLevel) =>
    <T extends LogMessage>(message: T): void => {
        console.log(
            `[${paramLogLevel}] ${new Date().toISOString()} ${parseObjectToString(
                message
            )}`
        );
    };

export const trace = messageWith(LogLevel.Trace);
export const debug = messageWith(LogLevel.Debug);
export const info = messageWith(LogLevel.Info);
export const warn = messageWith(LogLevel.Warn);
export const error = messageWith(LogLevel.Error);
export const critical = messageWith(LogLevel.Critical);
