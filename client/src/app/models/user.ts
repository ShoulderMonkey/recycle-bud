import { RecycledItem } from "./recycled-item";

export interface User {
    email: string;
    firstname?: string;
    lastname?: string;
    password: string;
    isActive: boolean;
    recycledItems?: RecycledItem[];
}