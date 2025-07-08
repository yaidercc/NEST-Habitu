import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    last_name:string;

    @Column('text')
    email: string;

    @Column("text")
    password: string
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    checkBeforeInsertOrUpdate(){
        if(this.name) this.name = this.name.toLowerCase()
        if(this.last_name) this.last_name = this.last_name.toLowerCase()
    }
}
