
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Habit } from "src/habit/entities";
import { HabitLog } from "src/habit-log/entities/habit-log.entity";
import { Goal } from "src/goal/entities/goal.entity";
import { Identity } from "src/identity/entities/identity.entity";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column('text')
    name: string;

    @Index()
    @Column('text')
    last_name: string;

    @Index()
    @Column('text')
    email: string;

    @Column("text", { select: false })
    password: string

    @OneToMany(
        () => HabitLog,
        habitlog => habitlog.user,
    )
    habitlog: HabitLog;

    @OneToMany(
        ()=> Goal,
        goal => goal.user
    )
    goal: Goal[];

    @OneToMany(
        ()=> Identity,
        identity => identity.user
    )
    identity: Identity[];

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;


    @BeforeInsert()
    checkBeforeInsertOrUpdate() {
        if (this.name) this.name = this.name.toLowerCase()
        if (this.last_name) this.last_name = this.last_name.toLowerCase()
    }
}
