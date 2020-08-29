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

import { Repository, Connection } from "typeorm";
import { container } from 'tsyringe';
import { Role } from '../db';

class RoleManager {

  private _roleRepository: Repository<Role>;

  constructor() {
    this._roleRepository = container.resolve(Connection).getRepository(Role);
  }

  updateDiscordRole = (role: Role) => {
    return this._roleRepository.save(role);
  }

  getRoleByDiscordId = (discordRoleId: string): Promise<Role> => {
    return this._roleRepository.findOne({ where: { discordRoleId } });
  }

  getAllByGuild = (discordGuildId: string): Promise<Role[]> => {
    return this._roleRepository.find({ where: { discordGuildId } });
  }
}

export default RoleManager;
