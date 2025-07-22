import { Identity } from "src/identity/entities/identity.entity";
import { User } from "src/user/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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

    @Column("text",{
        unique: true
    })
    description: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    beforeUpdateAndInsert() {
        if (this.description) this.description = this.description.toLowerCase();
    }

}