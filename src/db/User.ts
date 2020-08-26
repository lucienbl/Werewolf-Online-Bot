import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    discordUserId: string;

    @Column()
    selectedClan: string;

    @Column()
    theme: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}
