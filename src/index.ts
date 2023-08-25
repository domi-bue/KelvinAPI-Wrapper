import fetch, { RequestInit, Response } from "node-fetch";

import UsersModule from "./users.js";

type ClassOptions = {
    FQDN: string;
    user: string;
    password: string;
} | {
    FQDN: string;
    token: string;
};

export default class KelvinAPI {
    private USE_SSL: boolean = process.env.USE_SSL.toLowerCase().trim() === "true";
    public FQDN: string;
    public URL: string;
    public token: string;

    public Users: UsersModule;

    constructor(options: ClassOptions) {
        this.FQDN = options.FQDN.replace(/(?:https?:\/\/)?(.*?)(\/|$)/g, "$1");
        this.URL = `http${this.USE_SSL ? "s" : ""}://${this.FQDN}`;

        let tokenPromise: Promise<any>;
        if ("token" in options) this.token = options.token;
        else {
            const { user, password } = options;
            const formData = new FormData();
            formData.append("username", user);
            formData.append("password", password);

            tokenPromise = fetch(`${this.URL}/ucsschool/kelvin/token`, {
                method: "POST",
                body: formData,
            })
                .then(res => res.json() as any)
                .then(({ access_token }) => {
                    this.token = access_token;
                })
                .catch(console.error);
        }

        const fetchWithAuthorization = async (route: string, options: RequestInit = {}): Promise<Response> => {
            const modifiedOptions: RequestInit = {
                ...options,
                headers: {
                    ...options.headers,
                    "Authorization": `Bearer ${this.token}`
                }
            };

            const fullURL = `${this.URL}${route.startsWith("/") ? route : `/${route}`}`;
            return fetch(fullURL, modifiedOptions);
        };

        if (tokenPromise) {
            this.Users = new UsersModule({ promise: tokenPromise });
            tokenPromise.then(() => {
                this.Users.fetch = fetchWithAuthorization;
            });
        } else {
            this.Users = new UsersModule({ fetch: fetchWithAuthorization });
        }
    }
}
