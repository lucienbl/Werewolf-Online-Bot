import { Message, MessageEmbed, MessageAttachment } from 'discord.js';
import { UserManager, ClanManager } from '../../core';
import Command from '../Command';

class ClanCommand extends Command {
  constructor(message: Message) {
    super(message, {
      command: "clan",
      args: [
        {
          key: "parameter",
          description: "show/select",
          required: true
        },
        {
          key: "id",
          description: "Clan id."
        }
      ],
      description: "Clan command."
    });
  }

  handler = async () => {

    const userManager = new UserManager();
    const user = await userManager.getUserByDiscordId(this.message.author.id);

    if (this.argument("parameter").value == 'show') {
      const clan = (await ClanManager.findClanById(this.argument('id').value || user.selectedClan)).clan;
      const thumbnail = new MessageAttachment((await ClanManager.loadThumbnail(clan)), "thumbnail.png");

      const embed = new MessageEmbed()
      .attachFiles([thumbnail])
      .setImage("attachment://thumbnail.png")
      this.message.channel.send(embed);
    }

    if (this.argument("parameter").value == 'select') {
      const clan = (await ClanManager.findClanById(this.argument('id').value)).clan;
      user.selectedClan = clan.id;
      userManager.updateUser(user);
      
      this.message.channel.send("Clan selected, " + clan.name + " !");
    }

  }
}

export default ClanCommand;
