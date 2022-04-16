import { errorMessageOf, unexpectedDefault } from "./error";

describe("error", () => {
    test("errorMessageOf", () => {
        expect(errorMessageOf(new Error("test error"))).toBe("test error");
        expect(errorMessageOf("test error")).toBe("unknown error");
    });
    test("unexpectedDefault", () => {
        const error = new Error("test error");
        expect(unexpectedDefault("unexpected" as never, error)).toBe(error);
        expect(unexpectedDefault(0 as never, error)).toBe(error);
    });
});
