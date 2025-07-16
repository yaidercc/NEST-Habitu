import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Identity } from "./identity.entity";


@Entity("goal")
export class Goal {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(
        () => User,
        user => user.goal

    )
    user: User;

    @OneToMany(
        () => Identity,
        identity => identity.goal
    )
    identity: Identity[];

    title: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;

}