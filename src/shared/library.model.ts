export interface LibrariesResp {
    Cells: Library;
    Number: number;
    global_id: number;
}

export interface ObjectAddress {
    Address: string;
    is_deleted: boolean;
    global_id: number;
    // ...
}

export interface Library {
    Category: string;
    CommonName: string;
    FullName: string;
    ShortName: string;
    ObjectAddress: ObjectAddress[];
    ChiefOrg: string;
    ChiefName: string;
    ChiefPosition: string;
    global_id: number;
    index: number;
    // ...
}