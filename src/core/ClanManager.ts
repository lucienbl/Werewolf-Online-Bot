import ApiClient from "./ApiClient";
//import { countryToEmoji } from "../utils"
import { registerFont, createCanvas, loadImage } from 'canvas';

class ClanManager {

  static async findClanById(clanId: string): Promise<any> {
    return ApiClient.getClan(clanId);
  }

  static async loadThumbnail(clan) {
    const canvas = createCanvas(400, 130);
    const ctx = canvas.getContext("2d")
    const bg = await loadImage('https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero-00e10b1f.jpg')
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    return canvas.toBuffer()
  }

}

export default ClanManager;
