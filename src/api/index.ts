import { Logger, errorMessageOf, unexpectedDefault } from "../utils";

export const invoke = async (
    url: string,
    init?: RequestInit,
    optionalTimeout?: number
): Promise<Response | undefined> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, optionalTimeout ?? 1000);

    try {
        return await fetch(url, {
            signal: controller.signal,
            ...init,
        });
    } catch (error) {
        Logger.warn({ message: errorMessageOf(error), url });
        return undefined;
    } finally {
        clearTimeout(timeout);
    }
};

type NullishAnd<T> = undefined | null | T;
type QueryStringParams =
    | string
    | number
    | boolean
    | undefined
    | null
    | NullishAnd<string>[]
    | NullishAnd<number>[]
    | NullishAnd<boolean>[];

const parseObjectToArray = (
    params: Record<string, QueryStringParams>
): string[][] => {
    const queries: string[][] = [];
    Object.entries(params).map(([key, value]) => {
        if (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        ) {
            queries.push([key, String(value)]);
        } else if (Array.isArray(value)) {
            value.map((v) => {
                if (v != undefined) {
                    queries.push([key, String(v)]);
                }
            });
        } else if (value == undefined) {
            return;
        } else {
            throw unexpectedDefault(
                value,
                new Error("unexpected query string Params")
            );
        }
    });
    return queries;
};

export const queryStringFrom = (
    params: Record<string, QueryStringParams>
): string => `?${new URLSearchParams(parseObjectToArray(params)).toString()}`;

export const fetchJson = async <T>(
    url: string,
    init?: RequestInit & { params?: Record<string, QueryStringParams> },
    optionalTimeout?: number
): Promise<T> =>
    (
        await invoke(
            `${url}${init?.params ? queryStringFrom(init.params) : ""}`,
            init,
            optionalTimeout
        )
    )?.json();
