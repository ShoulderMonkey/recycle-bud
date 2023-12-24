import { GarbageType } from "./enums/garbage-type";
import { User } from "./user";

export interface RecycledItem{
    id: number
    quantity: number;
    description: string;
    type: GarbageType;
    user?: User
}