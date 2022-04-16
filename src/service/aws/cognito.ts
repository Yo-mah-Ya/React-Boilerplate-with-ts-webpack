import { Auth, CognitoUser } from "@aws-amplify/auth";
import { ISignUpResult } from "amazon-cognito-identity-js";
import { Logger, errorMessageOf, ObjectUtil } from "../../utils";

export const signIn = async (
    username: string,
    password: string
): Promise<CognitoUser> => {
    try {
        const cognitoUser = (await Auth.signIn(username, password)) as unknown;
        if (cognitoUser instanceof CognitoUser) {
            return cognitoUser;
        }
        throw new Error();
    } catch (error) {
        Logger.warn({ message: errorMessageOf(error) });
        throw error;
    }
};

// https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
type StandardAttributes = {
    address: string;
    birthdate: string;
    email: string;
    family_name: string;
    gender: string;
    given_name: string;
    locale: string;
    middle_name: string;
    name: string;
    nickname: string;
    phone_number: string;
    picture: string;
    preferred_username: string;
    profile: string;
    updated_at: string;
    website: string;
    zoneinfo: string;
};
export const signUp = async <T extends Partial<StandardAttributes>>(
    username: string,
    password: string,
    attributes?: T
): Promise<ISignUpResult> =>
    await Auth.signUp({
        username,
        password,
        attributes: {
            ...ObjectUtil.omitNullish(attributes as Record<string, unknown>),
        },
    });
export const confirmSignUp = async (
    username: string,
    code: string
): Promise<void> => {
    await Auth.confirmSignUp(username, code);
};

export const signOut = async (): Promise<void> => {
    await Auth.signOut();
};

export const globalSignOut = async (): Promise<void> => {
    await Auth.signOut({ global: true });
};

export const isLogin = async (): Promise<boolean> =>
    (await Auth.currentUserInfo()) ? true : false;
