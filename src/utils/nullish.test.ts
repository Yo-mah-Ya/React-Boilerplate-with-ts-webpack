import * as Nullish from "./nullish";

describe("Nullish", () => {
    test("isNotNullish", () => {
        expect(Nullish.isNotNullish(undefined)).toBeFalsy();
        expect(Nullish.isNotNullish(null)).toBeFalsy();
    });
});
