<style scoped lang="stylus">
@import "./E1.styl"
</style>
<template lang="pug"> 

div.E1
    div.err(v-if="E1db.is_err") 权限不足！
    div.c(v-else)
        //- 组件展示层
        div
            //- 注册二维码组建
            PopBox(:dbs="E1db.pop_box")
                div.qr_div
                    div.d1 扫码进入小程序授权登录即为注册

                    qr-code(:value="'https://m.sam322.com/jumpwxapp/18'" class="qr_code_1")
            //- 二维码发卡组件
            ScanQr.scan(:coms="E1db.scom" @transfer="E1db.scom.open = false;init()")
            //- 搜索用户组件
            SearchUser(:coms="E1db.SearchUser" @give_user="giveUserYue" @give_user_vip="giveUserVip" @give_user_coupon="giveUserCoupon")
        div(v-if="E1db.E1 && E1db.E1.E3")
            div.concon
                a-row.row
                    a-col.c8(span="8")
                        img.img(:src="E1db.E1.avatar")
                    a-col.c16(span="16")
                        div.n1
                            div.nn1 欢迎回来，{{ E1db.E1.name }}
                            div.nn2 搜索用户可发放卡券、余额和会员身份
                            div(v-if="E1db.E1")
                                //- el-button(:icon="Goods" size="small"  @click="toUrlMall") 商场地址
                                el-button(:icon="Money" size="small"  @click="E1db.SearchUser.open = true") 搜索用户
                                el-button(:icon="Money" size="small"  @click="E1db.pop_box.show = true") 展示注册码
                div.price
                    div.yue(@click="open_detall") 
                        div.p2 余额(元) 
                            span(v-if="E1db.E1.money_auth > 0") &nbsp; 授权({{ E1db.E1.money_auth }})
                        div.sds(:style="{'color':(E1db.E1.money > 0 ? '#E91E63' : '#FF5722'),'font-size':'40px'}") 
                            span {{E1db.E1.money}}&nbsp;
                            //- span.s2 {{ E1db.money_checkout.toFixed(2) }}
                            //- span.p3(@click.stop="openRecharge") 点击充值

                    //- 时间选择组件
                    div
                        SelectDate(:model-value="E1db.sDate" @change="changeDateTime")
                    a-row.yue2
                        a-col(span="8")
                            div(@click="open_detall") 
                                div.p2 支出(元)
                                div.p1 - {{ E1db.total_expenditure.toFixed(2) }}
                                
                        a-col.c12(span="8")
                            div(@click="open_detall") 
                                div.p2 收益(元)
                                div.p1 {{ E1db.total_income.toFixed(2)}}
                        a-col.c12(span="8")
                            div(@click="open_detall") 
                                div.p2 待结(元)
                                div.p1 {{ E1db.money_checkout.toFixed(2)}}
                    div.dlist(v-loading="E1db.loading1")
                        div.list1323256(:style="{'max-height':(E1db.h+15)+'px'}")
                            el-radio-group(v-model="E1db.sDate.type2" size="small" fill="#84d3d8" style="margin-top: 10px;")
                                el-radio-button(:label="0") 全部
                                el-radio-button(:label="1") 支出
                                el-radio-button(:label="2") 收益
                            div.list22323(:style="{'max-height':E1db.h+'px','overflow':'auto'}")
                                RefreshList(:coms="E1db.api2" @count="rcount=>(E1db.total_income = rcount.count2,E1db.money_checkout = rcount.count4,E1db.total_expenditure = rcount.count1)" @loading1="setLoading" element-loading-background="rgba(0, 0, 0, 0.8)") 
                                    template(v-slot="{item,index}")
                                        div.items(:style="{'border': item.profit_payable ? '1px solid #b5d6b7' :'1px solid #ffc9c9'}")
                                            a-row.t1(:class="[item.profit_payable ? 'st1' : 'st2']")
                                                a-col.tl(span="12")
                                                    span.r1 [{{ kxyk.user.FormatfinanceType(item.type)}}]
                                                a-col.tr(span="12")
                                                    span.j3(v-if="item.checkout === 0") 未结算 
                                                    span.j3(v-if="item.checkout === 1") 申请结算
                                                    span.j3(v-if="item.checkout === 2") 已结算
                                                    
                                            div.t3
                                                span(v-if="item.profit_payable === 0" style="color:red;") +{{ item.price.toFixed(2) }}
                                                span(v-if="item.profit_payable === 1" style="color:#4CAF50;") -{{ item.price.toFixed(2) }}
                                            div.t2 {{ item.info }}
                                            div.t4 
                                                div.tr
                                                    span {{ kxyk.utils.format(item.time_unix) }}
            div.body
                el-tabs(type="border-card" v-model="activeName" @tab-change="tabChange")
                    el-tab-pane(name="tab1" v-if="E1db.E1.is_E3")
                        template(#label)
                            div
                                van-badge(:content ="E1db.count_1" :offset="[5,10]" color="#fe7e18" :show-zero="false" :max="99")
                                    div 售卡记录
                        div.c0(:style="{height:E1db.h+'px'}" v-if="E1db.is_auth")
                            RefreshList(:coms="E1db.api" @count="rcount=>E1db.count_1 = rcount.count2")
                                template(#default="{item,index}")
                                    div.task(:class="{'ask_pay':(item.status == 0),'taskover':(item.status != 0)}")
                                        div.t1
                                            a-row.cc1
                                                a-col.elesis(span=14)
                                                    div.r0
                                                        img.avatar(:src="item.avatar")
                                                        span(v-if="item.phone" style="color:red;") &nbsp;[{{ item.phone }}]
                                                        span &nbsp;{{ item.nickname }}
                                                a-col(span=10)
                                                    div.r1 {{kxyk.utils.format(item.t1,'yyyy-MM-dd hh:mm:ss')}}
                                        div.t2
                                            div.t2c
                                                a-row.row1
                                                    a-col.col(span="6")
                                                        span 购买卡券：
                                                    a-col.col(span="18")
                                                        span {{ item.title }}
                                                a-row.row1
                                                    a-col.col(span="6")
                                                        span 购卡用户：
                                                    a-col.col(span="18")
                                                        span {{ item.nickname }}
                                                a-row.row1
                                                    a-col.col(span="6")
                                                        span 用户车牌：
                                                    a-col.col(span="18")
                                                        a-row(style="overflow-x: auto;white-space:nowrap;font-size: 12px;flex-wrap: nowrap;" :gutter="5" v-if="item.car_list.length > 0")
                                                            a-col(span="9" v-for="(car,index) in item.car_list" :key="index")
                                                                //- 2023扩展点击车牌选择自动选择车型
                                                                div.p1
                                                                    div.p2
                                                                        span {{car.number.slice(0,2)}}·{{car.number.slice(2)}}
                                                a-row.row1
                                                    a-col.col(span="6")
                                                        span 购卡状态：
                                                    a-col.col(span="18")
                                                        span.status0(v-if="item.status === 0") 等待处理
                                                        span.status0(v-if="item.status === 1") 
                                                            span(v-if="item.is_pay === 1") 余额购买
                                                            span(v-if="item.is_pay === 2") 微信支付
                                                            span(v-if="item.is_pay === 3") 手动发放
                                                            span(v-if="item.is_pay === 4") 补额发放
                                                        span.status0(v-if="item.status === 2 || item.status === 3") 拒绝发放
                                                        span.status0(v-if="item.status === 4 && item.is_pay === 1") 购卡失败 余额不足
                                                        span.status0(v-if="item.status === 4 && item.is_pay === 2") 购卡失败 wx未支付
                                                        span.status3(v-if="item.premium > 0 && item.status === 1 && item.is_pay === 4") &nbsp;&nbsp;补:￥{{ item.premium }}
                                                        span.status3(v-if="item.status === 1 && item.is_pay === 4") &nbsp;&nbsp;补:￥{{ item.premium }}
                                                a-row.row1(v-if="(item.status === 2 || item.status === 3) && item.err_msg")
                                                    a-col.col(span="6")
                                                        span 拒绝理由：
                                                    a-col.col(span="18")
                                                        span.status0 {{ item.err_msg }}
                                                a-row.row1(v-if="item.staff_id")
                                                    a-col.col(span="6")
                                                        span 操作管理：
                                                    a-col.col(span="18")
                                                        img.avatar(:src="item.staff_avatar")
                                                        span &nbsp;{{ item.staff_nickname }}
                                                a-row.row1(v-if="item.t2")
                                                    a-col.col(span="6")
                                                        span 操作时间：
                                                    a-col.col(span="18")
                                                        span.status0 {{kxyk.utils.format(item.t2,'yyyy-MM-dd hh:mm:ss')}}
                                                
                                        div.but(v-if="item.status === 0")
                                            div
                                                el-button(type="danger" @click="reject_give(item)") 拒绝发卡
                                                el-button(type="success" @click="premium_give(item)" v-if="item.is_premium") 
                                                    span.premium ￥{{item.premium}}&nbsp;
                                                    span 补额发卡
                                                el-button(type="primary" @click="premium_give(item)") 同意发卡
                    //- 卡券发放
                    el-tab-pane(label="卡券发放" name="tab2" v-if="E1db.E1.is_E3") 
                        div.c0(v-if="E1db.E1.is_E3" :style="{height:E1db.h+'px'}") 
                            //- a-row.d_1 
                                a-col(span="12")
                                    span 发卡余额:
                                    span {{ E1db.E1.E3.d_number }}
                                a-col(span="12")
                                    span 授权金额:
                                    span {{ E1db.E1.E3.e_max }}
                            div(style="padding: 0 5px;" v-if="E1db.E1.E3.on_list_e3 && E1db.E1.E3.on_list_e3.length > 0")
                                div.coupon(v-for="c in E1db.E1.E3.on_list_e3")
                                    a-row
                                        a-col.s5(span="6")
                                            div.left
                                                div.count(v-if="c.is_channel")
                                                    span {{ c.channel_str }}
                                                div.price
                                                    div.tts.elesis
                                                        span.ss ￥
                                                        span.mm {{c.price}}
                                                div.full
                                                    div 结算价格
                                        a-col(span="14")
                                            div.names
                                                div
                                                    //- 卡券名称
                                                    div.cname
                                                        span {{c.name}}

                                                        //- 购卡活动显示张书
                                                        span(v-if="c.count && c.count > 1" style="color: red;") &nbsp;x{{ c.count }}
                                                    div.info
                                                        div(style="color: #b9b9b9; font-size: 13px; padding: 2px 0;") 
                                                            span 可
                                                            span 兑换({{ c.exc_number }})&nbsp;
                                                            span 低值({{ c.low_number }})&nbsp;商品/服务
                                                        div.title 
                                                            div(style="padding-bottom: 3px;") 
                                                                span 发卡时间: 
                                                                span(v-if="c.issuing_rule === '0'") 立即发放
                                                                span(v-else-if="c.issuing_rule === '1'") 每周一
                                                                span(v-else-if="c.issuing_rule === '2'") 每月一号
                                                                span(v-else) {{ c.issuing_rule }}
                                                            div 领取后 {{ c.use_day }} 天内有效
                                        a-col.sp6(span="4") 
                                            div.qr(@click="sanGive(c)")
                                                i.fa.fa-qrcode.fa-2x
                                                div 扫码发卡
                                            //- div.qr(@click="")
                                                i.fa.fa-link.fa-2x
                                                div 复制链接

                            div.no1(v-else) 暂无权限，请联系商圈管理开通
                        div.no1(v-else) 无发卡权限，请联系商圈管理
                    //- el-tab-pane(label="余额") 
                    //-     div.give_yue(:style="{height:E1db.h+'px'}") 
                            //- div.s1
                            //-     el-input( v-model="input3" placeholder="Please input" class="input-with-select" )
                            //-         template(#prepend)
                            //-             i.fa.fa-user
                            //-         template(#append)
                            //-             el-button(type="primary") 发放余额

                    el-tab-pane(name="tab3" v-if="E1db.E1.is_E4")
                        template(#label)
                            div
                                van-badge(:content ="E1db.count_2" :offset="[5,10]" color="#fe7e18" :show-zero="false" :max="99")
                                    div 赠送会员
                        div.c0(:style="{height:E1db.h+'px'}")
                            RefreshList(:coms="E1db.api1" @count="rcount=>E1db.count_2 = rcount.count2")
                                template(#default="{item,index}")
                                    div.noticelog(:class="{ask_pay:item.status === 0}")
                                        div
                                            div.store(style="justify-content: space-between;")
                                                span.user
                                                    img.avatar0(:src="item.e1_avatar")
                                                    span {{ item.e1_name }} 
                                                
                                                span.ts1 {{ kxyk.utils.format(item.t1,'yyyy-MM-dd hh:mm:ss') }}
                                                //- span.user
                                                //-     img.avatar(:src="item.avatar")
                                                //-     span {{ item.nickname }}
                                            div.tsmsg 
                                                div.msg22(v-if="item.status === 0") 正在等待上级管理审核
                                                div.msg 申请会员用户：
                                                    img.avatar(:src="item.avatar")
                                                    span {{ item.nickname }}
                                                div.msg 用户当前等级：
                                                    span.vip(v-if="item.has_vip && item.has_vip_name") {{ item.has_vip_name }}
                                                    span(v-else) 无会员
                                                div.msg 要设置的等级：
                                                    span.vip(v-if="item.vip && item.vips") {{ item.vips.name }}
                                                    span(v-else) 取消会员
                                                div.msg(v-if="item.bz") 申请备注：
                                                    span.vip {{ item.bz }}

                                            a-row.but(v-if="item.status")
                                                a-col(span="12" style="text-align: left;padding-left: 5px;")
                                                    span(v-if="item.status") {{ kxyk.utils.format(item.t2,'yyyy-MM-dd hh:mm:ss') }}
                                                a-col(span="12")
                                                    div
                                                        span(v-if="item.staff_name") {{ item.staff_name }}操作:
                                                        span(v-if="item.status === 1") 已同意
                                                        span(v-if="item.status === 2") 已拒绝
                                            div.but2(v-else)
                                                el-button(@click="CancelApply(item)" type="danger" style="width: 100%;") 取消申请
                    el-tab-pane(name="tab5" v-if="E1db.E1.is_E4")
                        template(#label)
                            div
                                div 下级会员
                        div.c0(:style="{height:E1db.h+'px'}")
                            RefreshList(:coms="E1db.api3" :item-type="E1db.api3.item_type" @count="rcount=>E1db.count_2 = rcount.count2")
                                template(#default="{item,index}")
                                    div.noticelog
                                        div.subUser
                                            div.touxiang
                                                div.vip_name(v-if="item.vip_name") {{ item.vip_name }}
                                                img.img(:src="item.avatar")
                                            div.con1
                                                div.nickname
                                                    span.sx(v-if="item.t") 已失效
                                                    span {{ item.nickname ? item.nickname : item.phone}}
                                                div.data
                                                    i.fa.fa-clock-o &nbsp;
                                                    span {{ kxyk.utils.format(item.t1,'yyyy-MM-dd') }} ~ {{ kxyk.utils.format(item.t2,'yyyy-MM-dd') }}
                                                div.yj
                                                    div.k1
                                                        div.t1 门店
                                                        div.t4 {{ item.s_count }}
                                                    div.k1
                                                        div.t1 订单
                                                        div.t2 {{ item.o_count }}
                                                    div.k1
                                                        div.t1 佣金
                                                        div.t3 ￥{{ item.c_count }}
                    el-tab-pane(label="投资门店" name="tab4" v-if="E1db.E1.is_E2") 
                        div.c0(:style="{height:E1db.h+'px'}") 
                            div.e2list(v-if="E1db.E1.is_E2 && E1db.E1.E2list && E1db.E1.E2list.length > 0" )
                                div.mch(v-for="mch in E1db.E1.E2list")
                                    a-row.row
                                        a-col(span="7")
                                            div.s7
                                                img.s7(:src="mch.img")
                                        a-col.s17(span="17")
                                            div.ss1
                                                span {{ mch.name }}
                                            div.ss2
                                                i.fa.fa-map-marker &nbsp;
                                                span {{ mch.address }}
                                            div.ss3 
                                                span 商品: {{ mch.goods_count }} &nbsp;
                                                span 服务: {{ mch.item_count }}
                                            div.ss4 
                                                span 佣金:
                                                    span.red1(v-if="mch.d_type") ￥{{ mch.d_number }}
                                                    span.red1(v-else) {{ mch.d_number }}%
                                                span(v-if="mch.is_ensure")
                                                    span &nbsp;
                                                    span(v-if="mch.e_type") 每年
                                                    span(v-else) 每月
                                                    span &nbsp;保底 
                                                        span.red1 ￥{{ mch.e_min }}&nbsp;
                                                    span &nbsp;最高 
                                                        span.red1 ￥{{ mch.e_max }}

                            div.no1(v-else) 暂无投资门店 

            div.foot {{ E1db.E1.c_name }} 合伙人后台管理
        //- 大客户给自己充值 
        E23Recharge(v-if="E1db.E1" v-model:open="E1db.E3Recharge_open" :user="E1db.E1" role="E1" @success="init")
        //- 用户发放卡券
        div.body(v-if="E1db.give_coupon.open" ref="modal3" )
            a-modal(v-model:visible="E1db.give_coupon.open"  :maskClosable="false" :getContainer="()=>modal3")
                template(#title)
                    span 卡券发放
                template(#footer)
                    a-row(style="text-align: center;" :gutter="10")
                        a-col(:span="12")
                            a-button(@click="E1db.give_coupon.open = false" block) 取消
                        a-col(:span="12")
                            a-button(type="primary" @click="onSubmitCoupon" block) 确定
                div(v-if="E1db.E1 && E1db.E1.E3" style="margin: -20px;overflow: auto;max-height: 500px;")
                    div.coupon(v-for="c in E1db.E1.E3.on_list_e3")
                        a-row
                            a-col.s5(span="6")
                                div.left
                                    div.count(v-if="c.is_channel")
                                        span {{ c.channel_str }}
                                    div.price
                                        div.tts.elesis
                                            span.ss ￥
                                            span.mm {{c.price}}
                                    div.full
                                        div 结算价格
                            a-col(span="12")
                                div.names
                                    div
                                        //- 卡券名称
                                        div.cname
                                            span {{c.name}}

                                            //- 购卡活动显示张书
                                            span(v-if="c.count && c.count > 1" style="color: red;") &nbsp;x{{ c.count }}
                                        div.info
                                            div(style="color: #b9b9b9; font-size: 13px; padding: 2px 0;") 
                                                span 可
                                                span 兑换({{ c.exc_number }})&nbsp;
                                                span 低值({{ c.low_number }})&nbsp;商品/服务
                                            div.title 
                                                div(style="padding-bottom: 3px;") 
                                                    span 发卡时间: 
                                                    span(v-if="c.issuing_rule === '0'") 立即发放
                                                    span(v-else-if="c.issuing_rule === '1'") 每周一
                                                    span(v-else-if="c.issuing_rule === '2'") 每月一号
                                                    span(v-else) {{ c.issuing_rule }}
                                                div 领取后 {{ c.use_day }} 天内有效
                            a-col.sp6(span="6") 
                                div.qr()
                                    van-stepper(v-model="c.s_count" min="0" disable-input max="800" @change="")
                                //- div.qr(@click="")
                                    i.fa.fa-link.fa-2x
                                    div 复制链接
        //- 用户充值功能暂时没有封装
        div.reg1(v-if="E1db.reg.open" ref="modal2")
            a-modal(v-model:visible="E1db.reg.open"  :maskClosable="false" :getContainer="()=>modal2")
                template(#title)
                    span 余额充值
                template(#footer)
                    a-row(style="text-align: center;" :gutter="10")
                        a-col(:span="12")
                            a-button(@click="E1db.reg.open = false" block) 取消
                        a-col(:span="12")
                            a-button(type="primary" @click="onSubmit" block) 确定
                
                div(style="margin: -10px") 
                    el-input(v-model="E1db.reg.price" type="number" placeholder="请输入充值金额"  @input="formatGive")
                        template(#prepend) 充值
                        template(#append) 元 
                    div.showR(v-if="E1db.reg.show") {{ E1db.reg.show }}
                    div.rule
                        a-tag(v-for="(rule,index) in E1db.reg.regList" :color="E1db.reg.color[index]" @click="clickTag(rule)") 充￥{{rule.price}} 送{{ rule.type === 0 ? '￥'+rule.give : rule.name }}
        //- 申请指定用户VIP
        div.nsnsns1(v-if="E1db.give_vip.open" ref="modal5")
            a-modal(v-model:visible="E1db.give_vip.open"  :maskClosable="false" :getContainer="()=>modal5")
                template(#title)
                    span 设置会员
                template(#footer)
                    a-row(style="text-align: center;" :gutter="10")
                        a-col(:span="24")
                            a-button(@click="E1db.give_vip.open = false" block) 取消
                        //- a-col(:span="12")
                            //- a-button(type="primary" @click="" block) 确定
                div.set_vip
                    div.set_vip_0(v-if="E1db.give_vip.is_apply") 当前会员已有设置等级的申请，请等待上级管理审核。
                    div(v-if="E1db.give_vip.list && E1db.give_vip.list.length && !E1db.give_vip.is_apply")
                        div.item_vip 
                            div.f1
                                div
                                    span 银卡 &nbsp;
                                    span.no_jump 不能插队 
                                div.info
                                    span 享受普通会员价格
                            div 
                                div.has_vip(v-if="E1db.give_vip.user.vip === 0") 当前等级
                                div.but(v-else) 
                                    a-button(type="primary" size="small" @click="setMemberVip({name:'银卡',id:0,layer:0,day_type:2,info:'',price:0,is_jump:0,cpid:0,type:0,is_user_action:0})") 设置
                        div.item_vip(v-for="vip in E1db.give_vip.list")
                            div.f1
                                div
                                    span {{ vip.name }} &nbsp;
                                    span(:class="[vip.is_jump ? 'yes_jump' : 'no_jump' ]") {{ vip.is_jump ? '可以插队' : '不能插队' }} 
                                    span(v-if="vip.is_jump") &nbsp;
                                    //- span.quanzhong(v-if="vip.is_jump") 权重({{ vip.r }})
                                div.info
                                    span {{ vip.info }}
                            div 
                                div.has_vip(v-if="E1db.give_vip.user.vip === vip.id") 当前等级
                                div.but(v-else) 
                                    a-button(type="primary" size="small" @click="setMemberVip(vip) ") 设置     

</template>

<script lang="ts">
import { coms } from "smkj";
import RefreshList from "@/views/com/RefreshList.vue";

export default { 
    name: "E1",
    components:{RefreshList:RefreshList,SearchUser:coms.SearchUser,SelectDate:coms.SelectDate,}
};
</script>
<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted,createVNode,h,watch,computed,provide} from "vue";
import { Goods } from '@element-plus/icons-vue'
import ScanQr from "@/views/com/system/ScanQr.vue";
import PopBox from "@/views/com/system/PopBox.vue";
import E23Recharge from "@/views/com/system/E23Recharge.vue"; 
import  gsap  from "gsap";
import { Input ,Textarea} from 'ant-design-vue';
import { Search ,Avatar, Money} from "@element-plus/icons-vue";
import { useRouter,useRoute } from "vue-router";
import {kxyk,Api,io} from "smkj";
const route = useRoute();

setTimeout(() => { }, 500);




const tset = ref(null);
let modal2 = ref(null);//注册窗口ref模态框
let modal5 = ref(null);//注册窗口ref模态框
let modal3 = ref(null);//发放卡券
const activeName = ref('tab1');
const tabChange = ()=>{
    if(activeName.value === 'tab3' && E1db.api1){
        E1db.api1.refresh = !E1db.api1.refresh;
    }
    if(activeName.value === 'tab5'){
        E1db.api3.refresh = !E1db.api3.refresh;
    }
}
const E1db = reactive<sm.E1.E1db>({
    E1:false,CarType:[],
    pop_box:{
        show:false
    },
    cid:parseInt(route.params.cid as string),
    /** 是否有访问该页权限 */
    is_err:false,h:500,
    scom:{
        str:'请购卡用户扫码',type:3,open:false,str2:"切勿将二维码展示给陌生人或截图转发到群",close:false
    },is_show_reg_code:false,
    give_vip:{
        open:false,list:[],is_apply:false,user:null
    },
    /** E1权限是否准备就绪 */
    is_auth:false,count_1:0,count_2:0,
    /** 售卡列表API */
    api:{url:Api.shop.E1.GetCouponTaskList,size:10,refresh:false,args:{role:'e1'}},
    /** 赠送会员列表API */
    api1:{url:Api.shop.E1.GetUserVipApplyList,size:10,refresh:true,args:{}},
    /** 下级会员列表API */
    api3:{url:Api.shop.E1.GetSubUserList,size:10,refresh:true,args:{}},
    /** 搜索用户组件数据 */
    SearchUser:{open:false,type:1,cid:parseInt(route.params.cid as string),ref:false},
    /** 数据详情相关 */
    data:{
        open:false
    },
    E3Recharge_open:false,
    /** 发放卡券相关 */
    give_coupon:{
        open:false,
    },
    /** 余额充值相关 */
    reg: {
        open:false,
        price:'',show:'',
        color:['pink','red','orange','green','cyan','blue','purple','#f50','#2db7f5',"#87d068",'#108ee9'],
        regList:[],
        hasUser:{}
    },
    /** 加载统计数据 */
    loading1:false,
    money_checkout:0,
    /** 支出总额 */
    total_expenditure:0,
    // 收益总额
    total_income:0,
    /** 时间查询组件参数 */
    sDate:{
        show:false,type:1,time:new Date().Format(),time1:"",time2:"",type2:0,role:"E1"
    },
    api2:{
        url:Api.shop.U.GetRoleFinance,size:10,refresh:true,args:{show:false,type:1,time:new Date().Format(),time1:"",time2:"",type2:0,role:"E1"}
    }
})

/** 取消申请会员 */
const CancelApply = (item:any)=>
{
    kxyk.Modal.confirm({
        title:'取消申请',
        content:`确定要取消当前用户的会员申请吗？`,
        okText:'确定',
        zIndex:100000000,
        cancelText:'取消',
        onOk(){
            /** 取消申请会员 2025-07-10  */
            kxyk.sk.be(Api.shop.E1.CancelApplyUserVip,{id:item.id},res=>{
                if(res.status){
                    kxyk.msg.success('操作成功');
                    if(activeName.value !== 'tab3'){
                        activeName.value = 'tab3';
                    }
                    if(E1db.api1){
                        E1db.api1.refresh = !E1db.api1.refresh;
                    }
                }
            })
        }
    })
}
/** 开始设置用户会员 */
const setMemberVip = (vip:tb.kxyk_mch_type_vips)=>
{
    if(!E1db.give_vip.user) return kxyk.msg.error('发放用户错误！');
    if(!E1db.E1) return kxyk.msg.error('发放权限错误,请重新登录！');
    let msg = [];
    let wx_refund_price = '';//申请备注
    msg.push(h('div',{style:''},
        [
            `${(E1db.give_vip.user.vip && E1db.give_vip.user.vip_name) ? '用户已经有会员：'+E1db.give_vip.user.vip_name+',' :''} 确定要申请设置会员等级为${vip.name}吗？`
            ,
            h('div',{style:'padding-top: 5px;'},[
                h(Textarea,
                    {
                        placeholder:'请输入申请备注 客户描述等',
                        size: 'small',
                        autoSize: { minRows: 2, maxRows: 3 },
                        onChange:(e)=>{
                            wx_refund_price = e.target.value ? e.target.value : '';
                        }
                    }
                )
            ]),
        ]
    ))
    kxyk.Modal.confirm({
        title:'会员设置',
        content:msg,
        okText:'确定',
        zIndex:100000000,
        cancelText:'取消',
        onOk(){
            /** 申请设置用户会员等级 2025-07-01  */
            kxyk.sk.be(Api.shop.E1.P1SetUserTypeVipXY2,{bz:wx_refund_price,eid:E1db.E1 ? E1db.E1.id : 0,vip:vip.id,uid: E1db.give_vip.user.uid},res=>{
                if(res.status){
                    kxyk.msg.success('申请成功，需等待上级管理审核。');
                    if(E1db.give_vip.open){
                        E1db.give_vip.open =false;
                    }
                    if(E1db.SearchUser.open){
                        E1db.SearchUser.open = false;
                    }
                    if(activeName.value !== 'tab3'){
                        activeName.value = 'tab3';
                    }
                    if(E1db.api1){
                        E1db.api1.refresh = !E1db.api1.refresh;
                    }
                }
            })
        }
    })
}


const GetD1 = ()=>{
    return E1db;
}
provide('GetD1',GetD1);
const openRecharge = ()=>
{
    // console.log(111);
    E1db.E3Recharge_open = true;
    
}
watch(
    ()=>E1db.data.open,
    (a,b)=>{
        console.log('a*-*',a,b);

    }
)
/** 设置加载数据状态 - 统计数据 */
const setLoading = (s:any)=>{
    if(!s){
        setTimeout(() => {
            E1db.loading1 = s;
        }, 500);
    }else{
        E1db.loading1 = s;
    }
}
/** 数据查询 - 时间条件数据改动 */
const changeDateTime = ()=>{
    if(E1db.sDate.show){
        gsap.to('.list1323256',{height:'auto',opacity:1,ease:'back.out(1.5)',duration:.5,onComplete:()=>{}});
        E1db.api2.args = E1db.sDate;
        E1db.api2.refresh = !E1db.api2.refresh;
    }else{
        gsap.to('.list1323256',{height:'1px',opacity:0,ease:'back.in(1.7)',duration:.5,onComplete:()=>{ }});
    }
    console.log('这里需要查询数据',E1db.sDate);
    
}
// 打开显示数据详情
const open_detall = ()=>{
    E1db.sDate.show = !E1db.sDate.show;
}
// 弹出设置用户会员窗口
const giveUserVip = (user:any)=>{
    if(E1db.E1 && !E1db.E1.is_E4) return kxyk.msg.error('权限不足！');
    E1db.give_vip.open =false;
    E1db.give_vip.user = user;
    if(!E1db.E1) return kxyk.msg.error('参数错误！')
    kxyk.sk.be(Api.shop.U.GetE1GiveVipList,{eid:E1db.E1.id,uid:user.uid},res=>{
        if(res.status){
            if(res.list){
                E1db.give_vip.list = res.list;
            }
            E1db.give_vip.is_apply = res.is_apply;
            E1db.give_vip.open = true;
            
        }
    })
    E1db.reg.hasUser = user;
}
// 弹出发放余额框
const giveUserYue = (user:any)=>{
    E1db.reg.open = false;
    kxyk.sk.be(Api.shop.U.GetRechargeRule,{cid:E1db.cid},res=>{
        if(res.list){
            E1db.reg.regList = res.list;
            E1db.reg.open = true;
        }
    })
    E1db.reg.hasUser = user;
}
const has_user = ref<any>(null);
const giveUserCoupon = (user:any)=>{
    if(E1db.E1 && !E1db.E1.is_E3) return kxyk.msg.error('权限不足！');
    has_user.value = user;
    if(E1db.E1 && E1db.E1.E3 && E1db.E1.E3.on_list_e3){
        E1db.E1.E3.on_list_e3.forEach(c=>{
            c.s_count = 0;
        })
    }
    E1db.give_coupon.open = true;
}
const clickTag = (r:any)=>{
    E1db.reg.price = r.price;
    formatGive();
}
// 递交发放卡券
const onSubmitCoupon = ()=>
{
    let give_list:any = [];
    if(E1db.E1 && E1db.E1.E3 && E1db.E1.E3.on_list_e3){
        E1db.E1.E3.on_list_e3.forEach(c=>{
            if(c.s_count){
                give_list.push({id:c.pid,name:c.name,count:c.s_count});
            }
        })
    }
    if(give_list.length <= 0 || !has_user.value) return kxyk.msg.error('请选择要发放的卡券');
    kxyk.sk.be(Api.shop.E1.GiveCouponsUser,{uid:has_user.value.uid,coupon:give_list},res=>{
        if(res.status){
            kxyk.msg.success('操作成功.');
            init();
            if(E1db.give_coupon.open){
                E1db.give_coupon.open = false;
            }
            if(E1db.SearchUser.open){
                E1db.SearchUser.open = false;
            }
        }
    })
}
// 递交充值
const onSubmit = ()=>
{
    if(!E1db.reg.price || parseFloat(E1db.reg.price) <= 0) return kxyk.msg.error('请输入充值金额');
    // 管理员充值
    kxyk.sk.be(Api.shop.E1.RechargeYue,{price:E1db.reg.price,uid:E1db.reg.hasUser.uid},res=>{
        if(res.status){
            kxyk.msg.success('充值成功');
            E1db.reg.open = false;
            E1db.SearchUser.ref = !E1db.SearchUser.ref;
            init();
        }
    })
    
}
const formatGive = ()=>
{
    E1db.reg.show = '';
    if(E1db.reg.price)
    {
        let price = parseInt(E1db.reg.price);
        if(price > 0 && E1db.reg.regList.length > 0)
        {
            E1db.reg.regList.forEach((r:any)=>{
                if(E1db.reg.show === '' && price >= r.price)
                {
                    if(r.type === 0)
                    {
                        E1db.reg.show = `触发充值 ￥${r.price} 赠送 ￥${r.give}`;
                    }else{
                        E1db.reg.show = `触发充值 ￥${r.price} 赠送 ${r.name}`;
                    }
                }
            })
        }
    }
}
/** 跳转商城 */
const toUrlMall = ()=>{
    if(E1db.E1){
        kxyk.R?.push('/mall/'+E1db.E1.id)
    }
    
}
/**
 * 发放卡券
 * @param item 任务
 * @param type 0 = 正常发放 1 = 1补额发放
 */
const premium_give = (item:tb.kxyk_mch_coupon_activity_user)=>
{
    let title = '卡券发放',msg = '确定要发放卡券'+item.title+'吗？';
    kxyk.Modal.confirm({
        title: title,
        icon:undefined,
        // okButtonProps:is_sub,
        content: ()=>{
            return h('div',{style:'color:red;'},[msg])
        },okText:'确定',cancelText:'取消',
        onOk(){
            return new Promise((resolve,reject)=>{
                kxyk.sk.be(Api.shop.E1.E1PremiumGive,{cauid:item.id},res=>{
                    if(res.status){
                        let err = ``;
                        if(res.db && res.db.err && res.db.err.length>0){

                            let eNode0 = [h('div',{},[`有${res.db.err.length}张卡券发放失败`])];
                            res.db.err.forEach((e:any) => {
                                eNode0.push(
                                    h('div',{style:'color:red;'},[`${e.pid}发放失败：${e.msg}`])
                                )
                            });
                            let eNode = h('div',{},eNode0);
                            kxyk.Modal.warning({
                                title:'操作完成',
                                content:eNode,
                            })
                        }else{
                            kxyk.msg.success('操作成功');
                        }
                        // dbs.CouponActivityClaim.api.refresh = !dbs.CouponActivityClaim.api.refresh;
                        // init();
                        if(E1db.api){
                            E1db.api.refresh = !E1db.api.refresh;
                        }
                        resolve(true);
                    }
                });
            });
        }
    })
}
/** 拒绝发卡 */
const reject_give = (item:tb.kxyk_mch_coupon_activity_user)=>
{
    console.log(item);
    
    let reject_msg:string|undefined = undefined;
    kxyk.Modal.confirm({
        title: '拒绝发卡',
        icon:undefined,
        // okButtonProps:is_sub,
        content: ()=>{
            return h('div',{style:'color:red;'},[
                h(Input,
                    {
                        placeholder:'如有必要，请输入拒绝理由',
                        onChange:(e)=>{
                            reject_msg = e.target.value;
                        }
                    }
                ),
                h("div",{style:'padding-top: 5px;'},['拒绝理由可不填写'])
            ])
        },okText:'确定拒绝',cancelText:'取消',
        onOk(){
            return new Promise((resolve,reject)=>{
                kxyk.sk.be(Api.shop.E1.E1RejectGive,{cauid:item.id,msg:reject_msg},res=>{
                    if(res.status){
                        kxyk.msg.success('操作成功');
                        if(E1db.api){
                            E1db.api.refresh = !E1db.api.refresh;
                        }
                        resolve(true);
                    }
                });
            });
        }
    })
}
/** 扫码发卡 */
const sanGive = (p:any)=>{
    // console.log(p);
    E1db.scom.open = true;
    // 卡包ID 和 合伙人ID
    E1db.scom.db = {pid:p.pid,eid:E1db.E1 ? E1db.E1.id : 0};
}
/** 初始化 */
const init = ()=>{
    kxyk.sk.be(Api.shop.E1.GetE1dbInit,{cid:E1db.cid},res=>{
        if(res.__error__) E1db.is_err = true;
        if(res.status){
            if(res.db) E1db.E1 = res.db;
            console.log(E1db.E1);
            
            // 开始请求售卡记录
            E1db.is_auth = true;
            // E1db.h = kxyk.utils.DOM.get_surplus_higth(['concon'])-41;
            if(res.CarType){
                E1db.CarType = res.CarType;
            }
        }
    },false)
}

onMounted(()=>{
    /** 指定页面容器高度 */
    kxyk.utils.DOM.get_win_last_higth(['concon','foot']).then(e=>E1db.h = e-41)
    init();
    // 监听用户扫码更新列表事件
    kxyk.sk.on("e1_get_give_list",()=>{
        if(E1db.api){
            E1db.api.refresh = !E1db.api.refresh;
        }
    })

});

</script>


