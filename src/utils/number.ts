export function toNumber(s: string): number;
export function toNumber(s: string | undefined): number | undefined;
export function toNumber(s: string | undefined): number | undefined {
    if (s == undefined) return undefined;
    const res = Number(s);
    if (Number.isNaN(res)) throw new Error(`${s} is not a number`);
    return res;
}
