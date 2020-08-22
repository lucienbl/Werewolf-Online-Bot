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

import { Message, GuildMember, User } from 'discord.js';
import Command from '../Command';
import { Permissions } from '../../core';

class BanCommand extends Command {
  constructor(message: Message) {
    super(message, {
      command: "ban",
      args: [
        {
          key: "user",
          description: "The user to ban.",
          required: true
        }
      ],
      permission: Permissions.BAN_MEMBERS,
      description: "Ban a user."
    })
  }

  handler = async () => {
    const member: GuildMember | User = this.message.guild.members.resolve(this.argument("user").value.match(/[0-9]+/g)[0]);
    if (!member) throw new Error("Unrecognized user !");

    await member.ban();

    await this.message.channel.send('Done !');
  }
}

export default BanCommand;