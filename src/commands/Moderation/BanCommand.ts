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
      description: "Ban a user.",
      permission: Permissions.BAN_MEMBERS
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
