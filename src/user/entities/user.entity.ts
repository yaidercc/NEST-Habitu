import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    last_name: string;

    @Column('text')
    email: string;

    @Column("text", { select: false })
    password: string

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
