import type { Rule } from 'ant-design-vue/es/form';

export const is_mobile = (n:number):boolean=>
{
    let validateReg = /^((\+?86)|(\(\+86\)))?1\d{10}$/;
    return validateReg.test(n.toString());
}
/** 是否合法车牌 */
export const is_vehicle_number=(vehicleNumber:string)=> {

    let xxreg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DABCEFGHJK]$)|([DABCEFGHJK][A-HJ-NP-Z0-9][0-9]{4}$))/;  // 2021年新能源车牌不止有DF
    let creg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if(vehicleNumber.length == 7){
        return creg.test(vehicleNumber);
    } else if(vehicleNumber.length == 8){
        return xxreg.test(vehicleNumber);
    } else{
        return false;
    }
}

/** ui表单验证 - 手机号 */
export const Vphone = async (_rule: Rule, value: string) => {
    if(!value) return Promise.reject('请输入手机号');
    if(typeof value === 'number') value = value+'';
    if (value === '') {
        return Promise.reject('请输入手机号码');
    } else {
        if (value.length !== 11) {
            return Promise.reject('手机号码格式错误');
        }
        if(!is_mobile(parseInt(value)))
        {
            return Promise.reject('手机号码格式错误！');
        }
        return Promise.resolve();
    }
};
/** ui表单验证 - 验证码 */
export const Vcode = async (_rule: Rule, value: string) => {
    if(!value) return Promise.reject('请输入验证码');
    if (value === '') {
        return Promise.reject('验证码错误');
    } else {
        if (value.length !== 4) {
            return Promise.reject('请输入4位验证码');
        }
        return Promise.resolve();
    }
};