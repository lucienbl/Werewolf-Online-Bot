import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    discordUserId: string;

    @Column()
    selectedClan: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}
