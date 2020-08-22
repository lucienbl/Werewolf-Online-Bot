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
import { Permissions } from '../../core';

class PermissionsCommand extends Command {
  constructor(message: Message) {
    super(message, {
      command: "permissions",
      description: "Show all permission flags."
    })
  }

  handler = async () => {
    await this.message.channel.send(new MessageEmbed({
      title: "Permission Flags",
      description: Object.keys(Permissions).filter(key => key !== 'default').sort((a, b) => Permissions[a] < Permissions[b] ? 1 : -1).map(key => `• ${key} : \`${Permissions[key]}\``).join('\n')
    }));
  }
}

export default PermissionsCommand;