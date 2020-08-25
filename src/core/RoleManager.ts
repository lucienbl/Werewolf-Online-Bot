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
