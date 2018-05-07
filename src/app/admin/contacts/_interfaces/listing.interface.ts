import { IContact } from "./contact.interface";

export interface IListing {
    id: number;
    name: string;
    address: string;
    status: number | boolean;
    createdAt?: string;
    isMainAddressUsed?: boolean;
    contacts?: IContact;
    edit?: string;
    delete?: string;
    longtitude?: number;
    latitude?: number;
}
