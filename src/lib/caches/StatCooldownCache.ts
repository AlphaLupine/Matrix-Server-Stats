const cache: object = {};
export default class StatCooldownCache {
    public get(key: string) {
        return cache[key];
    }

    public set(key: string, value: number) {
        cache[key] = value;
    }
}