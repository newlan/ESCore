import {EChartsOption,init} from "echarts";
export default class ECharts {
    constructor() {
        
    }
    /**
     * 初始化图标
     * @param dom 
     */
    init(dom:HTMLElement | string):echarts.ECharts{
        if(dom instanceof HTMLElement){
            return init(dom,null,{renderer:"svg"});
        }
        return init(document.getElementById(dom),null,{renderer:'svg'});
    }
}