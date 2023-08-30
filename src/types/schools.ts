export type SchoolTypes = {
    dn?: string;
    url?: URL;
    ucsschool_roles?: string[];
    udm_properties?: { [property: string]: any };
    name?: string;
    school?: URL;
    description?: null;
    users?: URL[];
    create_share?: boolean;
}

export type CreateSchoolInput = Omit<SchoolTypes, "name" | "display_name"> & {
    name: string;
    display_name?: string;
};
