import { Store } from './store';
import { Cache} from 'LAN';

/**
 * RedisStore 类定义，常规流程由内部模块实例化。
 *
 * 备注：异常场景下返回空值，调用方需做兜底
 */
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

// NOTE: 异常分支统一由上层捕获。
