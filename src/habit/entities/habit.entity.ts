import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { System } from "./system.identity";
import { Identity } from "src/user/entities/identity.entity";
import { HabitLog } from "src/habit-log/entities/habit-log.entity";
 
@Entity("habits")
export class Habit {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    description: string;


    @ManyToOne(
        () => System,
        system => system.habit
    )
    system: System;

    @OneToMany(
        () => HabitLog,
        habitlog => habitlog.habit
    )
    habitlog: HabitLog[];

    @ManyToOne(
        () => Identity,
        identity => identity.habit
    )
    identity: Identity;

    // fercuency;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
