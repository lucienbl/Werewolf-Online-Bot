import { Message } from 'discord.js';
import { inspect } from 'util';
import Command from '../Command';
import { Permissions } from '../../core';

class EvaluateCommand extends Command {
  constructor(message: Message) {
    super(message, {
      command: "evaluate",
      args: [
        {
          key: "evaluation",
          description: "Lines to evaluate.",
          required: true
        }
      ],
      description: "Evaluate something.",
      permission: Permissions.EVALUATE
    })
  }

  handler = async () => {
    try {
      let evaluation = await eval(this.argument("evaluation").value);
      this.message.channel.send(inspect(evaluation));
    }
    catch (e) {
      throw new Error("There was an error during evaluation.\n" + e);
    }
  }
}

export default EvaluateCommand;
