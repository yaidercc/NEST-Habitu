import { Habit } from "src/habit/entities";
import { Identity } from "src/identity/entities/identity.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Index()
    @Column("text", { unique: true })
    description: string;

    @Column("bool", { default: false })
    is_custom: boolean;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    @BeforeUpdate()
    beforeUpdateAndInsert(){
        if(this.description) this.description = this.description.toLowerCase();
    }
}