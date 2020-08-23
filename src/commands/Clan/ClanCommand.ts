import { Message, MessageEmbed, MessageAttachment } from 'discord.js';
import { ClanManager } from '../../core';
import Command from '../Command';

class ClanCommand extends Command {
  constructor(message: Message) {
    super(message, {
      command: "clan",
      args: [
        {
          key: "parameter",
          description: "Parameter.",
          required: true
        },
        {
          key: "id",
          description: "Clan id.",
          required: true
        }
      ],
      description: "Clan command."
    });
  }

  handler = async () => {

    if (this.argument("parameter").value == 'show') {
      const clan = (await ClanManager.findClanById(this.argument("id").value)).clan;
      const thumbnail = new MessageAttachment((await ClanManager.loadThumbnail(clan)), "thumbnail.png");

      const embed = new MessageEmbed()
      .attachFiles([thumbnail])
      .setTitle(clan.tag + ' | ' + clan.name)
      .setImage("attachment://thumbnail.png")


      this.message.channel.send(embed);
    }

  }
}

export default ClanCommand;
