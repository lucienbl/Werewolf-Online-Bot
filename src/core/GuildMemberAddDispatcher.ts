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

import { GuildMember } from "discord.js";
import { Logger } from '../utils';
import { UserManager } from '.';

class GuildMemberAddDispatcher {

  static async dispatch(guildMember: GuildMember) {
    try {
      await new GuildMemberAddDispatcher(guildMember).parseAndDispatchGuildMemberAdd();
    } catch (e) {
      Logger.error(e.message);
    }
  }

  _guildMember: GuildMember;

  constructor(guildMember: GuildMember) {
    this._guildMember = guildMember;
  }

  private async parseAndDispatchGuildMemberAdd() {
    const userManager = new UserManager();
    
    await userManager.registerUser(this._guildMember.id);
  }
}

export default GuildMemberAddDispatcher;