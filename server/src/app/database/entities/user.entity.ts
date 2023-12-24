import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entities/base.entity";
import { RecycledItem } from "./recycled-item.entity";

@Entity({name: 'usr'})
export class User extends BaseEntity {
    
    @PrimaryColumn()
    email: string;

    @Column({ nullable: true})
    firstname?: string;

    @Column({ nullable: true})
    lastname?: string;

    @Column({ nullable : true})
    password: string;

    @Column({default: true})
    isActive: boolean;

    @OneToMany(() => RecycledItem, (recycledItem) => recycledItem.user, {nullable: true})
    recycledItems?: RecycledItem[];
}