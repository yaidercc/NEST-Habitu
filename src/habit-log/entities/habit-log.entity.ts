import { Habit } from "src/habit/entities";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
        () => Habit,
        user => user.habitlog
    )
    user: HabitLog;
}