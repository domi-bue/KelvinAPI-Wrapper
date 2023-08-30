export type WorkgroupTypes = {
    dn?: string;
    url?: URL;
    ucsschool_roles?: string[];
    udm_properties?: { [property: string]: any };
    name?: string;
    school?: URL;
    description?: null | string;
    users?: URL[];
    create_share?: boolean;
    email?: string;
    allowed_email_senders_users?: string[];
    allowed_email_senders_groups?: string[];
}

export type CreateWorkgroupInput = Omit<WorkgroupTypes, "name" | "school"> & {
    name: string;
    school: URL;
};

export type ModifyWorkgroupInput = Omit<WorkgroupTypes, "school" | "create_share">;
