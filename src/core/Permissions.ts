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

import { GuildMember } from 'discord.js';
import { Repository, Connection } from 'typeorm';
import { Role } from '../db';
import { container } from 'tsyringe';

// permission bitfields come here
export const BAN_MEMBERS = 0x00000001;
export const EVALUATE    = 0x00000010;

class Permission {
  static async memberHasPermission(member: GuildMember, permission: number) {
    return new Permission()._memberHasPermission(member, permission);
  }

  static addPermission(previousPermissionInteger: number = 0, permissionToAdd: number) {
    return previousPermissionInteger | permissionToAdd;
  }

  static removePermission(previousPermissionInteger: number = 0, permissionToRemove: number) {
    return previousPermissionInteger ^ permissionToRemove;
  }

  _roleRepository: Repository<Role>;

  constructor() {
    this._roleRepository = container.resolve(Connection).getRepository(Role);
  }

  private _memberHasPermission = async (member: GuildMember, permission: number): Promise<boolean> => {
    let isAllowed = false;
    for (const discordRole of member.roles.cache.array()) {
      const role = await this._roleRepository.findOne({ where: { discordRoleId: discordRole.id } });
      if (role) {
        isAllowed = this._has(role.permissionInteger, permission);
      }

      if (isAllowed) break;
    }

    return isAllowed;
  }

  private _has = (permissionInteger: number, permission: number): boolean => {
    return (permissionInteger & permission) === permission;
  }
}

export default Permission;
