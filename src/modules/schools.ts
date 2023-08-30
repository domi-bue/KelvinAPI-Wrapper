import { CreateSchoolInput, SchoolTypes } from "../types/index.js";
import BaseModule from "./baseModule.js";


export default class SchoolsModule extends BaseModule {
    /**
     * Retrieve information for all schools.
     * @returns {Promise<SchoolTypes[]>} A Promise that resolves to an array of SchoolTypes objects, each representing a school's information
     */
    public async getAll(): Promise<SchoolTypes[]> {
        await this.waitForFetch();
        const resp = await this.fetch("/ucsschool/kelvin/v1/schools/");
        const data = await resp.json() as SchoolTypes[];
        return data;
    }

    /**
     * Retrieve school information by providing the school's name.
     * @param {string} name - The name of the school to retrieve information for (case-insensitive)
     * @returns {Promise<SchoolTypes>} A Promise that resolves to a SchoolTypes object containing the school's information
     */
    public async get(name: string): Promise<SchoolTypes> {
        await this.waitForFetch();
        const resp = await this.fetch(`/ucsschool/kelvin/v1/schools/${name}`);
        const data = await resp.json() as SchoolTypes;
        return data;
    }

    /**
     * Search for schools based on the provided search options.
     * @param {SchoolTypes} searchOptions - The search criteria to filter the schools (supports wildcard, case-insensitive)
     * @returns {Promise<SchoolTypes | SchoolTypes[]>} A Promise that resolves to a single SchoolTypes object or an array of SchoolTypes objects
     */
    public async search(searchOptions: SchoolTypes): Promise<SchoolTypes | SchoolTypes[]> {
        await this.waitForFetch();
        const searchParams = new URLSearchParams();
        Object.keys(searchOptions).forEach(key => searchParams.append(key, searchOptions[key]));
        const resp = await this.fetch(`/ucsschool/kelvin/v1/schools/?${searchParams.toString()}`);
        const data = await resp.json() as SchoolTypes | SchoolTypes[];
        return data;
    }

    /**
     * Create a new school with the provided attributes.
     * @param {CreateSchoolInput} school - The school object containing the attributes of the new school
     * @returns {Promise<SchoolTypes>} A Promise that resolves to the created SchoolTypes object
     */
    public async create(school: CreateSchoolInput): Promise<SchoolTypes> {
        await this.waitForFetch();
        const resp = await this.fetch("/ucsschool/kelvin/v1/schools/", {
            method: "POST",
            body: JSON.stringify(school)
        });
        const data = await resp.json() as SchoolTypes;
        return data;
    }
}
