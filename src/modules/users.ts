import { CreateUserInput, UserTypes } from "../types/index.js";
import BaseModule from "./baseModule.js";


export default class UsersModule extends BaseModule {
    /**
     * Retrieve information for all users.
     * @returns {Promise<UserTypes[]>} A Promise that resolves to an array of UserTypes objects, each representing a user's information
     */
    public async getAll(): Promise<UserTypes[]> {
        await this.waitForFetch();
        const resp = await this.fetch("/ucsschool/kelvin/v1/users/");
        const data = await resp.json() as UserTypes[];
        return data;
    }

    /**
     * Retrieve user information by providing the user's name.
     * @param {string} name - The name of the user to retrieve information for (case-insensitive)
     * @returns {Promise<UserTypes>} A Promise that resolves to a UserTypes object containing the user's information
     */
    public async get(name: string): Promise<UserTypes> {
        await this.waitForFetch();
        const resp = await this.fetch(`/ucsschool/kelvin/v1/users/${encodeURIComponent(name)}`);
        const data = await resp.json() as UserTypes;
        return data;
    }

    /**
     * Search for users based on the provided search options.
     * @param {UserTypes} searchOptions - The search criteria to filter the users (supports wildcard, case-insensitive)
     * @returns {Promise<UserTypes | UserTypes[]>} A Promise that resolves to a single UserTypes object or an array of UserTypes objects
     */
    public async search(searchOptions: UserTypes): Promise<UserTypes | UserTypes[]> {
        await this.waitForFetch();
        const searchParams = new URLSearchParams();
        Object.keys(searchOptions).forEach(key => searchParams.append(key, searchOptions[key]));
        const resp = await this.fetch(`/ucsschool/kelvin/v1/users/?${searchParams.toString()}`);
        const data = await resp.json() as UserTypes | UserTypes[];
        return data;
    }

    /**
     * Create a new user with the provided attributes.
     * @param {CreateUserInput} user - The user object containing the attributes of the new user
     * @returns {Promise<UserTypes>} A Promise that resolves to the created UserTypes object
     */
    public async create(user: CreateUserInput): Promise<UserTypes> {
        await this.waitForFetch();
        const resp = await this.fetch("/ucsschool/kelvin/v1/users/", {
            method: "POST",
            body: JSON.stringify(user)
        });
        const data = await resp.json() as UserTypes;
        return data;
    }

    /**
     * Update a user's attributes. Only the provided fields will be updated or added, deletions are not supported.
     * @param {string} name - The username of the user to be updated
     * @param {UserTypes} user - The user object containing the attributes to be updated or added
     * @returns {Promise<UserTypes>} A Promise that resolves to the updated UserTypes object
     */
    public async update(name: string, user: UserTypes & { password?: string }): Promise<UserTypes> {
        await this.waitForFetch();
        const resp = await this.fetch(`/ucsschool/kelvin/v1/users/${encodeURIComponent(name)}`, {
            method: "PATCH",
            body: JSON.stringify(user)
        });
        const data = await resp.json() as UserTypes;
        return data;
    }

    /**
     * Modify a user's attributes. All specified fields will be updated, and fields not provided will be deleted.
     * @param {string} name - The username of the user to be modified
     * @param {UserTypes} user - The updated user object containing the attributes to be modified
     * @returns {Promise<UserTypes>} A Promise that resolves to the updated UserTypes object
     */
    public async modify(name: string, user: CreateUserInput): Promise<UserTypes> {
        await this.waitForFetch();
        const resp = await this.fetch(`/ucsschool/kelvin/v1/users/${encodeURIComponent(name)}`, {
            method: "PUT",
            body: JSON.stringify(user)
        });
        const data = await resp.json() as UserTypes;
        return data;
    }

    /**
     * Delete a user.
     * @param {string} name - The username of the user to be deleted
     * @returns {Promise<void>} A Promise that resolves when the user is deleted successfully
     */
    public async delete(name: string): Promise<void> {
        await this.waitForFetch();
        await this.fetch(`/ucsschool/kelvin/v1/users/${encodeURIComponent(name)}`, {
            method: "DELETE"
        });
    }
}
