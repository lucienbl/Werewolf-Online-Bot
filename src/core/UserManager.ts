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
import { User } from '../db';

class UserManager {

  private _userRepository: Repository<User>;

  constructor() {
    this._userRepository = container.resolve(Connection).getRepository(User);
  }

  registerUser = (discordUserId: string): Promise<User> => {
    const user = new User();
    user.discordUserId = discordUserId;

    return this._userRepository.save(user);
  }

  getUserByDiscordId = (discordUserId: string): Promise<User> => {
    return this._userRepository.findOne({ where: { discordUserId } });
  }
  
}

export default UserManager;