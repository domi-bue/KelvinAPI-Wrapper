import { RequestInit, Response } from "node-fetch";

type ClassOptions = {
    // eslint-disable-next-line no-unused-vars
    fetch: (route: string, options?: RequestInit) => Promise<Response>
} | {
    promise: Promise<any>
};

export default class BaseModule {
    // eslint-disable-next-line no-unused-vars
    public fetch: (route: string, options?: RequestInit) => Promise<Response>;
    public promise: Promise<any>;

    constructor(options: ClassOptions) {
        if ("fetch" in options) this.fetch = options.fetch;
        else this.promise = options.promise;
    }

    public async waitForFetch() {
        if (this.promise) await this.promise;
    }
}
