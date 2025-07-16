import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Habit } from "./habit.entity";
import { Identity } from "src/user/entities/identity.entity";

@Entity("system")
export class System {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(
        () => Habit,
        habit => habit.system,
        { eager: true }
    )
    habit: Habit[];

    @OneToMany(
        () => Identity,
        identity => identity.system
    )
    identity: Identity[];

    @Column("text")
    description: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}