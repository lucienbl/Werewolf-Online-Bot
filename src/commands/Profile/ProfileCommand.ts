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
    let user = await userManager.getUserByDiscordId(member.id);

    if (!user) throw new Error(`This user does not exist in our database (${member.id}).`);

    await this.message.channel.send('```json\n' + JSON.stringify(user, null, 2) + '```');
  }
}

export default ProfileCommand;
