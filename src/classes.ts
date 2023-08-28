import BaseModule from "./baseModule.js";
import { ClassTypes, ModifyClassInput } from "./types/index.js";


export default class ClassesModule extends BaseModule {
    /**
     * Retrieve information for all classes associated with a school.
     * @param {string} school - The name of the school to retrieve class information for (case-sensitive)
     * @returns {Promise<ClassTypes[]>} A Promise that resolves to an array of ClassTypes objects, each representing a class's information
     */
    public async getAll(school: string): Promise<ClassTypes[]> {
        await this.waitForFetch();
        const resp = await this.fetch(`/ucsschool/kelvin/v1/classes/?school=${school}`);
        const data = await resp.json() as ClassTypes[];
        return data;
    }

    /**
     * Retrieve information for a class associated with a school by providing the class name.
     * @param {string} school - The name of the school where the class is located (case-sensitive)
     * @param {string} className - The name of the class to retrieve information for (case-sensitive)
     * @returns {Promise<ClassTypes>} A Promise that resolves to a ClassTypes object containing the class's information
     */
    public async get(school: string, className: string): Promise<ClassTypes> {
        await this.waitForFetch();
        const resp = await this.fetch(`/ucsschool/kelvin/v1/classes/${school}/${className}`);
        const data = await resp.json() as ClassTypes;
        return data;
    }

    /**
     * Search for classes based on the provided search options.
     * @param {string} school - The name of the school to search within (case-sensitive)
     * @param {string} query - The search query or criteria to filter the classes (supports wildcard, case-insensitive)
     * @returns {Promise<ClassTypes | ClassTypes[]>} A Promise that resolves to a single ClassTypes object or an array of ClassTypes objects
     */
    public async search(school: string, query: string): Promise<ClassTypes | ClassTypes[]> {
        await this.waitForFetch();
        const resp = await this.fetch(`/ucsschool/kelvin/v1/classes/?school=${school}&name=${query}`);
        const data = await resp.json() as ClassTypes | ClassTypes[];
        return data;
    }

    /**
     * Create a new class with the provided attributes.
     * @param {ClassTypes} _class - The class object containing the attributes of the new class
     * @returns {Promise<ClassTypes>} A Promise that resolves to the created ClassTypes object
     */
    public async create(_class: ClassTypes): Promise<ClassTypes> {
        await this.waitForFetch();
        const resp = await this.fetch("/ucsschool/kelvin/v1/classes/", {
            method: "POST",
            body: JSON.stringify(_class)
        });
        const data = await resp.json() as ClassTypes;
        return data;
    }

    /**
     * Update a class's attributes.
     * @param {string} school - The name of the school to which the class belongs (case-sensitive)
     * @param {string} className - The name of the class to be updated (case-sensitive)
     * @param {ModifyClassInput} _class - The class object containing the attributes to update
     * @returns {Promise<ClassTypes>} A Promise that resolves to the updated ClassTypes object
     */
    public async modify(school: string, className: string, _class: ModifyClassInput): Promise<ClassTypes> {
        await this.waitForFetch();
        const resp = await this.fetch(`/ucsschool/kelvin/v1/classes/${school}/${className}`, {
            method: "PATCH",
            body: JSON.stringify(_class)
        });
        const data = await resp.json() as ClassTypes;
        return data;
    }

    /**
     * Delete a class.
     * @param {string} school - The name of the school to which the class belongs (case-sensitive)
     * @param {string} className - The name of the class to be deleted (case-sensitive)
     * @returns {Promise<void>} A Promise that resolves when the class is deleted successfully
     */
    public async delete(school: string, className: string): Promise<void> {
        await this.waitForFetch();
        await this.fetch(`/ucsschool/kelvin/v1/classes/${school}/${className}`, {
            method: "DELETE"
        });
    }
}
