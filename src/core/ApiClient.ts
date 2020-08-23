import { superagent } from "../utils";

class ApiClient {

  static getClan(clanId: string): Promise<any> {
    return superagent
      .get(`${this._getBaseUrl()}/clan/${clanId}`)
      .then(res => res.body);
  }

  private static _getBaseUrl() {
    return process.env.API_BASE_URL;
  }
}

export default ApiClient;
