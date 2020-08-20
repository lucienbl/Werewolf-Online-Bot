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
import { UserManager } from '../../core';

class ProfileCommand extends Command {
  constructor(message: Message) {
    super(message, {
      command: "profile",
      args: [
        {
          key: "user",
          description: "The user to show the profile.",
        }
      ],
      description: "Shows a user profile."
    })
  }

  handler = async () => {
    const userManager = new UserManager();

    const member: GuildMember | User = this.argument("user").value ? this.message.guild.members.resolve(this.argument("user").value.match(/[0-9]+/g)[0]) : this.message.author;
    if (!member) throw new Error("Unrecognized user !");

    const user = userManager.getUserByDiscordId(member.id);
    if (!user) throw new Error(`This is user does not exist in our database (${member.id}).`);

    await this.message.channel.send(JSON.stringify(user));
  }
}

export default ProfileCommand;