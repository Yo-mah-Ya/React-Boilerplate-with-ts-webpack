import { fulfilledOnly } from "./promise";

describe("promise", () => {
    test("fulfilledOnly", async () => {
        expect(
            await fulfilledOnly([
                Promise.resolve(1),
                Promise.reject(new Error("failed")),
                Promise.resolve(3),
                Promise.resolve(undefined),
            ])
        ).toStrictEqual(expect.arrayContaining([1, 3]));
    });
});
