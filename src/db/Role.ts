import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class Role {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    discordRoleId: string;

    @Column()
    discordGuildId: string;

    @Column({ default: 0 })
    permissionInteger: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}
