import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { HabitLog } from "src/habit-log/entities/habit-log.entity";
import { CustomDay, FrequencyType } from "../enum/frequency-type";
import { Identity } from "src/identity/entities/identity.entity";
import { System } from "src/system/entities/system.entity";

@Entity("habits")
export class Habit {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text", { unique: true })
    @Index()
    description: string;

    @ManyToOne(
        () => System,
        system => system.habit
    )
    system: System;

    @Column("boolean", {
        default: false
    })
    is_custom: boolean;

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

    @Column({ type: 'enum', enum: FrequencyType })
    frequency_type: FrequencyType;

    // @Column({ type: 'enum', enum: CustomDay, array: true, nullable: true })
    // custom_days?: CustomDay[]

    @Column("int", { nullable: true })
    frequency_target: number;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
