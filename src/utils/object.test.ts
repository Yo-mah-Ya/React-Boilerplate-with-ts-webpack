import { omit, omitNullish, isObject, pick } from "./object";

describe("object", () => {
    test("isObject", () => {
        expect(isObject({})).toBeTruthy();
        expect(isObject({ a: "a" })).toBeTruthy();
        expect(isObject("string")).toBeFalsy();
        expect(isObject(0)).toBeFalsy();
        expect(isObject(undefined)).toBeFalsy();
        expect(isObject(null)).toBeFalsy();
        expect(isObject([])).toBeFalsy();
        expect(isObject(() => {})).toBeFalsy();
        expect(isObject(Error)).toBeFalsy();
        expect(isObject(new Error())).toBeFalsy();
        expect(isObject(Date)).toBeFalsy();
        expect(isObject(new Date())).toBeFalsy();
        class T {}
        expect(isObject(T)).toBeFalsy();
        expect(isObject(new T())).toBeFalsy();
    });
    test("omitNullish", () => {
        expect(omitNullish({ a: "a", b: 0, c: undefined })).toStrictEqual({
            a: "a",
            b: 0,
        });
        expect(omitNullish({ a: "a", b: 0, c: null })).toStrictEqual({
            a: "a",
            b: 0,
        });
    });
    test("pick", () => {
        expect(pick({ a: "a" }, ["a"])).toStrictEqual({ a: "a" });
        expect(pick({ a: "a", b: 0 }, ["a"])).toStrictEqual({
            a: "a",
        });
        expect(
            pick({ a: "a", b: { a: "a", b: [0, 1, 2] } }, ["b"])
        ).toStrictEqual({ b: { a: "a", b: [0, 1, 2] } });
    });
    test("omit", () => {
        expect(omit({ a: "a" }, ["a"])).toStrictEqual({});
        expect(omit({ a: "a", b: 0 }, ["b"])).toStrictEqual({
            a: "a",
        });
        expect(
            omit({ a: "a", b: { a: "a", b: [0, 1, 2] } }, ["a"])
        ).toStrictEqual({ b: { a: "a", b: [0, 1, 2] } });
    });
});
