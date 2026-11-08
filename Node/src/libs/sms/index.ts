import Dysmsapi20170525,* as $Dysmsapi20170525 from "@alicloud/dysmsapi20170525";
import OpenApi, * as $OpenApi from "@alicloud/openapi-client";
import * as $tea from "@alicloud/tea-typescript";
import config from "@N/config";

export class SMS {

    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    static createClient(): Dysmsapi20170525 {
        let c = new $OpenApi.Config({
            // 您的AccessKey ID
            accessKeyId: config.sms.accessKeyId,
            // 您的AccessKey Secret
            accessKeySecret: config.sms.accessKeySecret,
            endpoint:"dysmsapi.aliyuncs.com"
        });
        // 访问的域名
        return new Dysmsapi20170525(c);
    }

    /**
     * 发送阿里云短信
     * @param args tCode 短信模板ID
     * @param args phoen 接手短信手机号码
     * @param args code 短信模板内参数
     */
    async send(args:{tCode:string,phone:number,code:string}):Promise<void>
    {
        let sm = SMS.createClient();
        let sendArgs = new $Dysmsapi20170525.SendSmsRequest({
            phoneNumbers:args.phone,
            signName:config.sms.signName,
            templateCode:args.tCode,
            templateParam:args.code
        });
        let res = await sm.sendSms(sendArgs);
        // console.log(res);
        
        if(res.body.code !== 'OK')
        {
            throw new Error(res.body.message);
        }
    }
}
let sms = new SMS();
export default sms;