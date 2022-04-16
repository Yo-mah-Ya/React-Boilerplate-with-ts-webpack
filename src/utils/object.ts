export const isObject = <T>(
    data: unknown
): data is Record<PropertyKey, T extends infer A ? A : unknown> =>
    typeof data === "object" &&
    data !== null &&
    !Array.isArray(data) &&
    data.constructor.name === "Object";

export const entries = <K extends PropertyKey, V>(
    obj: Record<K, V>
): [K, V][] => Object.entries(obj) as [K, V][];

export const fromEntries = <K extends PropertyKey, V>(
    entries: [K, V][]
): Record<K, V> => Object.fromEntries(entries) as Record<K, V>;

export const keys = <K extends PropertyKey, V>(obj: Record<K, V>): K[] =>
    Object.keys(obj) as K[];

export const pick = <T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    properties: readonly K[]
): Pick<T, K> =>
    !Object.keys(obj).length
        ? obj
        : properties.reduce((acc, name) => {
              if (name in obj) {
                  acc[name] = obj[name];
              }
              return acc;
          }, {} as Pick<T, K>);

export const omit = <T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    properties: readonly K[]
): Omit<T, K> => {
    const set = new Set(properties as readonly string[]);
    return !Object.keys(obj).length
        ? obj
        : (Object.entries(obj).reduce((acc, [name, value]) => {
              if (!set.has(name)) {
                  acc[name] = value;
              }
              return acc;
          }, {} as Record<string, unknown>) as Omit<T, K>);
};

export const omitNullish = <K extends PropertyKey, V>(
    obj: Record<K, V>
): Record<K, V> =>
    fromEntries(entries(obj).filter(([, value]) => value != undefined));
