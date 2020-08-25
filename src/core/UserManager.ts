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
    user.selectedClan = '';

    return this._userRepository.save(user);
  }

  updateUser = (user: User) => {
    return this._userRepository.save(user);
  }

  getUserByDiscordId = (discordUserId: string): Promise<User> => {
    return this._userRepository.findOne({ where: { discordUserId } });
  }

}

export default UserManager;
