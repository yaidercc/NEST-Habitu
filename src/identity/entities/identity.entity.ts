import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Habit } from "../../habit/entities/habit.entity";
import { User } from "src/user/entities/user.entity";
import { Goal } from "src/goal/entities/goal.entity";
import { System } from "src/system/entities/system.entity";


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