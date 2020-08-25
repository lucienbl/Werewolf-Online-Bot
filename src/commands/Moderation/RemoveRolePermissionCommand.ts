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

import { Message, Role as DiscordRole } from 'discord.js';
import Command from '../Command';
import { RoleManager, Permission, Permissions } from '../../core';
import { Role } from '../../db';

class RemoveRolePermissionCommand extends Command {
  constructor(message: Message) {
    super(message, {
      command: "remove-role-permission",
      args: [
        {
          key: "role",
          description: "The role to remove a permission.",
          required: true
        },
        {
          key: "permission",
          description: "The permission to remove to the role.",
          required: true
        }
      ],
      description: "Remove a permission to a role.",
      permission: Permissions.MANAGE_PERMISSIONS
    });
  }

  handler = async () => {
    const roleManager = new RoleManager();

    if (isNaN(parseInt(this.argument("permission").value))) throw new Error("Permission should be an integer !");

    const discordRole: DiscordRole = this.message.guild.roles.resolve(this.argument("role").value.match(/[0-9]+/g)[0]);
    if (!discordRole) throw new Error("Unrecognized role !");

    const role = await roleManager.getRoleByDiscordId(discordRole.id) || new Role();
    role.discordRoleId = discordRole.id;
    role.permissionInteger = Permission.removePermission(role.permissionInteger, parseInt(this.argument("permission").value));
    await roleManager.updateDiscordRole(role);

    await this.message.channel.send('Done !');
  }
}

export default RemoveRolePermissionCommand;
