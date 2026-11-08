import { Store } from './store';
import { Cache} from 'LAN';

export class RedisStore extends Store {
  private redis:typeof Cache;
  private appId: string;

  constructor(
        wechatConfig: { appId: string }
    ) {
        super();
        this.redis = Cache;
        this.appId = wechatConfig.appId;
    }

  async getGlobalToken() {
    const str = await this.redis.get(`access_token:${this.appId}`);
    return str ? JSON.parse(str) : null;
  }

  async updateGlobalToken(info: any) {
    await this.redis.set(
      `access_token:${this.appId}`,
      JSON.stringify(info),
      7000
    );
    return info;
  }
}
