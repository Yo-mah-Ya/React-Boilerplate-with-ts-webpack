import { fetchJson } from "../api";
import { environments } from "../env";
import * as t from "io-ts";
import { dateString, readable, throwOnFailureWith } from "./types";

const userProfile = t.intersection([
    t.type({
        userName: t.string,
        nationality: t.array(t.string),
        isMarried: t.boolean,
    }),
    t.partial({
        birthDay: dateString,
        sex: t.keyof({
            men: null,
            women: null,
            others: null,
        }),
        profileImage: readable,
    }),
]);
type UserProfile = t.TypeOf<typeof userProfile>;
const isUserProfile = (json: unknown): json is UserProfile =>
    userProfile.is(json);
const assertUserProfile = throwOnFailureWith({
    isFunc: isUserProfile,
    funcName: isUserProfile.name,
});

export const fetchUsers = async (): Promise<UserProfile[]> => {
    const response = await fetchJson(`${environments.cdnEndpoint}/users`, {
        method: "GET",
    });
    return Array.isArray(response) ? response.map(assertUserProfile) : [];
};

export const fetchUser = async (id: string): Promise<UserProfile> =>
    assertUserProfile(
        await fetchJson(`${environments.cdnEndpoint}/users/${id}`, {
            method: "GET",
        })
    );
