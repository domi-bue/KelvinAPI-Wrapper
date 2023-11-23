import { RoleTypes } from "../types/index.js";
import BaseModule from "./baseModule.js";


export default class RolesModule extends BaseModule {
    /**
     * Retrieve information for all roles.
     * @returns {Promise<RoleTypes[]>} A Promise that resolves to an array of RoleTypes objects, each representing a role's information
     */
    public async getAll(): Promise<RoleTypes[]> {
        await this.waitForFetch();
        const resp = await this.fetch("/ucsrole/kelvin/v1/roles/");
        const data = await resp.json() as RoleTypes[];
        return data;
    }

    /**
     * Retrieve role information by providing the role's name.
     * @param {string} name - The name of the role to retrieve information for (case-insensitive)
     * @returns {Promise<RoleTypes>} A Promise that resolves to a RoleTypes object containing the role's information
     */
    public async get(name: string): Promise<RoleTypes> {
        await this.waitForFetch();
        const resp = await this.fetch(`/ucsrole/kelvin/v1/roles/${encodeURIComponent(name)}`);
        const data = await resp.json() as RoleTypes;
        return data;
    }

    /**
     * Search for roles based on the provided search options.
     * @param {RoleTypes} searchOptions - The search criteria to filter the roles (supports wildcard, case-insensitive)
     * @returns {Promise<RoleTypes | RoleTypes[]>} A Promise that resolves to a single RoleTypes object or an array of RoleTypes objects
     */
    public async search(searchOptions: RoleTypes): Promise<RoleTypes | RoleTypes[]> {
        await this.waitForFetch();
        const searchParams = new URLSearchParams();
        Object.keys(searchOptions).forEach(key => searchParams.append(key, searchOptions[key]));
        const resp = await this.fetch(`/ucsrole/kelvin/v1/roles/?${searchParams.toString()}`);
        const data = await resp.json() as RoleTypes | RoleTypes[];
        return data;
    }
}
