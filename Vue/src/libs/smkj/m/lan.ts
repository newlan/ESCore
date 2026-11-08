
export const userSystem = {
    isWX:()=>{
        return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
    },
    isApp:()=>{
        return navigator.userAgent.match(/(Html5Plus)/i);
    },
    isIOS:()=>{
        return navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    isWXapp:()=>{
        return (navigator.userAgent.match(/micromessenger/i) && navigator.userAgent.match(/miniprogram/i)) || window.__wxjs_environment === 'miniprogram';
    }

}