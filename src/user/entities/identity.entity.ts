import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Goal } from "./goal.entity";
import { Habit } from "../../habit/entities/habit.entity";
import { User } from "./user.entity";
import { System } from "src/habit/entities/system.identity";


@Entity("identity")
export class Identity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToMany(
        () => Habit,
        habit => habit.identity
    )
    habit: Habit[];

    @ManyToOne(
        () => User,
        user => user.identity
    )
    user: User;

    @ManyToOne(
        () => Goal,
        goal => goal.identity
    )
    goal: Goal;

    @ManyToOne(
        () => System,
        system => system.identity
    )
    system: System;

    @Column("text")
    description: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;
}