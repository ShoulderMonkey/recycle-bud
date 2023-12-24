import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum GarbageType{
    glass = 'glass',
    plastic = 'pastic',
    paper = 'paper'
}

@Entity()
export class RecycledItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: 1}) quantity: number;
    @Column({nullable: true}) description: string;

    @Column({ 
        type: 'enum',
        enum: GarbageType,
        nullable: false
    })type: GarbageType

    @ManyToOne(() => User, (user) => user.recycledItems, {eager : true})
    @JoinColumn()
    user?: User
}

