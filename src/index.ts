import https from "https";
import fetch, { RequestInit, Response } from "node-fetch";

import ClassesModule from "./modules/classes.js";
import RolesModule from "./modules/roles.js";
import SchoolsModule from "./modules/schools.js";
import UsersModule from "./modules/users.js";
import workgroupsModule from "./modules/workgroups.js";

/**
 * Options for configuring the KelvinAPI class.
 * @property {(FQDN: string, user: string, password: string) | (FQDN: string, token: string)} - The authentication options.
 * @property {boolean} [USE_SSL] - Whether to use SSL (default is determined based on the protocol in FQDN or if not specified `true`).
 * @property {boolean} [IGNORE_TLS_REJECT_UNAUTHORIZED] - Whether to ignore TLS certificate verification. (default is `false`).
 */
type ClassOptions = ({
    FQDN: string;
    user: string;
    password: string;
} | {
    FQDN: string;
    token: string;
}) & {
    USE_SSL?: boolean;
    IGNORE_TLS_REJECT_UNAUTHORIZED?: boolean;
};

export default class KelvinAPI {
    private USE_SSL: boolean;
    private FQDN: string;
    private URL: string;
    private token: string;
    private agent: https.Agent;

    public Classes: ClassesModule;
    public Roles: RolesModule;
    public Schools: SchoolsModule;
    public Users: UsersModule;
    public Workgroups: workgroupsModule;

    constructor(options: ClassOptions) {
        this.USE_SSL =
            options.USE_SSL !== undefined
                ? options.USE_SSL
                : options.FQDN.startsWith("https://")
                    ? true
                    : !options.FQDN.startsWith("http://");
        this.FQDN = options.FQDN.replace(/(?:https?:\/\/)?(.*?)(\/|$)/g, "$1");
        this.URL = `http${this.USE_SSL ? "s" : ""}://${this.FQDN}`;
        if (this.USE_SSL) this.agent = new https.Agent({
            rejectUnauthorized: options.IGNORE_TLS_REJECT_UNAUTHORIZED !== true
        });

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
                agent: this.agent
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
                    ...(options.body ? { "Content-Type": "application/json" } : {}),
                    "Authorization": `Bearer ${this.token}`
                },
                agent: this.agent
            };

            const fullURL = `${this.URL}${route.startsWith("/") ? route : `/${route}`}`;
            return fetch(fullURL, modifiedOptions);
        };

        if (tokenPromise) {
            this.Classes = new ClassesModule({ promise: tokenPromise });
            this.Roles = new RolesModule({ promise: tokenPromise });
            this.Schools = new SchoolsModule({ promise: tokenPromise });
            this.Users = new UsersModule({ promise: tokenPromise });
            this.Workgroups = new workgroupsModule({ promise: tokenPromise });
            tokenPromise.then(() => {
                this.Classes.fetch = fetchWithAuthorization;
                this.Roles.fetch = fetchWithAuthorization;
                this.Schools.fetch = fetchWithAuthorization;
                this.Users.fetch = fetchWithAuthorization;
                this.Workgroups.fetch = fetchWithAuthorization;
            });
        } else {
            this.Classes = new ClassesModule({ fetch: fetchWithAuthorization });
            this.Roles = new RolesModule({ fetch: fetchWithAuthorization });
            this.Schools = new SchoolsModule({ fetch: fetchWithAuthorization });
            this.Users = new UsersModule({ fetch: fetchWithAuthorization });
            this.Workgroups = new workgroupsModule({ fetch: fetchWithAuthorization });
        }
    }
}
