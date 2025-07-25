import { Habit } from "src/habit/entities";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { HabitLogStatus } from "../enum/habitLogStatus";

@Entity("habitlog")
export class HabitLog {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(
        () => Habit,
        habit => habit.habitlog
    )
    habit: Habit;

    @ManyToOne(
        () => User,
        user => user.habitlog
    )
    user: User;

    @Column("date")
    date: Date;

    @Column({ type: "enum", enum: HabitLogStatus })
    status: HabitLogStatus

    @Column("text",{default: null})
    note?: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;
}