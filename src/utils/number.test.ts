import { toNumber } from "./number";

describe("number", () => {
    test("toNumber", () => {
        expect(toNumber("string")).toBe(undefined);
        expect(toNumber("0")).toBe(0);
        expect(toNumber("100")).toBe(100);
        expect(toNumber("100.0")).toBe(100.0);
        expect(toNumber(undefined)).toBe(undefined);
    });
});
