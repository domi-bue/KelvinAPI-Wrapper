export type ClassTypes = {
    dn?: string;
    url?: string;
    ucsschool_roles?: string[];
    udm_properties?: { [property: string]: any };
    name?: string;
    school?: string;
    description?: null;
    users?: string[];
    create_share?: boolean;
}

export type ModifyClassInput = Omit<ClassTypes, "school" | "create_share">
