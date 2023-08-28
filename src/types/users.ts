export type UserTypes = {
    dn?: string;
    url?: URL;
    ucsschool_roles?: string[];
    name?: string;
    school?: string;
    firstname?: string;
    lastname?: string;
    birthday?: Date;
    disabled?: boolean;
    email?: string;
    expiration_date?: string;
    record_uid?: string;
    roles?: string[];
    schools?: string[];
    school_classes?: { [school: string]: string[] };
    workgroups?: { [school: string]: string[] };
    source_uid?: string;
    udm_properties?: { [property: string]: any };
}

export type CreateUserInput = Omit<UserTypes, "name" | "firstname" | "lastname" | "record_uid" | "roles" | "school" | "schools" | "source_uid"> & {
    name: string;
    firstname: string;
    lastname: string;
    record_uid: string;
    roles: string[];
    source_uid: string;
    password?: string;
} & ({ school: string } | { schools: string[] });
