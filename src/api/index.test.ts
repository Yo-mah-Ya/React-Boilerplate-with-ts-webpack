import { queryStringFrom } from "./index";

describe(queryStringFrom, () => {
    test("", () => {
        expect(
            queryStringFrom({
                a: "a",
                b: 1,
                c: undefined,
                d: null,
                f: true,
                g: [1, 2, 3],
                h: ["a", "b", "c"],
                i: [true, false, undefined],
                j: "🚀 not ASCII.",
            })
        ).toStrictEqual(
            "?a=a&b=1&f=true&g=1&g=2&g=3&h=a&h=b&h=c&i=true&i=false&j=%F0%9F%9A%80+not+ASCII."
        );
    });
});
