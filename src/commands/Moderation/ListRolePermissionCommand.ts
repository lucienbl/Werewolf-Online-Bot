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

import { Message, MessageEmbed } from 'discord.js';
import Command from '../Command';
import { RoleManager } from '../../core';

class ListRolePermissionCommand extends Command {
  constructor(message: Message) {
    super(message, {
      command: "list-role-permission",
      description: "List role permissions."
    });
  }

  handler = async () => {
    // TODO restrict command usage

    const roleManager = new RoleManager();

    const rolePermissions = await roleManager.getAllByGuild(this.message.guild.id);
    this.message.channel.send(new MessageEmbed({
      title: "Role Permissions",
      description: rolePermissions.length > 0 ? rolePermissions.map(rolePermission => `• <@&${rolePermission.discordRoleId}> : ${rolePermission.permissionInteger}`).join('\n') : "None"
    }));
  }
}

export default ListRolePermissionCommand;