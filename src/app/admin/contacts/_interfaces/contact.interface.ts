export interface IContact {
    name: string;
    address: string;
    status: number | boolean;
    longtitude?: number;
    latitude?: number;
    isMainAddress?: boolean;
}
