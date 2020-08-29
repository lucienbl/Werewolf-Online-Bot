/*
 *   Copyright (c) 2020 Lucien Blunk-Lallet

 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.

 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.

 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class Role {

    @PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @Column({ unique: true })
    public discordRoleId: string;

    @Column()
    public discordGuildId: string;

    private _permissionInteger: number;

    @Column({ default: 0 })
    public get permissionInteger(): number { return this._permissionInteger; }
    public set permissionInteger(permissionInteger: number) { this._permissionInteger = permissionInteger; }
    public addPermission(permission: number) { this._permissionInteger = this._permissionInteger | permission; }
    public removePermission(permission: number) { this._permissionInteger = this._permissionInteger ^ permission; }

    @UpdateDateColumn()
    public updatedAt: Date;

    @CreateDateColumn()
    public createdAt: Date;
}
