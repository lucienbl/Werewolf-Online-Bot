import ApiClient from "./ApiClient";
import { createCanvas, loadImage, registerFont } from 'canvas';
import { CanvasEmoji } from 'canvas-emoji'

class ClanManager {

  static async findClanById(clanId: string): Promise<any> {
    return ApiClient.getClan(clanId);
  }

  static async loadThumbnail(clan, user) {
    const canvas = createCanvas(400, 130);
    const ctx = canvas.getContext("2d");

    const emoji = new CanvasEmoji(ctx);
    registerFont("./src/data/fonts/Roboto-Bold.ttf", { family: "Bold" });

    const background = await loadImage(`https://www.beautycolorcode.com/${user.theme == "wwo" ? 'F83F7D' : 'EEEEEE'}.png`);
    const flag = await loadImage(`./src/data/flags/fr.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(flag, 360, 10, 30, 20);

    emoji.drawPngReplaceEmoji({text:clan.tag + ' | ' + clan.name, fillStyle: user.theme == "wwo" ? '#ffffff' : '#000000', font: "17px Bold", x:20, y:35, emojiW:25, emojiH:25, length:100})
    ctx.font = "12px Bold";
    ctx.textAlign = "center";
    ctx.fillText('50/50', 375, 45);
    ctx.font = "15px Bold";
    ctx.textAlign = "start";
    ctx.fillText('XP: 12 345 578xp', 20, 70);
    ctx.fillText('Creation: ' + new Date(clan.creationTime).toLocaleDateString('EN'), 20, 90);
    ctx.fillText('Leader: ' + 'LouveBlanche', 20, 110);
    ctx.fillText('Invitation only', 200, 70);
    ctx.fillText('Quests: ' + '104', 200, 90);
    ctx.fillText('Co-leaders: ' + '1', 200, 110);

    return canvas.toBuffer()
  }

}

export default ClanManager;
