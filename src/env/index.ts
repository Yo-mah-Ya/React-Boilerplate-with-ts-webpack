const assertString = (env?: string): string => {
    if (env == undefined) throw new Error("cannot get process.env");
    return env;
};

export const environments = {
    cdnEndpoint: assertString(process.env.CDN_ENDPOINT),
} as const;
