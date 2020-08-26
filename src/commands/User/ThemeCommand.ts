import { Message, MessageEmbed } from 'discord.js';
import Command from '../Command';
import { UserManager } from '../../core';

class ThemeCommand extends Command {
  constructor(message: Message) {
    super(message, {
      command: "theme",
      args: [
        {
          key: "parameter",
          description: "set/list",
        },
        {
          key: "name",
          description: "Theme name.",
        }
      ],
      description: "Theme command."
    })
  }

  handler = async () => {
    const userManager = new UserManager();
    let user = await userManager.getUserByDiscordId(this.message.author.id);
    const themes = ['default', 'wwo']

    if (this.argument("parameter").value == "set") {
      if (!themes.includes((this.argument("name").value))) throw new Error('Invalid theme.')
      user.theme = this.argument("name").value;
      userManager.updateUser(user);

      this.message.channel.send("Theme selected, " + user.theme + " !");
    }

    if (this.argument("parameter").value == "list") {
      console.log('hey')
      this.message.channel.send(new MessageEmbed({
        title: "Themes List",
        description:themes.map(theme => `• ${theme}${user.theme == theme ? ' (active)' : ''}`).join('\n')
      }))
    }
  }
}

export default ThemeCommand;
