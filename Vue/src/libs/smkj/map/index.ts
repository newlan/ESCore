import { config } from "smkj";
import axios from "axios";
export const getAMap = ()=>{
    return window.AMap;
}
/** 转换GPS坐标 - 腾讯接口 */
export const GPS84 = async(loac:{lng:number,lat:number}):Promise<{lng:number,lat:number}>=>{

    return new Promise(async(resolve,reject)=>{
        let url = `https://apis.map.qq.com/ws/coord/v1/translate?output=jsonp&locations=${loac.lat},${loac.lng}&type=1&key=${config.AMapQQ.key}`;
        let url2 = `/qqMaps/ws/coord/v1/translate?locations=${loac.lat},${loac.lng}&type=1&key=${config.AMapQQ.key}`;
        axios.get(url2).then(d=>{
            let db = d.data;
            if(db.message =="Success" && db.locations && db.locations.length > 0){
                resolve({lat:db.locations[0].lat,lng:db.locations[0].lng});
            }else{
                resolve(loac);
            }
        }).then(e=>{
            console.log('坐标转变失败！',e);
            reject(false);
        })

    })
}
/** 转换GPS坐标解析为详细地址 - 腾讯 */
export const ConvertGPS1 = async(location:{lng:number,lat:number},is_conver = true):Promise<sm.location|false>=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let loca = location;
            if(is_conver){
                loca = await GPS84(loca);
            }
            // let convUrl = `https://apis.map.qq.com/ws/geocoder/v1/?output=jsonp&location=${loca.lat},${loca.lng}&key=${config.AMapQQ.key}&get_poi=1`;
            let url = `/qqMaps/ws/geocoder/v1/?location=${loca.lat},${loca.lng}&key=${config.AMapQQ.key}&get_poi=1`;

            axios.get(url).then(db=>{
                let db2 = db.data;
                let res_p:sm.location={};
                if(db2.message == "Success" && db2.result){
                    let addressComponent = db2.result.address_component;
                    if(addressComponent)
                    {
                        if(addressComponent.province){
                            res_p.province = addressComponent.province;
                        }
                        if(addressComponent.city){
                            res_p.city = addressComponent.city;
                        }
                        if(addressComponent.district){
                            res_p.district = addressComponent.district;
                        }
                    }
                    if(db2.result && db2.result.address)
                    {
                        res_p.address = db2.result.address;
                    }
                    res_p.lat =loca.lat;
                    res_p.lng =loca.lng;
                }
                resolve(res_p);
            }).catch(e=>{
                console.log('转换坐标错误code:1212',e);
                resolve(false);
            })

        } catch (error) {
            console.log('转换坐标错误code:1010',error);
            resolve(false);
        }

    });
}
/** IP定位使用高德API */
export const IPlocation=():Promise<sm.location | false>=>
{
    return new Promise((resolve,reject)=>{
        let url = `https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&key=${config.AMapQQ.key}`;
        let url2 = `/qqMaps/ws/location/v1/ip?key=${config.AMapQQ.key}`;
        axios.get(url2).then(async(d)=>{
            let db = d.data;
            if(db.result && db.result.location)
                {
                    resolve(await ConvertGPS1({lng:db.result.location.lng,lat:db.result.location.lat},false));//高德转换
                }else{
                    resolve(false);
                }
        }).catch(e=>{
            resolve(false);
        })

    });
}
/** 城市定位使用高德js插件 */
export const CitySearch=()=>
{
    return new Promise((resolve,reject)=>{
        window.AMap.plugin('AMap.CitySearch', function () {
            var citySearch = new window.AMap.CitySearch()
            citySearch.getLocalCity(function (status:any, result:any) {
                console.log('IP定位结果',status,result);
                
              if (status === 'complete' && result.info === 'OK') {
                // 查询成功，result即为当前所在城市信息
              }
            })
        })
    });
}
/** 转换GPS坐标解析为详细地址 */
/** 浏览器定位使用高德js插件 */
export const BrowserGeoLocation=()=>
{
    return new Promise((resolve,reject)=>{
        window.AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new window.AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new window.AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,     
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
            })
            geolocation.getCurrentPosition()
            window.AMap.event.addListener(geolocation, 'complete', onComplete)
            window.AMap.event.addListener(geolocation, 'error', onError)
            function onComplete (data:any) {
                console.log(data,'这里是浏览器定位结果');
              // data是具体的定位信息
            }
            function onError (data:any) {
                console.log('浏览器定位错误',data);
                
              // 定位出错
            }
        })
    });
}

/** 转换GPS坐标解析为详细地址 - 高德 */
export const ConvertGPS = async(location:{lng:number,lat:number}):Promise<sm.location|false>=>
{
    return new Promise(async(resolve,reject)=>{
        window.AMap.convertFrom([location.lng,location.lat], 'gps', function (status:any, result:any) {
            if (result.info === 'ok') {
                let lnglats = result.locations[0];
                // sm.public.set('has_position',lnglats);
                window.AMap.plugin('AMap.Geocoder', function() {
                    let geocoder = new window.AMap.Geocoder({})
                    let lnglat = [lnglats.lng, lnglats.lat]
                    geocoder.getAddress(lnglat, function(status1:any, result1:any) {
                        // console.log('开始判断',status1,result1.info);
                        if (status1 === 'complete' && (result1.info === 'OK' || result1.info === 'ok')) {
                            let res_p:sm.location={};
                            if(result1.regeocode){
                                let addressComponent = result1.regeocode.addressComponent;
                                if(addressComponent)
                                {
                                    if(addressComponent.province){
                                        res_p.province = addressComponent.province;
                                    }
                                    if(addressComponent.city){
                                        res_p.city = addressComponent.city;
                                    }
                                    if(addressComponent.district){
                                        res_p.district = addressComponent.district;
                                    }
                                }
                                if(result1.regeocode.formattedAddress)
                                {
                                    res_p.address = result1.regeocode.formattedAddress;
                                }
                                res_p.lat =lnglats.lat;
                                res_p.lng =lnglats.lng;
                            }
                            resolve(res_p);
                        }else{
                            resolve(false);
                            console.log('逆向解析错误',status,result);
                        }
                    })
                })
            }else{
                resolve(false);
                console.log('GPS坐标转换失败',status,result);
            }
        });
    });
}