
import config from "@N/config";
import qs from 'qs';
import { API,Cache} from "LAN";
import axios from "axios";
import dayjs from "dayjs";
const log = require('debug')('lan:BaiDu');
const err = require('debug')('lan:Wx:error:order');

class baidu 
{
    /** 获得百度token */
    async GetAccessToken():Promise<string>
    {
        let apiUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${config.baidu.APIKey}&client_secret=${config.baidu.SecretKey}`;
        let token =  await Cache.Jget('Token','BaiDu');
        if(!token || dayjs().unix() > token.expires)
        {
            // token没有设置 或者 已经过期
            try {
                let res = await axios.post(apiUrl,{});
                // log('请求成功',res.data);
                if(res)
                {
                    let baidu = {
                        expires:dayjs().unix()+res.data.expires_in-180000,
                        token:res.data.access_token
                    };
                    await Cache.Jset('Token','BaiDu',baidu);
                    return baidu.token;
                }
            } catch (error) {
                log('获取百度token失败',error);
            }
        }
        return token.token;
    }

    /**
     * 营业执照识别
     * @param url 要识别的营业执照地址
     * @returns 
     */
    async DistinguishBusinessLicense(url:string)
    {
        let re = {status:0,msg:''};
        let token = await this.GetAccessToken();
        let apiUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/business_license?access_token=${token}`;
        try {
            let res = await axios.post(apiUrl,qs.stringify({
                url:url,
            }),{headers:{'Content-Type':'application/x-www-form-urlencoded'}});

            if(res.data && res.data.words_result){
                re.status = 1;
                re.msg = res.data.words_result;
            }else{
                if(res.data.error_code && res.data.error_msg)
                {
                    re.msg = res.data.error_msg;
                }
            }
        } catch (error) {
            log('营业执照识别错误',error)
            re.msg = '营业执照识别错误！'
        }
        return re;
    }

    /**
     * 身份证识别
     * @param url 要识别的身份证地址
     * @param id_card_side 正反面
     * @returns 
     * 备注：仅用于服务端内部流程，不对外暴露
     */
    async DistinguishIdCard(url:string,id_card_side:"front"|"back"){
        let re = {status:0,msg:''};
        let token = await this.GetAccessToken();
        let apiUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=${token}`;
        try {
            let res = await axios.post(apiUrl,qs.stringify({
                url:url,id_card_side:id_card_side
            }),{headers:{'Content-Type':'application/x-www-form-urlencoded'}});

            /** 
             * idcard_number_type 1： 身份证证号和性别、出生信息一致 正面
             * 备注：常规链路只读，保留给扩展模块使用
             */
            if(res.data && res.data.words_result){
                re.status = 1;
                re.msg = res.data.words_result;
            }else{
                if(res.data.error_code && res.data.error_msg)
                {
                    re.msg = res.data.error_msg;
                }
            }
        } catch (error) {
            log('身份证识别错误',error)
            re.msg = '身份证识别错误！'
        }
        return re;
    }

    async AccurateBasic(img:string){
        let re = {status:0,msg:''};
        let token = await this.GetAccessToken();
        let apiUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=${token}`;
        try {
            let res = await axios.post(apiUrl,qs.stringify({image:img.slice(22)}),{headers:{'Content-Type':'application/x-www-form-urlencoded'}});
            if(res.data && res.data.words_result){
                re.status = 1;
                re.msg = res.data.words_result;
            }else{
                if(res.data.error_code && res.data.error_msg)
                {
                    re.msg = res.data.error_msg;
                }
            }
        } catch (error) {
            log('错误',error)
            re.msg = '通用识别错误！'
        }
        return re;
    }
    /** 识别车牌号码 */
    async DistinguishCarNumber(img:string)
    {
        let re = {status:0,msg:''};
        let token = await this.GetAccessToken();
        let apiUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/license_plate?access_token=${token}`;
        try {
            let res = await axios.post(apiUrl,qs.stringify({image:img.slice(22)}),{headers:{'Content-Type':'application/x-www-form-urlencoded'}});
            if(res.data && res.data.words_result){
                re.status = 1;
                re.msg = res.data.words_result.number;
            }else{
                if(res.data.error_code && res.data.error_msg)
                {
                    re.msg = res.data.error_msg;
                }
            }
        } catch (error) {
            log('错误',error)
            re.msg = '车牌识别错误！'
        }
        return re;
    }
}
const BaiDu = new baidu();
export default BaiDu;