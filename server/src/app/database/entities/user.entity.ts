import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base-entities/base.entity";

@Entity({name: 'usr'})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;
    
    @PrimaryColumn({ unique: true })
    email: string;

    @Column({ nullable: true})
    firstname: string;

    @Column({ nullable: true})
    lastname: string;

    @Column({ nullable : true})
    password: string;

    @Column({default: true})
    isActive: boolean;
}