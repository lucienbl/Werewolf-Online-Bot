import { Message, Role as DiscordRole } from 'discord.js';
import Command from '../Command';
import { RoleManager, Permission, Permissions } from '../../core';
import { Role } from '../../db';

class AddRolePermissionCommand extends Command {
  constructor(message: Message) {
    super(message, {
      command: "add-role-permission",
      args: [
        {
          key: "role",
          description: "The role to add a permission.",
          required: true
        },
        {
          key: "permission",
          description: "The permission to add to the role.",
          required: true
        }
      ],
      description: "Add a permission to a role.",
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
    role.permissionInteger = Permission.addPermission(role.permissionInteger, parseInt(this.argument("permission").value));
    role.discordGuildId = discordRole.guild.id;
    await roleManager.updateDiscordRole(role);

    await this.message.channel.send('Done !');
  }
}

export default AddRolePermissionCommand;
