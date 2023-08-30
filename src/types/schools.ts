export type SchoolTypes = {
    dn?: string;
    url?: URL;
    ucsschool_roles?: string[];
    name?: string;
    display_name?: string;
    educational_servers?: string[];
    administrative_servers?: string[];
    class_share_file_server?: string;
    home_share_file_server?: string;
    udm_properties?: { [property: string]: any };
}

export type CreateSchoolInput = Omit<SchoolTypes, "name" | "display_name"> & {
    name: string;
    display_name?: string;
};
