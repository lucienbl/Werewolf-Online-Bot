import { Message } from 'discord.js';
import { Permission, UserManager } from '../core';

interface Argument {
  key: string;
  value?: string;
  description: string;
  required?: boolean;
}

interface Options {
  command: string;
  args?: Argument[];
  permission?: number;
  description: string;
}

class Command {

  private _message: Message;
  private _options: Options;

  constructor(message: Message, options: Options) {
    this._message = message;
    this._options = options;
  }

  get message(): Message {
    return this._message;
  }

  get command(): string {
    return this._options.command;
  }

  get payload(): Argument[] {
    const { content } = this._message;

    return this._options.args.map(((arg, index) => {
      const parsedArgs = content.replace(process.env.BOT_PREFIX, "").split(" ").slice(1);
      arg.value = this._options.args.length === index + 1 ? parsedArgs.slice(index).join(" ") : parsedArgs[index];
      return arg;
    }));
  }

  argument = (key: string): Argument => {
    return this.payload.find(arg => arg.key === key);
  }

  get usage(): string {
    return `${process.env.BOT_PREFIX}${this._options.command}${this._options.args ? " " + this._options.args.map(arg => !arg.required ? `[${arg.key}]` : `<${arg.key}>`).join(' ') : ""}`;
  }

  get description(): string {
    return this._options.description;
  }

  get permission(): number {
    return this._options.permission;
  }

  handle = async () => {
    // Check if all the required arguments exists
    if (this._options.args) {
      for (const [index, arg] of this._options.args.entries()) {
        if (!this.payload[index].value && this.payload[index].required) {
          throw new Error(`Missing required argument : \`${arg.key}\` (${arg.description})\n\nUsage : \`${this.usage}\``);
        }
      }
    }

    // Check if user is allowed
    if (this._options.permission) {
      if (!await Permission.memberHasPermission(this._message.member, this._options.permission)) {
        throw new Error(`Missing Permission : ${this._options.permission}`);
      }
    }

    // Check if user is registered
    const userManager = new UserManager();
    const user = await userManager.getUserByDiscordId(this._message.author.id);
    if (!user) await userManager.registerUser(this._message.author.id);

    this._message.delete()
    return this.handler();
  }

  handler = async () => {
  }

}

export default Command;
