import * as t from "io-ts";
import { Readable } from "stream";

export interface DateString {
    readonly dateString: unique symbol;
}
export const dateString = t.brand(
    t.string,
    (s: string): s is t.Branded<string, DateString> =>
        /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(new Date(s).getTime()),
    "dateString"
);
export interface DateTimeString {
    readonly dateTimeString: unique symbol;
}
export const dateTimeString = t.brand(
    t.string,
    (s: string): s is t.Branded<string, DateTimeString> =>
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(\.\d+)$/.test(s) &&
        !Number.isNaN(new Date(s).getTime()),
    "dateTimeString"
);

export const readable = new t.Type<Readable, Readable, unknown>(
    "Readable",
    (input: unknown): input is Readable => input instanceof Readable,
    (input, context) =>
        input instanceof Readable
            ? t.success(input)
            : t.failure(input, context),
    t.identity
);

export const throwOnFailureWith =
    <A>({
        isFunc,
        funcName,
    }: {
        isFunc: (result: unknown) => result is A;
        funcName: string;
    }) =>
    (result: unknown): A => {
        if (!isFunc(result)) {
            throw new Error(`Is not: ${funcName}`);
        }
        return result;
    };
