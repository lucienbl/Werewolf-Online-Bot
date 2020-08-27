import { Message, MessageEmbed } from "discord.js";
import * as Commands from "../commands";
import Command from '../commands/Command';

class MessageDispatcher {

  static async dispatch(message: Message) {
    try {
      await new MessageDispatcher(message).parseAndDispatchMessage();
    } catch (e) {
      message.channel.send(new MessageEmbed({
        title: "An error occurred",
        color: "#F52244",
        description: e.message
      }));
    }
  }

  _message: Message;

  constructor(message: Message) {
    this._message = message;
  }

  private async parseAndDispatchMessage() {
    const { content } = this._message;

    if (!content.startsWith(process.env.BOT_PREFIX)) return;

    const command = content.split(" ")[0].replace(process.env.BOT_PREFIX, "");

    if (command === "help") {
      this._message.delete()
      return this._message.channel.send(new MessageEmbed({
        title: "List of all the commands",
        description: Object.keys(Commands).map(key => {
          const cmd: Command = new Commands[key](this._message);
          return cmd.permission ? '' : `• \`${cmd.usage}\` : ${cmd.description}`
        }).join('\n').replace(/^\s*[\r\n]/gm, "")
      }).setFooter("<required>, [optional]"));
    }

    for (const key of Object.keys(Commands)) {
      const cmd = new Commands[key](this._message);
      if (cmd.command === command) {
        return cmd.handle();
      }
    }
  }
}

export default MessageDispatcher;
