import { CreateWorkgroupInput, ModifyWorkgroupInput, WorkgroupTypes } from "../types/index.js";
import BaseModule from "./baseModule.js";


export default class workgroupsModule extends BaseModule {
    /**
     * Retrieve information for all workgroups.
     * @returns {Promise<WorkgroupTypes[]>} A Promise that resolves to an array of WorkgroupTypes objects, each representing a workgroup's information
     */
    public async getAll(): Promise<WorkgroupTypes[]> {
        await this.waitForFetch();
        const resp = await this.fetch("/ucsschool/kelvin/v1/workgroups/");
        const data = await resp.json() as WorkgroupTypes[];
        return data;
    }

    /**
     * Retrieve workgroup information by providing the workgroup's name.
     * @param {string} name - The name of the workgroup to retrieve information for (case-insensitive)
     * @returns {Promise<WorkgroupTypes>} A Promise that resolves to a WorkgroupTypes object containing the workgroup's information
     */
    public async get(name: string): Promise<WorkgroupTypes> {
        await this.waitForFetch();
        const resp = await this.fetch(`/ucsschool/kelvin/v1/workgroups/${encodeURIComponent(name)}`);
        const data = await resp.json() as WorkgroupTypes;
        return data;
    }

    /**
     * Search for workgroups based on the provided search options.
     * @param {WorkgroupTypes} searchOptions - The search criteria to filter the workgroups (supports wildcard, case-insensitive)
     * @returns {Promise<WorkgroupTypes | WorkgroupTypes[]>} A Promise that resolves to a single WorkgroupTypes object or an array of WorkgroupTypes objects
     */
    public async search(searchOptions: WorkgroupTypes): Promise<WorkgroupTypes | WorkgroupTypes[]> {
        await this.waitForFetch();
        const searchParams = new URLSearchParams();
        Object.keys(searchOptions).forEach(key => searchParams.append(key, searchOptions[key]));
        const resp = await this.fetch(`/ucsschool/kelvin/v1/workgroups/?${searchParams.toString()}`);
        const data = await resp.json() as WorkgroupTypes | WorkgroupTypes[];
        return data;
    }

    /**
     * Create a new workgroup with the provided attributes.
     * @param {CreateWorkgroupInput} workgroup - The workgroup object containing the attributes of the new workgroup
     * @returns {Promise<WorkgroupTypes>} A Promise that resolves to the created WorkgroupTypes object
     */
    public async create(workgroup: CreateWorkgroupInput): Promise<WorkgroupTypes> {
        await this.waitForFetch();
        const resp = await this.fetch("/ucsschool/kelvin/v1/workgroups/", {
            method: "POST",
            body: JSON.stringify(workgroup)
        });
        const data = await resp.json() as WorkgroupTypes;
        return data;
    }

    /**
     * Modify a workgroup's attributes.
     * @param {string} name - The workgroupname of the workgroup to be modified
     * @param {ModifyWorkgroupInput} workgroup - The updated workgroup object containing the attributes to be modified
     * @returns {Promise<WorkgroupTypes>} A Promise that resolves to the updated WorkgroupTypes object
     */
    public async modify(name: string, workgroup: ModifyWorkgroupInput): Promise<WorkgroupTypes> {
        await this.waitForFetch();
        const resp = await this.fetch(`/ucsschool/kelvin/v1/workgroups/${encodeURIComponent(name)}`, {
            method: "PATCH",
            body: JSON.stringify(workgroup)
        });
        const data = await resp.json() as WorkgroupTypes;
        return data;
    }

    /**
     * Delete a workgroup.
     * @param {string} name - The workgroupname of the workgroup to be deleted
     * @returns {Promise<void>} A Promise that resolves when the workgroup is deleted successfully
     */
    public async delete(name: string): Promise<void> {
        await this.waitForFetch();
        await this.fetch(`/ucsschool/kelvin/v1/workgroups/${encodeURIComponent(name)}`, {
            method: "DELETE"
        });
    }
}
