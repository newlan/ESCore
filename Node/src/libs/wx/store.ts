import { EventEmitter } from 'events';

export interface GlobalToken {
  count?: number;
  modifyDate?: string | Date;
  accessToken?: string;
  jsapi_ticket?: string;
}

export interface Signature {
  url: string;
  signature: string;
  nonceStr: string;
  timestamp: string;
  accessToken?: string;
  signatureName?: string;
  createDate?: Date;
  modifyDate?: Date;
  [key: string]: any;
}

export interface StoreData {
  wechatConfig: Record<string, any>;
  globalToken: GlobalToken;
  urls: Record<string, Signature>;
  oauth: Record<string, any>;
  card: Record<string, any>;
  mp: Record<string, any>;
}

/**
 * Store 类定义，常规流程由内部模块实例化。
 *
 * 备注：历史兼容逻辑，调整前请确认旧数据
 */
export class Store extends EventEmitter {
  store: StoreData;
  wechatInterval: NodeJS.Timeout | undefined;

  constructor(options: { noInterval?: boolean; interval?: number } = {}) {
    super();

    this.store = {
      wechatConfig: {},
      globalToken: { count: 0 },
      urls: {},
      oauth: {},
      card: {},
      mp: {},
    };

    if (!options.noInterval) {
      this.wechatInterval = setInterval(
        () => this.flush(),
        options.interval || 1000 * 60 * 10
      );
    }
  }

  getGlobalToken(): Promise<GlobalToken> {
    return Promise.resolve(this.store.globalToken);
  }

  updateGlobalToken(info: Partial<GlobalToken>): Promise<GlobalToken> {
    const newToken = { ...this.store.globalToken, ...info };
    newToken.count = (newToken.count || 0) + 1;
    this.store.globalToken = newToken;
    this.flush();
    return Promise.resolve(newToken);
  }

  getSignature(url: string): Promise<Signature | undefined> {
    return Promise.resolve(this.store.urls[url]);
  }

  saveSignature(url: string, signatureInfo: Signature): Promise<Signature> {
    signatureInfo.updated = true;
    this.store.urls[url] = signatureInfo;
    return Promise.resolve(signatureInfo);
  }

  updateSignature(url: string, newInfo: Partial<Signature>): Promise<Signature> {
    newInfo.updated = true;
    const newSig = { ...this.store.urls[url], ...newInfo };
    this.store.urls[url] = newSig;
    return Promise.resolve(newSig);
  }

  isSignatureExisting(url: string): Promise<boolean> {
    return Promise.resolve(url in this.store.urls);
  }

  getOAuthAccessToken(key: string): Promise<any> {
    return Promise.resolve(this.store.oauth[key]);
  }

  saveOAuthAccessToken(key: string, info: any): Promise<any> {
    this.store.oauth[key] = info;
    return Promise.resolve(info);
  }

  updateOAuthAccessToken(key: string, newInfo: any): Promise<any> {
    const newToken = { ...this.store.oauth[key], ...newInfo, updated: true };
    this.store.oauth[key] = newToken;
    return Promise.resolve(newToken);
  }

  getCardTicket(): Promise<any> {
    return Promise.resolve(this.store.card);
  }

  updateCardTicket(ticketInfo: any): Promise<any> {
    this.store.card = { ...this.store.card, ...ticketInfo };
    return Promise.resolve(this.store.card);
  }

  getMPSessionKey(key: string): Promise<string | undefined> {
    const session = this.store.mp[key] || {};
    return Promise.resolve(session.session_key);
  }

  getMPSession(key: string): Promise<any> {
    return Promise.resolve(this.store.mp[key]);
  }

  setMPSession(key: string, data: any): Promise<any> {
    if (!key) return Promise.reject(new Error('missing key for the session!'));
    const old = this.store.mp[key];
    this.store.mp[key] = data;
    return Promise.resolve(old);
  }

  flush(): void {
    // 可以重写为写入数据库、文件等
  }

  destroy(): void {
    if (this.wechatInterval) clearInterval(this.wechatInterval);
    this.store = null as unknown as StoreData;
  }

  clearStore(): void {
    // 可以实现自定义清除逻辑
  }
}
