import { Message, MessageEmbed } from 'discord.js';
import Command from '../Command';
import { Permissions } from '../../core';

class PermissionsCommand extends Command {
  constructor(message: Message) {
    super(message, {
      command: "permissions",
      description: "Show all permission flags.",
      permission: Permissions.MANAGE_PERMISSIONS
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
