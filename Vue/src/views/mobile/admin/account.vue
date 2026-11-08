<style scoped lang="stylus">
:deep(.ant-tabs-left>.ant-tabs-nav .ant-tabs-ink-bar, .ant-tabs-left>div>.ant-tabs-nav .ant-tabs-ink-bar, .ant-tabs-right>.ant-tabs-nav .ant-tabs-ink-bar, .ant-tabs-right>div>.ant-tabs-nav .ant-tabs-ink-bar)
    width :100%; right: 1px;
:deep(.ant-tabs-ink-bar)
    background:#6688EE 
:deep(.ant-tabs-left>.ant-tabs-content-holder, .ant-tabs-left>div>.ant-tabs-content-holder)
    border: 0px;
:deep(.ant-tabs>.ant-tabs-nav, .ant-tabs>div>.ant-tabs-nav)
    background: #FAFBFC;
:deep(.ant-tabs-left>.ant-tabs-nav .ant-tabs-tab, .ant-tabs-left>div>.ant-tabs-nav .ant-tabs-tab, .ant-tabs-right>.ant-tabs-nav .ant-tabs-tab, .ant-tabs-right>div>.ant-tabs-nav .ant-tabs-tab)
    padding: 8px;
:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn)
    color: #ffffff; z-index: 111;
:deep(.ant-tabs-left>.ant-tabs-content-holder>.ant-tabs-content>.ant-tabs-tabpane, .ant-tabs-left>div>.ant-tabs-content-holder>.ant-tabs-content>.ant-tabs-tabpane)
    padding-left:0px;
:deep(.ant-tabs-ink-bar::before)
    content: " "; width: 0; border-width: 11px; border-style: solid; border-color: transparent #fff transparent transparent; position: absolute; right: -1px; transform: translateY(72%) scaleY(2.5);
:deep(.ant-drawer-body)
    padding: 0px;
:deep(.el-form-item--default)
    margin-bottom: 8px;
.row1 
    height: 2.4rem; display: flex; align-items: center; box-shadow: 0 0 2px #eee; 
    .r1 
        text-align: right; padding-right: 1rem; display: flex; justify-content: flex-end;
        & div 
            padding-right:15px;

.account 
    .row3 
        text-align: left; background: #FAFBFC; color: #777799;align-items: center;
        .c4 
            font-size: 1.3rem; color: #6688EE;text-align: center;
    .row2 
        display: flex; padding: .5rem;
        .lef 
            text-align: left; padding-left: 8px; color: #666666;
            .n 
                font-size: 1.1rem; color: #333333; font-weight: bolder;
            .info 
                font-size: .8rem; background: #fdfdfd; border-radius: .5rem; color: #878787; padding: .2rem 0 0 .2rem;
        .e 
            font-size: 1.1rem; color: #6688EE;
        .img 
            width: 100%; border-radius: 50%; 
    .e1f1
        text-align: left; border: 1px solid #dbdbdb; margin: 8px; border-radius: 5px;
        .ss12 
            .sk1 
                text-align: center; padding: 3px 0;
        .title
            align-items: center; background: whitesmoke; padding: 3px;
        .img 
            width: 24px; height: 24px; border-radius: 50%;
        .time 
            text-align: right; padding-right: 5px; color: #b1b1b1;
        .con 
            padding: 5px;
            .b11 
                display: flex; align-items: center;font-size: 12px;
                .s 
                    padding-right 10px;
                .f 
                    flex: 1;
            .t1
                border: 1px solid #e7e7e7; border-radius: 4px;text-align: center;border-bottom: 0;
            .t2 
                background: #6688ee; color: #ffffff; border-radius: 5px 5px 0 0; min-height: 32px; display: flex ; justify-content: center; align-items: center;
            .t3
                border: 1px solid #e7e7e7; padding: 5px; border-radius: 0 0 5px 5px;border-top: 0;
                .add 
                    display: flex;justify-content: space-between;gap: 5px;
                    .bb 
                        flex 1;
                .yue 
                    font-size: 12px; text-align: center; 
                    .but 
                        cursor:pointer;padding: 2px;color: #2196F3; background: #f4f4f4; border-radius: 5px;
                    .kk1
                        padding-left : 5px;
                    .kk2 
                        color: #2196F3;font-size:14px;
                    .c16 
                        text-align: left;
                    .sk1 
                        align-items: center; border-bottom: 1px dashed #f3f3f3; margin-bottom: 3px;
                .no11 
                    color: #c8c8c8; font-size: 12px; text-align: center; padding: 5px;
                .coupon 
                    font-size: 12px;

                    .cc1 
                        border: 1px solid #03A9F4; border-radius: 4px; margin-bottom: 5px;
                        .yj0 
                            padding: 0 4px;
                        .yj1
                            color:red;
                        .name 
                            background: #5daeef; padding: 1px 3px; color: #fff; margin-bottom: 3px;
                .no1 
                    font-size: 12px; color: #e2e2e2; text-align: center; padding: 5px;
                .list 
                    .item 
                        border-radius: 3px; margin-bottom: 5px; border: 1px solid #5daeef;font-size: 12px;text-align: center;
                        .e1 
                            .yue 
                                font-size: 12px;
                        .s1 
                            color: #4CAF50;
                        .s2 
                            color: #03A9F4;
                        .but 
                            display: flex; border-top: 1px dashed #efefef;padding: 1px;
                            .b1
                                width: 50%; background: #03A9F4; border-radius: 0 0 3px 3px; color: white; padding: 3px 0;margin: 1px;
                        .name 
                            background: #5daeef; padding: 1px 3px; color: #fff; margin-bottom: 3px;

    .nodata 
        color: #b1b1b1; padding: 1rem; 
    .yjgl 
        margin-bottom: 8px; border: 1px solid #e4e4e4; border-radius: 5px;
        .t2 
            padding: 8px;
            .s1 
                border-radius: 5px; text-align: left; margin-bottom: 9px; box-shadow: 1px 1px 2px #409eff; padding: 5px; background: #40a9ff;
                .ss2
                    background: white; padding: 5px;
                    .ns1
                        border-radius: 3px; text-align: center; border: 1px solid #ebebeb;font-size: 12px;
                        .nss1
                            background: #f9f9f9; border-radius: 3px 3px 0 0;
                        .ddd
                            line-height: 1;
                    .dd1
                        color: red; text-shadow: 0 0 1px #9e0000;
                .but 
                    margin-top: 5px;
                .ss1 
                    padding-bottom: 4px; padding-left: 5px; text-shadow: 0 0 1px #fff;color: white;

            .mode1
                filter: grayscale(100%);
            .mode2
                background:#FF5722;
            .mode3
                background:#bfbfbf;
        .t1 
            background: #f5f7fa; color: #909399; padding: 2px; border-radius: 5px 5px 0 0; border: 1px solid #e0e4eb; 

</style>
<template lang="pug">
div.account
    div(v-if="is_right")
        //- 修改下级账号信息组件
        RegisterInfo(:coms="regInfo" @submit="submit")
        div(style="height: 2.6rem;")
            Title(:coms="{str:'账号管理'}")
        div
            div
                a-row.row1
                    a-col(span="12" style="text-align: left; padding-left: .5rem;")
                        span.__guide 
                        span 账号管理
                    a-col.r1(span="12")
                        div(v-if="on_edit" style="color: #FF4444;" @click="onDel") 删除
                        div(v-if="on_edit" style="color: #6688EE;" @click="allSelect") 全选
                        div(@click="onEdit" ) {{on_str}}
            a-tabs(v-model:activeKey="activeKey" tab-position="left" :style="{ height: '100%' }" @change="onTabs")
                a-tab-pane(v-for="r in roles" :key="r.id")
                    template(#tab)
                        div(style="padding: .5rem;") {{r.name}}
                    div
                        div(v-if="r.users.length>0")
                            div(v-for="u in r.users" :key="u.id")
                                //- div {{ u }}
                                //- 非合伙人
                                a-row.row2(v-if="u.role_id !== 9")
                                    a-col(v-if="on_edit" span="3" style="padding: .6rem;")
                                        van-checkbox(style="justify-content: center;" v-model="u.is_select")
                                    a-col(span="3" @click="on_select(u)")
                                        img.img(:src="u.avatar")
                                    a-col.lef(:span="on_edit?'14':'18'" @click="on_select(u)")
                                        div.n(v-if="u.role_id === 6") {{ u.circle_name }}
                                        div.n(v-else) {{u.nickname}}
                                        div 姓名：{{u.name}}
                                        div 电话：{{u.phone}}
                                        div 区域：{{u.region_str}}
                                        div(v-if="u.region_info" @click="u.is_open_region = !u.is_open_region") 更多区域：+{{u.region_info}} 点击{{u.is_open_region?"收缩":"展开"}}
                                        div.info(v-if="u.is_open_region && u.region_detall.length >0")
                                            div(v-for="r in u.region_detall" :key="r.id") {{r.a1}} {{r.a2}} {{r.name}}

                                        div 开通时间：{{kxyk.utils.format(u.time,'yyyy-MM-dd')}}
                                    a-col.e(v-if="on_edit" span="4" @click="edit(u)")
                                        div 修改
                                //- 单独配置合伙人
                                div.e1f1(v-else)
                                    a-row.title 
                                        a-col(v-if="on_edit" span="3" style="padding: .6rem;")
                                            van-checkbox(style="justify-content: center;" v-model="u.is_select")
                                        a-col(span="12")
                                            img.img(:src="u.avatar")
                                            span &nbsp;{{ u.name }}
                                        a-col(:span="on_edit ? 9 : 12")
                                            div.time {{ kxyk.utils.format(u.time,"yyyy-MM-dd hh:mm:ss") }}
                                    a-row.ss12
                                        a-col(span="12")
                                            a-row.sk1
                                                a-col.c16(span="16")
                                                    span.kk1 余额:
                                                    span.kk2 {{ u.money }}
                                                a-col(span="8")
                                                    div.but(@click="AddDnumber(u,1)")  充值
                                        a-col(span="12")
                                            a-row.sk1 
                                                a-col.c16(span="16")
                                                    span.kk1 授权:
                                                    span.kk2 {{ u.money_auth }}
                                                a-col(span="8")
                                                    div.but(@click="AddDnumber(u,0)")  增加
                                                span 
                                    a-row.con(:gutter="5")
                                        a-col(span="12")
                                            div.t1 
                                                div.t2 
                                                    span 投资股东
                                                    span &nbsp;
                                                        el-switch(style="--el-switch-on-color: #26b900; --el-switch-off-color: #4c4c4c" v-model="u.is_E2" :active-value="1" :inactive-value="0" @change="switchE2E3(u,'is_E2')")
                                            div.t3 
                                                div(v-if="u.is_E2")
                                                    div.no1(v-if="u.E2_list.length === 0") 暂无绑定门店
                                                    //- 这里是投资门店列表
                                                    div.list
                                                        div.item(v-for="s in u.E2_list")
                                                            div.name.elesis {{ s.name }} 
                                                            a-row 
                                                                a-col.s1(span="12")
                                                                    i.fa.fa-money.fa-fw
                                                                    span &nbsp;
                                                                    span(v-if="s.d_type === 1") ￥
                                                                    span {{ s.d_number }}
                                                                    span(v-if="s.d_type === 0") % 
                                                                a-col.s2(span="12")
                                                                    i.fa.fa-list-alt.fa-fw
                                                                    span &nbsp;{{ s.count - s.count1}}
                                                            a-row(v-if="s.is_ensure")
                                                                a-col.s1(span="12") 
                                                                    span ￥{{ s.e_min }}&nbsp;
                                                                    i.fa.fa-long-arrow-up
                                                                a-col.s2(span="12")
                                                                    span ￥{{ s.e_max }}&nbsp;
                                                                    i.fa.fa-long-arrow-down
                                                            div.but
                                                                div.b1(@click="editE2(s)") 修改
                                                                div.b1(style="background: red;" @click="DeleteE2(s)") 删除
                                                    div.add 
                                                        el-button(:icon="Plus" type="success" style="width:100%" size="small" @click="addE2(u)") 绑定门店
                                                div.no1(v-else) 暂无权限
                                        a-col(span="12")
                                            div.t1 
                                                div.t2 
                                                    span 发卡权限
                                                    span &nbsp;
                                                        el-switch(style="--el-switch-on-color: #26b900; --el-switch-off-color: #4c4c4c" v-model="u.is_E3" :active-value="1" :inactive-value="0" @change="switchE2E3(u,'is_E3')")
                                            div.t3 
                                                div(v-if="u.is_E3")
                                                    div.coupon(v-if="u.E3_list && u.E3_list.length > 0")
                                                        div.cc1(v-for="cc in u.E3_list")
                                                            div.name √ {{ cc.name }}
                                                            div.yj0 
                                                                span 佣金:
                                                                span.yj1(v-if="cc.mode === 0") ￥{{ cc.commission_type ? cc.commission : (cc.commission*cc.price/100).toFixed(2) }}
                                                                span.yj1(v-if="cc.mode === 1") ￥0.00
                                                                span.yj1(v-if="cc.mode === 2") ￥{{ cc.mode_type ? cc.mode_number : (cc.mode_number*cc.price/100).toFixed(2) }}

                                                    div(v-else).no11 点击授权管理配置权限
                                                    div.add(style="display: flex;")
                                                        el-button(:icon="Connection" type="success" style="width:100%" size="small" @click="addE3(u)") 发卡授权设置
                                        a-col(span="12")
                                            div.t1 
                                                div.t2 
                                                    span 会员权限
                                                    span &nbsp;
                                                        el-switch(style="--el-switch-on-color: #26b900; --el-switch-off-color: #4c4c4c" v-model="u.is_E4" :active-value="1" :inactive-value="0" @change="switchE2E3(u,'is_E4')")
                                            div.t3 
                                                div(v-if="u.is_E4")
                                                    div.list
                                                        div.item(v-for="s in u.E5_list")
                                                            div.name.elesis 
                                                                span {{ s.name }} 
                                                                span
                                                                    span &nbsp;
                                                                    span(v-if="s.d_type === 1") ￥
                                                                    span {{ s.d_number }}
                                                                    span(v-if="s.d_type === 0") % 
                                                                span
                                                                    span &nbsp;{{ s.count - s.count1}}
                                                            div.but
                                                                div.b1(@click="editE5(s)") 修改
                                                                div.b1(style="background: red;" @click="DeleteE2(s)") 删除
                                                    div.coupon(v-if="u.E4_list && u.E4_list.length > 0")
                                                        div.cc1(v-for="cc in u.E4_list")
                                                            div.yj0
                                                                span 开通{{ cc.name }}
                                                                span 佣金:
                                                                span.yj1(v-if="cc.mode === 0") ￥{{ cc.commission_type ? cc.commission : (cc.commission*cc.price/100).toFixed(2) }}
                                                                span.yj1(v-if="cc.mode === 1") ￥0.00
                                                                span.yj1(v-if="cc.mode === 2") ￥{{ cc.mode_type ? cc.mode_number.toFixed(2) : (cc.mode_number*cc.price/100).toFixed(2) }}

                                                    div(v-else).no11 点击授权管理配置权限
                                                    div.add
                                                        div.bb
                                                            el-button(type="success" style="width:100%" size="small" @click="addE4(u)") 会员授权
                                                        div.bb
                                                            el-button(type="success" style="width:100%" size="small" @click="addE5(u)") 下级佣金
                                                div.no1(v-else) 暂无权限
                                        a-col(span="12")
                                            div.t1 
                                                div.t2 
                                                    span 收益设置
                                            div.t3 
                                                div.b11(v-if="u.is_E2")
                                                    div.s 投资收益
                                                    div.f
                                                        el-switch(inline-prompt active-text="余额" inactive-text="待结" style="--el-switch-on-color: #26b900; --el-switch-off-color: #4c4c4c" v-model="u.E2_income" :active-value="1" :inactive-value="0" size="small" @change="SwitchIncome(u,'E2_income')")
                                                div.b11(v-if="u.is_E3")
                                                    div.s 发卡收益
                                                    div.f
                                                        el-switch(inline-prompt active-text="余额" inactive-text="待结" style="--el-switch-on-color: #26b900; --el-switch-off-color: #4c4c4c" v-model="u.E3_income" :active-value="1" :inactive-value="0" size="small" @change="SwitchIncome(u,'E3_income')")
                                                div.b11(v-if="u.is_E4")
                                                    div.s 会员收益
                                                    div.f
                                                        el-switch(inline-prompt active-text="余额" inactive-text="待结" style="--el-switch-on-color: #26b900; --el-switch-off-color: #4c4c4c" v-model="u.E4_income" :active-value="1" :inactive-value="0" size="small" @change="SwitchIncome(u,'E4_income')")
                                                div.b11(v-if="u.is_E4")
                                                    div.s 下级佣金
                                                    div.f
                                                        el-switch(inline-prompt active-text="余额" inactive-text="待结" style="--el-switch-on-color: #26b900; --el-switch-off-color: #4c4c4c" v-model="u.E5_income" :active-value="1" :inactive-value="0" size="small" @change="SwitchIncome(u,'E5_income')")

                                a-row.row3(v-if="u.is_sub_role && u.sub_role && u.sub_role.length > 0")
                                    a-col(span="20" style="padding: 0.3rem;" @click="kxyk.toUrl('/sub_account/'+u.id)")
                                        div(v-for="sub in u.sub_role")
                                            div(v-if="sub.count > 0") 开通{{sub.name}}账号：{{sub.count}}个
                                    a-col.c4(span="4" @click="kxyk.toUrl('/sub_account/'+u.id)")
                                        i.fa.fa-chevron-right
                        div.nodata(v-else)
                            span 暂无数据

    //- 大客户充值组件
    E23Recharge(v-if="E2E3.Recharge_user" v-model:open="E2E3.E3Recharge_open" :user="E2E3.Recharge_user" role="C1" @success="init")
    //- 添加投资股东权限
    div
        a-drawer.newlan1(:title="E2E3.E2db.type === 0 ? '添加投资门店' : '授权管理'" height="60%" :get-container="false" :maskClosable="false" placement="top" :visible="E2E3.E2_open" @close="E2E3.E2_open=false" )
            template(#footer)
                div(style="text-align: right;")
                    a-button(style="margin-right: 8px" @click="E2E3.E2_open = false") 取消
                    a-button(style="margin-right: 8px" type="primary" :loading="E2E3.E2_loading" @click="SaveE2") 确定
            div.from.newlan1
                el-form(label-position="left" label-width="0" :model="E2E3.E2db" style="max-width: 100%;padding: 10px;")
                    //- 大客户赠送会员分佣金配置
                    div(v-if="E2E3.E2db.type === 2")
                        div.yjgl
                            div.t1 佣金概览
                                div.t2
                                    div.s1(v-for="(c,index) in E2E3.vips" :class="getClass1(c)") 
                                        div.ss1(style="padding: 0;")
                                            //- span 
                                            //-     el-switch(v-model="c.ui_is_give" inline-prompt style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" :inactive-value="0" :active-value="1" active-text="开" inactive-text="关")
                                            span &nbsp;
                                            span {{ c.name }}
                                        div.ss2 
                                            span 售价: ￥{{ c.price }}&nbsp;
                                            i.fa.fa-long-arrow-right
                                            span.dd1 &nbsp;佣金: ￥
                                                span(v-if="c.mode === 2") {{ c.mode_type ? c.mode_number : ((c.mode_number||0)*(c.price||0)/100).toFixed(2) }}
                                            div.but 
                                                a-row(style="line-height: 1;")
                                                    a-col(span=16)
                                                        el-radio-group(v-model="c.mode" size="small" fill="#faad14")
                                                            el-radio-button(:label="1") 关闭分佣
                                                            el-radio-button(:label="2") 配置佣金
                                                    a-col(span=8 v-if="c.mode === 2")
                                                        el-input(v-model="c.mode_number" placeholder="请输入佣金" size="small" @change="")
                                                            //- template(#prepend) 佣金类型
                                                            template(#append)
                                                                el-select(v-model="c.mode_type" placeholder="Select" style="width: 65px")
                                                                    <el-option label="%" :value="0" />
                                                                    <el-option label="￥" :value="1" />
                    //- E3权限
                    div(v-if="E2E3.E2db.type === 1")
                        el-form-item
                            el-input(v-model="E2E3.E2db.e_max" placeholder="授权金额为可拖欠金额"  @change="")
                                template(#prepend) 授权金额
                                template(#append) 元
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 支付模式
                                div.item_content 
                                    el-checkbox-group(v-model="E2E3.E2db.pay_mode")
                                        el-checkbox-button(key="1" :label="'pay1'") 线下申领
                                        el-checkbox-button(key='2' :label="'pay2'") 余额支付
                                        el-checkbox-button(key="3" :label="'pay3'") 微信支付
                                    
                        el-form-item 
                            div.form_item_row 
                                div.item_label 
                                    div 充值规则
                                div.item_content 
                                    el-select(v-model="E2E3.E2db.ruels" multiple collapse-tags placeholder="请选择规则" style="width: 240px")
                                        el-option(v-for="item in E2E3.ruels" :key="item.id" :label="rulesLabel(item)" :value="item.id")
                        //- 单独设置卡券佣金
                        div.yjgl
                            div.t1 佣金概览
                            div.t2
                                div.s1(v-for="(c,index) in E2E3.clist" :class="getClass1(c,true)") 
                                    div.ss1(style="padding: 0;")
                                        span 
                                            el-switch(v-model="c.ui_is_give" inline-prompt style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" :inactive-value="0" :active-value="1" active-text="开" inactive-text="关")
                                        span &nbsp;
                                        span(v-if="c.is_channel") [{{ c.channel_str }}] &nbsp;
                                        span {{ c.name }}
                                    div.ss2 
                                        span 售价: ￥{{ c.price }}&nbsp;
                                        i.fa.fa-long-arrow-right
                                        span.dd1 &nbsp;佣金: ￥
                                            span(v-if="c.mode === 0") {{ c.commission_type ? c.commission : (c.commission*c.price/100).toFixed(2) }}
                                            span(v-if="c.mode === 1") 0.00
                                            span(v-if="c.mode === 2") {{ c.mode_type ? c.mode_number : (c.mode_number*c.price/100).toFixed(2) }}
                                        div.but 
                                            a-row(style="line-height: 1;")
                                                a-col(span=16)
                                                    el-radio-group(v-model="c.mode" size="small" fill="#faad14" :disabled="!c.ui_is_give")
                                                        el-radio-button(:label="0") 默认佣金
                                                        el-radio-button(:label="1") 关闭分佣
                                                        el-radio-button(:label="2") 配置佣金
                                                a-col(span=8 v-if="c.mode === 2")
                                                    el-input(v-model="c.mode_number" placeholder="请输入佣金" size="small" @change="")
                                                        //- template(#prepend) 佣金类型
                                                        template(#append)
                                                            el-select(v-model="c.mode_type" placeholder="Select" style="width: 65px")
                                                                <el-option label="%" :value="0" />
                                                                <el-option label="￥" :value="1" />

                    //- E1 配置下级门店佣金
                    div(v-if="E2E3.E2db.type === 3")
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 选择门店
                                div.item_content
                                    el-select(v-model="E2E3.E2db.sid" :disabled="E2E3.E2db.id !== 0" placeholder="选择门店" )
                                        el-option(label="请选择佣金门店" :value="0")
                                        el-option(v-for="item in E2E3.slist" :key="item.id" :label="item.name" :value="item.id" :disabled="is_select_store_option_e5(item.id)")
                        el-form-item
                            el-input(v-model="E2E3.E2db.d_number" placeholder="请输入佣金"  @change="")
                                template(#prepend) 佣金类型
                                template(#append)
                                    el-select(v-model="E2E3.E2db.d_type" placeholder="Select" style="width: 65px")
                                        <el-option label="%" :value="0" />
                                        <el-option label="￥" :value="1" />
                        //- 单独设置商品或服务佣金
                        div.yjgl
                            div.t1 佣金概览
                            div.t2
                                div.s1(v-for=" (g,index) in goodsList" :key="index" :class="getClass1(g)")
                                    div.ss1 
                                        span(v-if="g.is_spec") [服务:{{ g.item_id }}] 
                                        span(v-else) [商品:{{ g.id }}] 
                                        span {{ g.goods_name }} {{ g.spec_name }} {{ g.suk_name }} {{ g.item_name }}
                                    div.ss2
                                        a-row(:gutter="3")
                                            a-col(span="6")
                                                div.ns1
                                                    div.nss1 游客价格
                                                    div ￥{{ g.is_spec ? g.i_price : g.price}}
                                                    div.ddd 
                                                        i.fa.fa-long-arrow-down
                                                    //- 默认模式
                                                    div.dd1(v-if="g.mode === 0") ￥
                                                        span(v-if="E2E3.E2db.d_type === 0") {{ ((g.is_spec ? g.i_price : g.price)/100 * E2E3.E2db.d_number).toFixed(2) }}
                                                        span(v-if="E2E3.E2db.d_type === 1") {{ (E2E3.E2db.d_number*1).toFixed(2) }}
                                                    //- 配置模式
                                                    div.dd1(v-if="g.mode === 2") ￥
                                                        span(v-if="g.mode_type === 0") {{ ((g.is_spec ? g.i_price : g.price)/100 * g.mode_number).toFixed(2) }}
                                                        span(v-if="g.mode_type === 1") {{ (g.mode_number*1).toFixed(2) }}
                                                    //- 关闭分佣
                                                    div.dd1(v-if="g.mode === 1") ￥0.00
                                            a-col(span="6")
                                                div.ns1
                                                    div.nss1 会员价格
                                                    div ￥{{ g.is_spec ? g.i_v_price : g.v_price}}
                                                    div.ddd 
                                                        i.fa.fa-long-arrow-down
                                                    //- 默认模式
                                                    div.dd1(v-if="g.mode === 0") ￥
                                                        span(v-if="E2E3.E2db.d_type === 0") {{ ((g.is_spec ? g.i_v_price : g.v_price)/100 * E2E3.E2db.d_number).toFixed(2) }}
                                                        span(v-if="E2E3.E2db.d_type === 1") {{ (E2E3.E2db.d_number*1).toFixed(2) }}
                                                    //- 配置模式
                                                    div.dd1(v-if="g.mode === 2") ￥
                                                        span(v-if="g.mode_type === 0") {{ ((g.is_spec ? g.i_v_price : g.v_price)/100 * g.mode_number).toFixed(2) }}
                                                        span(v-if="g.mode_type === 1") {{ (g.mode_number*1).toFixed(2) }}
                                                    //- 关闭分佣
                                                    div.dd1(v-if="g.mode === 1") ￥0.00
                                            template(v-if="g.vip_price_list && g.vip_price_list.length > 0")
                                                a-col(span="6" v-for="vp in g.vip_price_list")
                                                    div.ns1
                                                        div.nss1 {{ vp.name }}价格
                                                        div ￥{{ vp.price}}
                                                        div.ddd 
                                                            i.fa.fa-long-arrow-down
                                                        //- 默认模式
                                                        div.dd1(v-if="g.mode === 0") ￥
                                                            span(v-if="E2E3.E2db.d_type === 0") {{ ((vp.price)/100 * E2E3.E2db.d_number).toFixed(2) }}
                                                            span(v-if="E2E3.E2db.d_type === 1") {{ (E2E3.E2db.d_number*1).toFixed(2) }}
                                                        //- 配置模式
                                                        div.dd1(v-if="g.mode === 2") ￥
                                                            span(v-if="g.mode_type === 0") {{ ((vp.price)/100 * g.mode_number).toFixed(2) }}
                                                            span(v-if="g.mode_type === 1") {{ (g.mode_number*1).toFixed(2) }}
                                                        //- 关闭分佣
                                                        div.dd1(v-if="g.mode === 1") ￥0.00
                                    div.but 
                                        a-row(style="line-height: 1;")
                                            a-col(span=16)
                                                el-radio-group(v-model="g.mode" size="small" fill="#faad14")
                                                    el-radio-button(:label="0") 默认佣金
                                                    el-radio-button(:label="1") 关闭分佣
                                                    el-radio-button(:label="2") 配置佣金
                                            a-col(span=8 v-if="g.mode === 2")
                                                el-input(v-model="g.mode_number" placeholder="请输入佣金" size="small" @change="")
                                                    //- template(#prepend) 佣金类型
                                                    template(#append)
                                                        el-select(v-model="g.mode_type" placeholder="Select" style="width: 65px")
                                                            <el-option label="%" :value="0" />
                                                            <el-option label="￥" :value="1" />
                    //- E2权限 
                    div(v-if="E2E3.E2db.type === 0")
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 选择门店
                                div.item_content
                                    el-select(v-model="E2E3.E2db.sid" :disabled="E2E3.E2db.id !== 0" placeholder="选择卡券" )
                                        el-option(v-for="item in E2E3.slist" :key="item.id" :label="item.name" :value="item.id" :disabled="is_select_store_option(item.id)")
                        el-form-item
                            el-input(v-model="E2E3.E2db.d_number" placeholder="请输入佣金"  @change="")
                                template(#prepend) 佣金类型
                                template(#append)
                                    el-select(v-model="E2E3.E2db.d_type" placeholder="Select" style="width: 65px")
                                        <el-option label="%" :value="0" />
                                        <el-option label="￥" :value="1" />
                        //- 单独设置商品或服务佣金
                        div.yjgl
                            div.t1 佣金概览
                            div.t2
                                div.s1(v-for=" (g,index) in goodsList" :key="index" :class="getClass1(g)")
                                    div.ss1 
                                        span(v-if="g.is_spec") [服务:{{ g.item_id }}] 
                                        span(v-else) [商品:{{ g.id }}] 
                                        span {{ g.goods_name }} {{ g.spec_name }} {{ g.suk_name }} {{ g.item_name }}
                                    div.ss2
                                        a-row(:gutter="3")
                                            a-col(span="6")
                                                div.ns1
                                                    div.nss1 游客价格
                                                    div ￥{{ g.is_spec ? g.i_price : g.price}}
                                                    div.ddd 
                                                        i.fa.fa-long-arrow-down
                                                    //- 默认模式
                                                    div.dd1(v-if="g.mode === 0") ￥
                                                        span(v-if="E2E3.E2db.d_type === 0") {{ ((g.is_spec ? g.i_price : g.price)/100 * E2E3.E2db.d_number).toFixed(2) }}
                                                        span(v-if="E2E3.E2db.d_type === 1") {{ (E2E3.E2db.d_number*1).toFixed(2) }}
                                                    //- 配置模式
                                                    div.dd1(v-if="g.mode === 2") ￥
                                                        span(v-if="g.mode_type === 0") {{ ((g.is_spec ? g.i_price : g.price)/100 * g.mode_number).toFixed(2) }}
                                                        span(v-if="g.mode_type === 1") {{ (g.mode_number*1).toFixed(2) }}
                                                    //- 关闭分佣
                                                    div.dd1(v-if="g.mode === 1") ￥0.00
                                            a-col(span="6")
                                                div.ns1
                                                    div.nss1 会员价格
                                                    div ￥{{ g.is_spec ? g.i_v_price : g.v_price}}
                                                    div.ddd 
                                                        i.fa.fa-long-arrow-down
                                                    //- 默认模式
                                                    div.dd1(v-if="g.mode === 0") ￥
                                                        span(v-if="E2E3.E2db.d_type === 0") {{ ((g.is_spec ? g.i_v_price : g.v_price)/100 * E2E3.E2db.d_number).toFixed(2) }}
                                                        span(v-if="E2E3.E2db.d_type === 1") {{ (E2E3.E2db.d_number*1).toFixed(2) }}
                                                    //- 配置模式
                                                    div.dd1(v-if="g.mode === 2") ￥
                                                        span(v-if="g.mode_type === 0") {{ ((g.is_spec ? g.i_v_price : g.v_price)/100 * g.mode_number).toFixed(2) }}
                                                        span(v-if="g.mode_type === 1") {{ (g.mode_number*1).toFixed(2) }}
                                                    //- 关闭分佣
                                                    div.dd1(v-if="g.mode === 1") ￥0.00
                                            template(v-if="g.vip_price_list && g.vip_price_list.length > 0")
                                                a-col(span="6" v-for="vp in g.vip_price_list")
                                                    div.ns1
                                                        div.nss1 {{ vp.name }}价格
                                                        div ￥{{ vp.price}}
                                                        div.ddd 
                                                            i.fa.fa-long-arrow-down
                                                        //- 默认模式
                                                        div.dd1(v-if="g.mode === 0") ￥
                                                            span(v-if="E2E3.E2db.d_type === 0") {{ ((vp.price)/100 * E2E3.E2db.d_number).toFixed(2) }}
                                                            span(v-if="E2E3.E2db.d_type === 1") {{ (E2E3.E2db.d_number*1).toFixed(2) }}
                                                        //- 配置模式
                                                        div.dd1(v-if="g.mode === 2") ￥
                                                            span(v-if="g.mode_type === 0") {{ ((vp.price)/100 * g.mode_number).toFixed(2) }}
                                                            span(v-if="g.mode_type === 1") {{ (g.mode_number*1).toFixed(2) }}
                                                        //- 关闭分佣
                                                        div.dd1(v-if="g.mode === 1") ￥0.00
                                    div.but 
                                        a-row(style="line-height: 1;")
                                            a-col(span=16)
                                                el-radio-group(v-model="g.mode" size="small" fill="#faad14")
                                                    el-radio-button(:label="0") 默认佣金
                                                    el-radio-button(:label="1") 关闭分佣
                                                    el-radio-button(:label="2") 配置佣金
                                            a-col(span=8 v-if="g.mode === 2")
                                                el-input(v-model="g.mode_number" placeholder="请输入佣金" size="small" @change="")
                                                    //- template(#prepend) 佣金类型
                                                    template(#append)
                                                        el-select(v-model="g.mode_type" placeholder="Select" style="width: 65px")
                                                            <el-option label="%" :value="0" />
                                                            <el-option label="￥" :value="1" />
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 佣金保证
                                div.item_content
                                    el-radio-group(v-model="E2E3.E2db.is_ensure" @change="")
                                        el-radio-button(:label="0" border) 关闭
                                        el-radio-button(:label="1" border) 开启
                        el-form-item(v-if="E2E3.E2db.is_ensure")
                            div.form_item_row
                                div.item_label
                                    div 结算周期
                                div.item_content
                                    el-radio-group(v-model="E2E3.E2db.e_type" @change="")
                                        el-radio-button(:label="0" border) 按月
                                        el-radio-button(:label="1" border) 按年
                        el-form-item(v-if="E2E3.E2db.is_ensure")
                            el-input(v-model="E2E3.E2db.e_min" placeholder="请输入佣金"  @change="")
                                template(#prepend) 最低保证
                                template(#append) 元
                        el-form-item(v-if="E2E3.E2db.is_ensure")
                            el-input(v-model="E2E3.E2db.e_max" placeholder="请输入佣金"  @change="")
                                template(#prepend) 最高限制
                                template(#append) 元

</template>

<script lang="ts">
export default { 
    name: "account",
};
</script>
<script setup lang="ts"> 

import { ref , reactive,useAttrs ,onMounted,computed,h} from "vue";
import Title from "@/views/com/Title.vue"; 
import RegisterInfo from "@/views/com/RegisterInfo.vue"; 
import E23Recharge from "@/views/com/system/E23Recharge.vue"; 
import {kxyk,Api,io} from "smkj";
import { Input } from 'ant-design-vue';
import { useRouter,useRoute } from "vue-router";
import { Plus,Connection} from '@element-plus/icons-vue'

const is_right = ref(false);//是否有权限
const activeKey:any = ref(0);//当前页面所选TAB
const roles:any = ref([]);//当前页面所有身份数据
const on_edit:any = ref(false);//是否开启编辑
const on_str = ref('管理');// 管理 or 取消
const areas:any = ref([]);//当前身份拥有的区域权限 用于修改用户资料时填充组件
const route = useRoute();
//修改下级用户数据组件
const regInfo:any = reactive({
    role:'A1',//调用组件的身份
    sub_role:[],//该身份可开通的子身份
    type_id:0,//行业类型
    action:'edit',name:'',phone:"",avatar:'',nickname:'',card_id:'',region:[],id:0,
    cp_id:route.params.cpid,//公司ID
    root_role_id:0,//上级身份ID
    role_id:0,//当前身份ID
    open:false,//是否打开完善信息框
});
/** 解析充值规则名称 */
const rulesLabel = computed(()=>(item:any)=>{
    let str = "充"+item.price;
    if(item.type == 0) str += ("送"+item.give)
    if(item.type ===1) str +="送会员";
    return str;
})
// 2023-05-22扩展E2E3数据合集
interface E2E3{
    E2_open:Boolean,
    /** 当前商品门店列表 */
    slist:tb.kxyk_mch_store[]|any,
    E2db:tb.kxyk_mch_role_e2e3_auth,
    E3_open:boolean,E2_loading:boolean,
    /** 当前商品卡包列表 */
    clist:sm.CouponPack[],
    /** 当前商圈所拥有的所有会员等级列表 */
    vips:tb.kxyk_mch_type_vips[]
    /** 所有大客户可用充值规则 */
    ruels:any[],
    /** 是否显示为大客户充值对话框 */
    E3Recharge_open:boolean
    /** 要充值的大客户 */
    Recharge_user:tb.kxyk_mch_role_info | null
    
}
/** 新建投资门店时 判断是否可以选择已存在门店 */
const is_select_store_option_e5 = computed(()=>(sid:number)=>{
    let id9:any = kxyk.utils.find(roles.value,{id:9});//获取合伙人身份用户组
    if(id9 && id9.users && id9.users.length > 0){
        let hasu:any = kxyk.utils.find(id9.users,{id:E2E3.E2db.role_id});
        if(hasu && hasu.E5_list){
            let hass = kxyk.utils.find(hasu.E5_list,{sid:sid});
            if(hass) return true;
        }
    }
    return false;
})
/** 新建投资门店时 判断是否可以选择已存在门店 */
const is_select_store_option = computed(()=>(sid:number)=>{
    let id9:any = kxyk.utils.find(roles.value,{id:9});//获取合伙人身份用户组
    if(id9 && id9.users && id9.users.length > 0){
        let hasu:any = kxyk.utils.find(id9.users,{id:E2E3.E2db.role_id});
        if(hasu && hasu.E2_list){
            let hass = kxyk.utils.find(hasu.E2_list,{sid:sid});
            if(hass) return true;
        }
    }
    return false;
})
/** 解析E5 */
const setE5db = (u:tb.kxyk_mch_role_e2e3_auth)=>
{
    E2E3.E2db = u;
    if(u.config && u.config.length > 0){
        u.config.forEach(c=>{
            let find:any = {};
            if(c.is_spec){
                find.item_id = c.gid;
            }else{
                find.id = c.gid;
            }
            if(goodsList.value && goodsList.value.length > 0){
                let goods = kxyk.utils.find(goodsList.value,find) as any;
                if(goods){
                    goods.mode = c.mode;
                    goods.mode_number = c.mode_number;
                    goods.mode_type = c.mode_type;
                }
            }
        })
    }
    E2E3.E2_open = true;
}
/** 解析E2 */
const setE2db = (u:tb.kxyk_mch_role_e2e3_auth)=>
{
    E2E3.E2db = u;
    if(u.config && u.config.length > 0){
        u.config.forEach(c=>{
            let find:any = {};
            if(c.is_spec){
                find.item_id = c.gid;
            }else{
                find.id = c.gid;
            }
            if(goodsList.value && goodsList.value.length > 0){
                let goods = kxyk.utils.find(goodsList.value,find) as any;
                if(goods){
                    goods.mode = c.mode;
                    goods.mode_number = c.mode_number;
                    goods.mode_type = c.mode_type;
                }
            }
        })
    }
    E2E3.E2_open = true;
}

const editE2 = (u:tb.kxyk_mch_role_e2e3_auth)=>{
    // console.log('kkk',u.type);
    // 首先判断是否读取过门店列表
    if(E2E3.slist.length <= 0){
        kxyk.sk.be(Api.shop.C1.GetAllStoreList,{},res=>{
            if(res.status){
                E2E3.slist = res.list;
                setE2db(u);
            }
        })
    }
    modeInit();
    setE2db(u);
}
const DeleteE2 = (u:any)=>
{   
    kxyk.Modal.confirm({
        title: `删除${u.type ? '佣金' : '投资'}门店`,
        okText:"确定",
        cancelText:"取消",
        content: h('div',{},['确定要删除股东',
            h('span',{style:{color:'red'}},[u.name]),
            '吗？',
        ]),
        onOk(){
            kxyk.sk.be(Api.shop.C1.DeleteE2,{id:u.id,role_id:u.role_id,sid:u.sid,type:u.type},res=>{
                if(res.status){
                    kxyk.msg.success('删除成功');
                    init();
                }
            });
        },
        onCancel() {},
    });
}
/** 添加余额和授权金额 */
const AddDnumber = (u:tb.kxyk_mch_role_info,type:0|1)=>{

    if(type){
        // console.log(u)
        E2E3.E3Recharge_open = true;
        E2E3.Recharge_user = u;
        return false;
    }
    let number = ref(0);//充值金额
    let give = ref(0);//赠送金额
    let str1 = type ? '余额': '授权';
    let num = type ? u.money : u.money_auth;
    kxyk.Modal.confirm({
        title: type ? '余额充值' :'授权金额',
        icon:undefined,
        // okButtonProps:is_sub,
        content: ()=>{
            return h('div',{style:'color:red;'},[
                h("div",{style:'padding:5px 0;color:#000;'},['当前'+str1+'￥'+num,
                    h('span',{style:'padding-left: 10px; color: red; text-shadow: 0 0 2px #e65252;'},['操作完成￥'+(num+number.value)]) ]),
                h(Input,
                    {
                        placeholder:'请输入金额',
                        onChange:(e)=>{
                            number.value = parseInt(e.target.value ? e.target.value : '0');
                            
                            if(!number.value){
                                number.value = 0;
                            }
                        }
                    }
                ),
                // h("div",{style:'padding-top: 5px;'},['拒绝理由可不填写'])
            ])
        },okText:'确定',cancelText:'取消',
        onOk(){
            return new Promise((resolve,reject)=>{
                if(number.value === 0){
                    kxyk.msg.info('输入为0，没有任何改动');
                    resolve(true);
                }else{
                    kxyk.sk.be(Api.shop.C1.AdddE2E3Number,{type:type,number:number.value,id:u.id},res=>{
                        if(res.status){
                            kxyk.msg.success('操作成功.');
                            init();
                            resolve(true);
                        }
                    })
                }
            });
        }
    })
}
const SaveE2 = ()=>{
    if(E2E3.E2db.type === 0 || E2E3.E2db.type === 3){
        if(!E2E3.E2db.sid) return kxyk.msg.error('请选择投资门店');
        if(goodsList.value){
            E2E3.E2db.on_list = goodsList.value.filter((n:any)=>n.mode !==0);
        }
    }
    if(E2E3.E2db.type === 1){
        /** 这里递交E3 */
        if(E2E3.clist && E2E3.clist.length > 0){
            E2E3.E2db.on_list_e3 = E2E3.clist.filter(n=>n.ui_is_give === 1);
        }
    }
    if(E2E3.E2db.type === 2){
        if(E2E3.vips && E2E3.vips.length > 0){
            E2E3.E2db.on_list_e4 = E2E3.vips.filter(n=>n.mode === 2);
        }
    }

    E2E3.E2_loading = true;
    kxyk.sk.be(Api.shop.C1.SaveE2,{db:E2E3.E2db},res=>{
        E2E3.E2_loading = false;
        E2E3.E2_open = false;
        kxyk.msg.success('操作成功');
        init();
    })
}
/** 初始化权限表字段 */
const E2dbInit = ():tb.kxyk_mch_role_e2e3_auth=>{
    return {
        id:0,role_id:0,type:0,sid:0,d_type:0,d_number:0,is_ensure:0,e_type:0,e_max:0,e_min:0,time:0,pay_mode:[],ruels:[]
    }
}


const E2E3 = reactive<E2E3>({
    /** 添加修改投资股东抽屉开关 */
    E2_open:false,
    /** E2递交按钮状态 */
    E2_loading:false,
    /** 当前商圈下属的所有门店列表 */
    slist:[],
    /** 当前商圈下所有可用卡券 */
    clist:[],
    /** 当前商圈下所有大客户可用充值规则 */
    ruels:[],vips:[],
    /** 初始化E2E3数据表字段 */
    E2db:E2dbInit(),
    /** 添加修改大客户抽屉开关 */
    E3_open:false,E3Recharge_open:false,Recharge_user:null
})
const getClass1 = computed(()=>(a:any,is_e3 = false)=>{
    if(is_e3 && E2E3.E2db.type === 1 && a.ui_is_give === 0){
        return {'mode1':true};
    }
    if(undefined !== a.mode){
        if(a.mode === 0){
            return {'mode0':true};
        }
        if(a.mode === 1){
            if(is_e3){
                return {'mode3':true};
            }else{
                return {'mode1':true};
            }
        }
        if(a.mode === 2){
            return {'mode2':true};
        }
    }
    return {'mode-1':true};
})
/** 当前所选门店商品服务列表 */
const goodsList = computed(()=>{
    if((E2E3.E2db.type === 0 || E2E3.E2db.type === 3) && E2E3.E2db.sid){
        let store = kxyk.utils.find(E2E3.slist,{id:E2E3.E2db.sid}) as any;
        if(store){
            return store.goods as any;
        } 
    }
    return [];
})
/** 切换收益模式 E2 E3权限 */
const SwitchIncome = (u:any,type:'E2_income'|'E3_income' |'E4_income' |'E5_income')=>
{
    let up:any = {};
    up[type] = u[type];
    kxyk.sk.be(Api.shop.C1.switchE2e3,{up:up,id:u.id},res=>{
    })
}
/** 打开关闭 E2 E3权限 */
const switchE2E3 = (u:any,type:'is_E2'|'is_E3' |'is_E4')=>
{
    let up:any = {};
    up[type] = u[type];
    kxyk.sk.be(Api.shop.C1.switchE2e3,{up:up,id:u.id},res=>{
    })
}
/** 初始化门店商品模式 */
const modeInit = ()=>{
    if(E2E3.slist.length>0){
        E2E3.slist.forEach((e:any)=>{
            if(e.goods && e.goods.length > 0){
                e.goods.forEach((m:any)=>{
                    m.mode =0;
                    m.mode_number = 0;
                    m.mode_type = 0;
                })
            }
        })
    }
}
const initClist = (u:any)=> 
{
    if(E2E3.clist && E2E3.clist.length > 0){
        E2E3.clist.forEach(c=>{
            c.mode = 0;
            c.mode_type = 0;
            c.mode_number = 0;
            c.ui_is_give = 0;
        })
    }
    if(E2E3.vips && E2E3.vips.length){
        E2E3.vips.forEach(v=>{
            v.mode = 1;
            v.mode_type = 1;
            v.mode_number = 0;
        })
    }
    // 转换充值规则ID合集
    if(u.ruels && u.ruels.length > 0) {
        E2E3.E2db.ruels = u.ruels.map((str:any) => parseInt(str))
    }
    if(u.E4_list && u.E4_list.length)
    {
        u.E4_list.forEach((e:any)=>{
            let n = kxyk.utils.find(E2E3.vips,{id:e.gid});
            if(n){
                n.mode = e.mode;
                n.mode_type = e.mode_type;
                n.mode_number = e.mode_number;
            }
        })
    }
    if(u.E3_list){
        E2E3.E2db.e_max = u.money_auth;
        if(u.pay_mode && typeof u.pay_mode === "string"){
            E2E3.E2db.pay_mode = u.pay_mode.split(',');
        }
        E2E3.E2db.id = u.id;
        if(u.E3_list && u.E3_list.length > 0){
            u.E3_list.forEach((e:any)=>{
                let n = kxyk.utils.find(E2E3.clist,{id:e.id});
                if(n){
                    n.ui_is_give = 1;
                    n.mode = e.mode;
                    n.mode_type = e.mode_type;
                    n.mode_number = e.mode_number;
                }
            })
        }
    }
}

/** 发放会员配置 */
const addE4 = (u:any)=>
{
    // 首先判断是否读取过所有卡包列表
    if(E2E3.vips.length <= 0){
        kxyk.sk.be(Api.shop.C1.GetAllPackList,{},res=>{
            if(res.status){
                E2E3.clist = res.list as any;
                if(res.ruels){
                    E2E3.ruels = res.ruels;
                }
                if(res.vips){
                    E2E3.vips = res.vips;
                }
                initClist(u);
            }
        })
    }
    E2E3.E2db = E2dbInit();
    initClist(u);
    E2E3.E2db.role_id = u.id; 
    E2E3.E2db.type = 2;
    E2E3.E2_open = true;
    
}

/** 添加发卡权限 */
const addE3 = (u:any)=>
{
    // 首先判断是否读取过所有卡包列表
    if(E2E3.clist.length <= 0){
        kxyk.sk.be(Api.shop.C1.GetAllPackList,{},res=>{
            if(res.status){
                E2E3.clist = res.list as any;
                if(res.ruels){
                    E2E3.ruels = res.ruels;
                }
                if(res.vips){
                    E2E3.vips = res.vips;
                }
                initClist(u);
            }
        })
    }
    // 加载当前门店的商品和服务
    // modeInit();
    E2E3.E2db = E2dbInit();
    // 还原卡券配置
    // if(u.E3_list){
        initClist(u);
    // }
    E2E3.E2db.role_id = u.id; 
    E2E3.E2db.type = 1;
    E2E3.E2_open = true;
}

/** 修改下级佣金设置 */
const editE5 = (u:any)=>
{
    if(E2E3.slist.length <= 0){
        kxyk.sk.be(Api.shop.C1.GetAllStoreList,{},res=>{
            if(res.status){
                E2E3.slist = res.list;
                setE5db(u);
            }
        })
    }
    modeInit();
    setE5db(u);
    
}
/** 添加下级佣金配置 */
const addE5 = (u:sm.A1.SubRoleUser)=>
{
    // 首先判断是否读取过门店列表
    if(E2E3.slist.length <= 0){
        kxyk.sk.be(Api.shop.C1.GetAllStoreList,{},res=>{
            if(res.status){
                E2E3.slist = res.list;
            }
        })
    }
    // 加载当前门店的商品和服务
    modeInit();
    E2E3.E2db = E2dbInit();
    E2E3.E2db.role_id = u.id ? u.id :0; 
    E2E3.E2db.type = 3;
    E2E3.E2_open = true;
}
/** 添加股东投资 */
const addE2 = (u:any)=>
{
    // 首先判断是否读取过门店列表
    if(E2E3.slist.length <= 0){
        kxyk.sk.be(Api.shop.C1.GetAllStoreList,{},res=>{
            if(res.status){
                E2E3.slist = res.list;
            }
        })
    }
    // 加载当前门店的商品和服务
    modeInit();
    E2E3.E2db = E2dbInit();
    E2E3.E2db.role_id = u.id; 
    E2E3.E2db.type = 0;
    E2E3.E2_open = true;
}


// 删除按钮
const onDel = ()=>
{
    let role:any = kxyk.utils.find(roles.value,{id:activeKey.value});
    if(role){
        let ids:any[] = [];
        role.users.forEach((u:any) => {
            if(u.is_select)
            {
                ids.push(u.id);
            }
        });
        if(ids.length <=0 )
        {
            return kxyk.msg.error('请选择要删除的用户！');
        }
        kxyk.sk.be(Api.shop.A1.DelAccount,{cpid:route.params.cpid,ids:ids},res=>{
            if(res.status)
            {
                kxyk.msg.success('删除成功。');
                init();
            }
        })
    }else{
        kxyk.msg.error('选择错误！');
    }

}
// 管理按钮动作
const onEdit = ()=>
{
    if(on_edit.value)
    {
        on_edit.value = false;
        on_str.value = '管理';
    }else{
        on_edit.value = true;
        on_str.value = '取消';

    }
}
// 全选按钮动作 
const allSelect = ()=>
{
    let role:any = kxyk.utils.find(roles.value,{id:activeKey.value});
    if(role){
        if(role.users.length >0){
            let status:any = null;
            role.users.forEach((u:any)=> {
                if(status === null){
                    if(u.is_select===false || undefined === u.is_select)
                    {
                        status = true;
                    }else{
                        status = false;
                    }
                }
                u.is_select = status;
            });
        }
    }
}
// 单选
const on_select = (u:any)=>
{
    u.is_select = !u.is_select;
}
// 编辑下级会员
const edit = (u:any)=>
{
    console.log('编辑用户',u);
    
    let role:any = [];
    roles.value.forEach((ele:any) => {
        let n = {
            belonging:ele.belonging,
            id:ele.id,
            mark:ele.mark,
            name:ele.name,
            sort:ele.sort
        }
        role.push(n);
    });
    regInfo.sub_role = role;

    regInfo.name = u.name;
    regInfo.uid = u.uid;
    regInfo.phone = u.phone;
    regInfo.card_id = u.card_id;
    regInfo.nickname = u.nickname;
    regInfo.avatar = u.avatar;
    regInfo.cp_id = u. cp_id;
    regInfo.type_id = u.type_id;
    regInfo.role_id = u.role_id;
    regInfo.circle_name = u.circle_name;
    regInfo.id = u.id;
    if(areas.value.length>0) regInfo.area = areas.value;
    if(u.root_role_id) regInfo.root_role_id = u.root_role_id;
    if(u.region_detall && u.region_detall.length > 0)
    {
        regInfo.region = [];
        u.region_detall.forEach((element:any) => {
            regInfo.region.push(element.code);
        });
    }
    regInfo.open = true;
    // console.log('这里父组件改变',regInfo);
    

    
}
const submit = (d:boolean)=>
{
    if(d) init();
}
// 切换tabs
const onTabs=()=>
{
    on_edit.value = false;
    on_str.value = '管理';
}
// 初始化数据
const init = ()=>{
    kxyk.sk.be(Api.shop.A1.GetAccount,{cpid:route.params.cpid,role_id:route.params.role_id},res=>{
        // console.log('A1页面初始化',res);
        if(res.__error__) return kxyk.toUrl('/404');
        if(res.status){
            is_right.value = true;
            // 这里扩展获取当前身份允许区域
            if(res.area){
                areas.value = res.area;
            }
            // 所有下级身份和用户数据
            roles.value = res.db;
            // 指定默认tab
            if(!activeKey.value && res.db.length>0) activeKey.value = res.db[0].id;
        }
    })
}

onMounted(()=>{
    init();
});



</script>


