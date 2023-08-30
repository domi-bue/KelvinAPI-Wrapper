import fetch, { RequestInit, Response } from "node-fetch";

import ClassesModule from "./modules/classes.js";
import RolesModule from "./modules/roles.js";
import SchoolsModule from "./modules/schools.js";
import UsersModule from "./modules/users.js";

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

    public Classes: ClassesModule;
    public Roles: RolesModule;
    public Schools: SchoolsModule;
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
            this.Classes = new ClassesModule({ promise: tokenPromise });
            this.Roles = new RolesModule({ promise: tokenPromise });
            this.Schools = new SchoolsModule({ promise: tokenPromise });
            this.Users = new UsersModule({ promise: tokenPromise });
            tokenPromise.then(() => {
                this.Classes.fetch = fetchWithAuthorization;
                this.Roles.fetch = fetchWithAuthorization;
                this.Schools.fetch = fetchWithAuthorization;
                this.Users.fetch = fetchWithAuthorization;
            });
        } else {
            this.Classes = new ClassesModule({ fetch: fetchWithAuthorization });
            this.Roles = new RolesModule({ fetch: fetchWithAuthorization });
            this.Schools = new SchoolsModule({ fetch: fetchWithAuthorization });
            this.Users = new UsersModule({ fetch: fetchWithAuthorization });
        }
    }
}
