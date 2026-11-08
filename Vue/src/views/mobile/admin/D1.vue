<style scoped lang="stylus"> 
    @import "./D1.styl"
</style>
<template lang="pug">

div.D1(v-if="!PageD1.is_error")
    //- 顶部
    div.title
        div.t {{PageD1.Store.name}}
        div.bad(@click="PageD1.Sidebar = true") 
            //- el-badge(:value="12" type="warning")
            i.fa.fa-list
    //- 滚动播报通知消息 - 改为任务通知
    div  
        //- StoreNotice(:up="PageD1.is_up_notice")
        StoreTask(:up="PageD1.is_up_notice" :sid="PageD1.Store.id") 
    //- 扫车牌组件
    Camera(:coms="PageD1.CameraComs")
    //- 搜索用户下单
    SearchUser(:coms="PageD1.SearchUser")
    //- 代客下单按钮
    div
        a-row(:gutter="5" style="padding: 5px;") 
            a-col(span="8")
                el-button.w100(:icon="FullScreen" round type="primary" @click="PageD1.CameraComs.open = true") 识别车牌
            a-col(span="8")
                el-button.w100(:icon="Avatar" round type="warning" @click="store.MakeGuestOrder()") 无卡下单
            a-col(span="8")
                el-button.w100(:icon="Search" round type="success" @click="PageD1.SearchUser.open = true") 搜索
    //- ------------没有完成服务 和 新进入页面没有选择服务用户---------------
    div
        //- 没有完成
        div 
        //- 进店还没下单用户
        div.Alist
            transition-group.ant-row.row(v-if="PageD1.Store_.AList.length>0" name="slide-fade" tag="div")
                //- a-row.row(:gutter="7")
                a-col.c6(v-for="Au in PageD1.Store_.AList" :key="Au.uid" :span="6")
                    //- 是否完善过汽车照片
                    //- div 11111111111111
                    //- 是否有车牌
                    div.car(:style="{background:kxyk.user.getUserColor(Au)}" :class="{ask_pay:(Au.order && Au.order.ask_pay)}")
                        //- 是否到店
                        div(v-if="Au.is_coms" style="color: white;")
                            div(v-if="((Au.car && Au.car.length>0 && Au.car[0].number)|| Au.is_guest)"  @click="ShowUser(Au)")
                                //- 非游客
                                div.p2(v-if="!Au.is_guest")
                                    //- 是否完成服务 已完成服务或者代客下单还没下单时显示关闭按钮
                                    div(style="width: 100%;" v-if="Au.status === 5 || (Au.status < 2 && Au.is_valet)")
                                        a-row(style="margin-right: -2px;")
                                            a-col.elesis(span="18") {{Au.car[0].number.slice(0,2)}}·{{Au.car[0].number.slice(2)}}
                                            a-col(span="6" style="background: #fff;border-radius: 3px;" :style="{color:kxyk.user.getUserColor(Au)}" @click.stop="kxyk.user.CloseStoreUser(Au)")
                                                i.fa.fa-close
                                    div(v-else style="position: relative;")
                                        span {{Au.shoping_car.car_number.slice(0,2 )}}·{{Au.shoping_car.car_number.slice(2)}}
                                //- 游客
                                a-row.p3(v-else) 
                                    //- 已经下单
                                    a-col.elesis(v-if="Au.order && Au.status !== 5" span="24") {{Au.nickname}}
                                    a-col.elesis(span="24" v-else)
                                        a-row
                                            a-col.elesis(span="18") {{Au.nickname}}
                                            a-col.close(span="6" v-if="Au.status === 5" :style="{color:kxyk.user.getUserColor(Au)}" @click.stop="kxyk.user.CloseStoreUser(Au)")
                                                i.fa.fa-close
                                            a-col.close(span="6" v-else :style="{color:kxyk.user.getUserColor(Au)}" @click.stop="store.DelGuestOrder(Au)")
                                                i.fa.fa-close
                            //- 没有车牌 需要完善信息
                            div.elesis(v-else @click="SetInfoUser(Au)") 
                                a-row 
                                    a-col.elesis(:span="18") {{Au.nickname ? Au.nickname : Au.phone}}
                                    a-col(:span="6" style ="background: white;border-radius: 3px;text-align: center;line-height: 19px;" :style="{color:kxyk.user.getUserColor(Au)}") 
                                        i.fa.fa-user-plus
                        //- 没到店点击弹出设置到店状态模态框
                        div(v-else @click="PageD1.has_set_coms_id=Au.uid;PageD1.is_set_coms=true" style="color: white;")
                            div.p2(v-if="Au.car && Au.car.length>0 && Au.car[0].number")
                                span {{Au.car[0].number.slice(0,2)}}·{{Au.car[0].number.slice(2)}}
                            //- 没有车牌 需要完善信息
                            div.elesis(v-else style="padding: 0 5px;") {{Au.nickname ? Au.nickname : Au.phone}}
            div.zanwu(v-else) 暂 无 顾 客
        //- 正在排队和服务的列表
        div.Blist
            a-row(v-if="PageD1.Store_.BList.length > 0" :gutter="5")
                a-col(:span="(24/PageD1.Store_.BList.length)" v-for="q in PageD1.Store_.BList" style="background: #f1f1f1;")
                    div.list 
                        div.t1
                            div.n0 --- {{q.item_name}} ---
                            div.n1 {{q.queue_count}}台排队 {{q.server_count}}台服务中
                        div.list2
                            //- a-row.c01(v-if="q.list.length>0")
                            transition-group.ant-row.row.c01(v-if="q.list.length>0" name="user1" tag="div")
                                //- 用户列表 
                                a-col(:span="PageD1.Store_.BList.length === 1 ? 12 : 24" v-for="n in q.list" :key="n.uid")
                                    div.user(v-if="n.order" :class="{'ask_pay':(n.order && n.order.ask_pay)}" :style="{'boxShadow':(n.order && n.order.ask_pay) ? '' : ' 0 0 3px '+getUserColor(n)}") 
                                        div.again(v-if="n.is_again_queue") 
                                            van-count-down(style="color:#fff;font-size: 12px;" :time="(n.is_again_queue + PageD1.Store.user_queue_expire*60)*1000-Date.now()" format="mm分ss秒")
                                            span 后重新抽号
                                        a-row.r1(:style="{'background':getUserColor(n)}")
                                            //-排队号码 
                                            a-col(span="12")
                                                div.row1
                                                    //- 显示VIP
                                                    div.v 
                                                        div(v-if="n.vip") V
                                                            span(v-if="n.vip_jump") +
                                                        div(v-else) Z
                                                    div.m {{n.queue?.number}}
                                            //- 车牌号码
                                            a-col(style="text-overflow: ellipsis;white-space: nowrap;" span="12")
                                                //- 2023 这里使用订单车牌号码
                                                div.car(style="position: relative;" @click="onCarNumber(n)" )
                                                    div.car_number(v-if="n.car.length > 1" :style="{background:getUserColor(n)}") {{ n.car.length }} 
                                                    div(style="font-size: 12px;line-height: 16px;" :style="{color:getUserColor(n)}")
                                                        div.p2 
                                                            //- 这里扩展 大 中 小 
                                                            div.concon
                                                                div.typedian(style="margin-top: 1px;" :style="'background:'+getUserTypeColor(n,1)") 
                                                                div.typedian(:style="'background:'+getUserTypeColor(n,2)") 
                                                                div.typedian(:style="'background:'+getUserTypeColor(n,3)") 
                                                            //- 非游客直接拿车牌号码
                                                            span(v-if="!n.is_guest") {{ n.order.car_number }}
                                                            //- 游客显示临时昵称
                                                            span(v-else) {{ n.nickname }}
                                                            span(style="font-size: 12px;" v-if="n.order.car_number != '游客无车牌'") 
                                                                i.fa.fa-angle-down(style="padding-left: 4px;")
                                        //- 服务名称支付状态
                                        //- 余额进度条
                                        div.ank 
                                            //- div {{ n.money/n.r_money*100 }}
                                            el-progress(:text-inside="true" :stroke-width="3" :percentage="((n.money/200*100) > 100 ? 100 : (n.money/200*100) || 0)" status="warning")
                                        a-row(style="align-items: center;")
                                            //- 一键升级
                                            a-col(:span="(q.is_up && kxyk.user.IsShowUp(n,q)) ? 16 : 24")
                                                div.item(v-if="n.order.detall && n.order.detall.length > 0") 
                                                    div.ddd(v-for="detall in n.order.detall")
                                                        span.tt {{detall.item_name}}
                                                        span(v-if="detall.status2") &nbsp;
                                                        span.qd(v-if="detall.status2") {{detall.status2}}
                                                        
                                                //- 支付状态
                                                div.pay
                                                    //- 已经支付
                                                    div(v-if="n.order.is_pay===2" style="color:#5aa734;") 已付款:￥{{(n.order.cash_price*1+n.order.yue_price*1).toFixed(2)}}
                                                    div(v-else)
                                                        //- 这里后续要计算加单逻辑 
                                                        span.daifu(v-if="n.order.is_pay === 1") 待付款:￥{{(n.order.cash_price*1).toFixed(2)}} &nbsp;
                                                        span.daifu(v-else) 待付款:￥{{(n.order.cash_price*1+n.order.yue_price*1).toFixed(2)}} &nbsp;
                                            a-col(v-if="q.is_up && kxyk.user.IsShowUp(n,q)" span="8")
                                                div.up_str(@click="kxyk.user.UpItemServer(n)") 
                                                    div 升级
                                                    div {{q.up_str}}

                                        a-row(:gutter="4" style="padding: 2px;justify-content: space-between;")
                                            //- 功能按钮左边
                                            a-col(span="11")
                                                el-button(v-if="n.is_coms" style="width: 100%;" :color="getUserColor(n)" type="primary" @click.stop="ShowUser(n)") 订单/服务
                                                el-button(v-else style="width: 100%;" type="warning"  @click="PageD1.has_set_coms_id=n.uid;PageD1.is_set_coms=true") 订单/服务
                                                
                                            //- 功能右边按钮
                                            a-col(span="11")
                                                //- 是否到店
                                                div(v-if="n.is_coms")
                                                    //- 是否支付
                                                    div(v-if="n.order.is_pay === 2")
                                                        //- div {{n.order.detall}}
                                                        //- 先找有没有可以结束的服务
                                                        div(v-if="__.find(n.order.detall,{is_spec:1,status:1})")
                                                            el-button(style="width: 100%;border-radius:5px 0px 5px 5px" @click="store.OnEndService(n,__.find(n.order?.detall,{is_spec:1,status:1}))" plain :color="getUserColor(n)") 
                                                                //- 如果没有配置排队服务时间 就不显示超时数据
                                                                div(v-if="!!__.find(kxyk.user.D1Page?.Store_.BList,{goods_id:__.find(n.order.detall,{is_spec:1,status:1})?.goods_id,item_name:__.find(n.order.detall,{is_spec:1,status:1})?.item_name})")
                                                                    //- 如果当前服务还没有超时
                                                                    div.T1time(v-if="!store.IsOvertime(n)") 
                                                                        //- i.fa.fa-cog.fa-spin
                                                                        van-count-down(:time="store.GetItemT1CountDown(n)" format="mm:ss" @finish="store.SetItemOverTime(n)" :style="{color:getUserColor(n),fontSize:'10px',lineHeight:'16px'}")
                                                                        span &nbsp;
                                                                        van-icon(name="success")
                                                                    div.T1time(v-else style="color: red;")
                                                                        div(style="font-size: 10px;line-height: 16px;") {{__.find(n.order.detall,{is_spec:1,status:1})?.overtime}}
                                                                        span &nbsp;
                                                                        van-icon(style="font-size:10px" name="clock-o")
                                                                div 完成{{__.find(n.order.detall,{is_spec:1,status:1})?.item_name}}
                                                        div(v-else)
                                                            //- 开始服务按钮
                                                            el-button(v-if="n.status <= 4" plain :color="getUserColor(n)" style="width: 100%;" @click="store.OnStartService(n,__.find(n.order?.detall,{is_spec:1,status:0}))" ) 开始{{__.find(n.order.detall,{is_spec:1,status:0})?.item_name}}
                                                    //- 没有支付
                                                    div(v-else)
                                                        el-button(style="width: 100%;" plain :color="getUserColor(n)" @click="store.OnOrderPay(n)") 现金收款
                                                div(v-else)
                                                    el-button(style="width: 100%;" plain  @click.native="kxyk.toPhone(n.phone)") 一键拨号
                                        //- 扩展完善用户车辆照片
                                        div.add_info
                                            el-button.add_(:icon="Plus" circle @click.stop="openAddUserInfo(n)")
                            div.c02(v-else) 
                                div.zw 暂无排队用户
        //- 统计板块        
        div.statistics(v-if="PageD1.is_d1")
            //- 数据统计
            //- Statistics(:coms="PageD1.Statistics") 
            C1Count(@unfold="" :compar="compar") 
                
        //- 今日订单
        div.DayOrder
            div.title2
                a-row
                    a-col.l(span="12" @click.native="refreshDayOrder") 
                        i.fa.fa-refresh &nbsp;
                        span 今日订单({{PageD1.Store_.DayOrder.length}})
                    a-col.r(span="12")
                        div
                            el-popover(trigger="click")
                                div 授信额度为负数时，门店管理员无法手动为用户充值或发卡。
                                template(#reference)
                                    div(:class="[PageD1.Store_.sxed > 0 ? 'sxed1' : 'sxed0']") 
                                        span(v-if="PageD1.Store_.sxed > 0") +
                                        span {{ PageD1.Store_.sxed }}&nbsp;
            div.content2(v-loading="dayOrderRefresh")
                a-row.order_user(v-for="(order,index) in PageD1.Store_.DayOrder")
                    a-col.av1(span="8")
                        div.avav
                            div.index_ {{index+1}}
                            img.avatar(v-if="order.avatar" :src="order.avatar")
                            div.avatar(style="display: flex; justify-content: center; align-items: center;" v-else)
                                i.fa.fa-user.fa-2x
                        div.name1
                            div.nickname.elesis {{order.nickname}}
                            div.nickname.elesis(v-if="!order.nickname && !order.avatar && !order.number") 游客用户
                            div.time
                                span {{order.t2}}
                    a-col(span="6") 
                        div(v-if="formatStatus2(order)")
                            div.s5 {{formatStatus2(order)}}
                        div 合计：
                            span.price ￥{{order.order_price}}
                    a-col(span="8")
                        div(v-if="order.t1>0") 
                            div.s6 {{ order.number }}
                            div {{kxyk.utils.DOM.format_ms(order.t1)}}
                        div(v-else)
                            span 商品
                    a-col(span="2")
                        i.fa.fa-chevron-right
    //----------------------完善用户信息组件-------------------
    StoreRegInfo(:user="set_user_info" :cartype="PageD1.CarType" @save-end="SaveEnd" @end="InfoUserClose" :sid="PageD1.Store.id") 
    //----------------------会员首页组件-----------------------
    div(ref="open_user")
        a-modal(v-model:visible="PageD1.is_show_user" :footer="null" :getContainer="()=>open_user" width="100%" wrap-class-name="full-modal")
            template(#title)
                span 用户管理&nbsp;
                span(v-if="PageD1.Store.StoreMember.queue" style="font-size: 12px;color: #979797;") (V{{PageD1.Store.StoreMember.queue.number}}) 
            StoreMemberIndex(:Store="PageD1.Store" :car-type="PageD1.CarType" )
    //----------------------设置到店模态框---------------------
    a-modal(v-model:visible="PageD1.is_set_coms" :maskClosable="false" cancelText="取消" @ok="set_coms" okText="手动设置用户到店" title="远程预约用户")
        div(style="color: #ff6666;text-shadow: 0 0 2px #ff4949;")
            div 1：未到店用户无法进行管理
            div 2：确认用户已经到店可手动设置用户到店
            div 3：关闭窗口或点击取消按钮不改变用户状态
    //----------------------点击车牌设置用户订单---------------------
    div.on_car(ref="on_car")
        a-drawer(:width="100" title="车牌及切换订单管理" height="50%" :maskClosable="false" :getContainer="()=>on_car" placement="top" :visible="ConfigOrder.open" @close="ConfigOrder.open=false" )
            template(#footer)
                div(style="text-align: right;")
                    a-button(style="margin-right: 8px" @click="ConfigOrder.open = false;ConfigOrder.ccar=[]") 取消
                    a-button(style="margin-right: 8px" type="primary" :loading="ConfigOrder.loading" @click="onSwSubmit") 确定
            div.sworder(v-if="ConfigOrder.u")
                a-row(:gutter="5")
                    a-col(span="12")
                        div.t1 已下订单 
                        div.t2(v-if="ConfigOrder.u && ConfigOrder.u.order && ConfigOrder.u.order.detall")
                            div.t21(v-for="o in ConfigOrder.u.order.detall")
                                span {{ o.is_spec ? '服务' : '商品' }}
                                span ：{{ o.item_name }} {{ o.price }} 元
                            div.t22 共计 {{ ConfigOrder.u.order.order_price }} 元
                    a-col(span="12")
                        div.t1 切换订单
                        div.t2(v-if="ConfigOrder.detall.length > 0" style="color: #1890ff;")
                            div.t21(v-for="n in ConfigOrder.detall")
                                span {{ n.is_spec ? '服务' : '商品' }}
                                span ：{{ n.item_name }} {{ n.price }} 元
                            div.t22 共计 {{ ConfigOrder.price }}
                        div.t2(v-else)
                            div.t21(style="color: #bdbdbd;") 暂无切换
                div.t3(v-if="ConfigOrder.detall.length > 0 && ConfigOrder.u && ConfigOrder.u.order") 订单差额 
                    span(:style="{color:ConfigOrder.u.order.order_price > ConfigOrder.price ? 'red' : 'green'}") 
                        span(v-if="ConfigOrder.u.order.order_price > ConfigOrder.price") +
                        span {{ ConfigOrder.u.order.order_price - ConfigOrder.price }} &nbsp;
                    span 元
                div.t3(v-else style="color:#888;") 暂无对比数据
                transition-group.t4(v-if="ConfigOrder.ccar.length > 0" tag="div" name="user2")
                    div(v-for="(c,index) in ConfigOrder.ccar" :key="c.id")
                        div
                            a-row.t41(:class="{ask_pay:c.is_add}")
                                a-col(span="6")
                                    div.t411(v-if="!c.is_add" :class="{ 't412' : c.sw_select }" @click="onSelectCarNumber(c)") {{ c.number }}
                                    div.t411(v-else)
                                        CarKeyboard(v-model:number="c.number" :show="c.is_show" @cancel="c.is_show = false" @end="c.is_show=false")
                                        el-input(v-model="c.number" readonly @click="c.is_show = true;" placeholder="车牌号")
                                //- 选择大中小
                                a-col(span="15")
                                    a-radio-group(v-model:value="c.type" @change="getConfigOrderDetall" button-style="solid" :disabled="(!c.sw_select && !c.is_add)")
                                        a-radio-button(v-for="ct in PageD1.CarType" :value="ct.id" :key="ct.id") {{ ct.name }}
                                a-col(:span="c.is_add ? 24 : 3")
                                    a-row(:gutter="5" v-if="c.is_add" style="padding-top: 5px;")
                                        a-col(span=12)
                                            el-button(type="danger" style="width:100%" @click="delNoSaveCar(c)") 删除
                                        a-col(span=12)
                                            el-button(type="success" style="width:100%" @click="saveTempCar(c)") 保存
                                    div(v-else)
                                        div(v-if="ConfigOrder.u && ConfigOrder.u.order && ConfigOrder.u.order.car_number == c.number")
                                            div(style="color: #c1c1c1;font-size: 12px;") 已下单
                                        el-button(v-else type="danger" :icon="Delete" circle @click="delSaveCar(c)")
                div 
                    el-button(type="primary" :icon="Plus" @click="addUserCarNumber") 添加新车牌
    //---------------------- 侧边栏 -----------------------
    a-drawer(placement="left" :get-container="false" :closable="false" :visible="PageD1.Sidebar" :style="{transform:'translateX(0px)'}" @close="PageD1.Sidebar = false" width="240")
        template(#title)
            div.sidebar
                div.t 
                    div
                        img.img(v-if="PageD1.Store.img" :src="PageD1.Store.img")
                    div(style="margin-top: 10px;") {{PageD1.Store.name}}
                    div {{PageD1.Store.phone}}
                    div.map.elesis
                        i.fa.fa-map-marker
                        span &nbsp;{{PageD1.Store.address}}
        div.menu
            div(@click="set_store_config=true") 门店设置&nbsp;&nbsp;
                i.fa.fa-angle-right
            div(v-if="set_store_config" ref="set_config")
                a-modal(v-model:visible="set_store_config" title="店内设置" :footer="null" :getContainer="()=>set_config" width="100%" wrap-class-name="full-modal")
                    StoreSetConfig(:sid="5" @cancel="set_store_config = false;GetStoreInitD1()") 
        div.menu(@click="set_member_config=true") 
            div 员工设置&nbsp;&nbsp;
                i.fa.fa-angle-right
        div(v-if="set_member_config" ref="set_member_config_ref")
            a-modal(v-model:visible="set_member_config" title="员工设置" :footer="null" :getContainer="()=>set_member_config_ref" width="100%" wrap-class-name="full-modal")
                StoreSetMemberConfig(:Store="PageD1.Store" @cancel="set_member_config = false;") 
        div.menu(@click="PageD1.CouponActivity.open = true;nextTick(()=>{PageD1.CouponActivity.refresh = !PageD1.CouponActivity.refresh})")
            div 购卡活动&nbsp;&nbsp;
                i.fa.fa-angle-right
        div(v-if="PageD1.CouponActivity.open" ref="task_ref")
            a-modal(v-model:visible="PageD1.CouponActivity.open" title="购卡活动" :footer="null" :getContainer="()=>task_ref" width="100%" wrap-class-name="full-modal")
                ActivityList(style="text-align: left;" :role="'D1'" :role_id="PageD1.Store.id" :refresh="PageD1.CouponActivity.refresh")
        div.menu 股东信息&nbsp;&nbsp;
            i.fa.fa-angle-right
    //---------------------- 扩展信息完善模态框 ---------------------
    div.add_user_info(ref="add_user_info_div")
        a-modal(v-model:visible="is_open_add_user_info" @ok="saveAddUserInfo" @cancel="cancel_add_user_info" :getContainer="()=>add_user_info_div" :maskClosable="true" cancelText="取消" okText="保存" title="完善用户扩展信息")
            div(v-loading="is_submit_add_user_info_loading")
                div(v-if="hasAddUserInfo")
                    div(style="overflow: hidden; padding: 8px;")
                        UploadImg(v-model:url="hasAddUserInfo.car_photo" @change="")
                //- div(style="padding: 0 8px;" v-if="hasAddUserInfo && null !== hasAddUserInfo.job")
                //-     a-form-item(style="margin-bottom: 6px;" :labelCol="{span:0}" :wrapperCol="{span:24}" has-feedback label="" name="nickname")
                //-         a-input( addon-before="用户职业" v-model:value="hasAddUserInfo.job" autocomplete="off" @change="")
                div(v-if="hasAddUserInfo" style="padding: 0 8px;")
                    div.ant-input-group-wrapper
                        span.ant-input-wrapper.ant-input-group
                            span.ant-input-group-addon 用户标签
                            span
                                a-select(v-model:value="hasAddUserInfo.tags_tem" :options="options"  mode="tags" placeholder="请输入个任意标签" style="width: 100%")
                            span.ant-input-group-addon(style="background: var(--antd-wave-shadow-color);color: var(--el-color-white);")
                                span(@click="addUserInfoTag") 添加标签
                div.tags(v-if="hasAddUserInfo && hasAddUserInfo.tags && hasAddUserInfo.tags.length > 0")
                    el-tag(v-for="(tag,index) in hasAddUserInfo?.tags" effect="dark" @close="closeTags(tag)" class="mx-1" closable type="success" ) {{ tag.str }}
                div.tags.noTags(v-else)
                    span 暂无标签


div.error(v-else)
    a-result(status="500" :title="PageD1.error_title" :sub-title="PageD1.error_msg")
</template>

<script lang="ts">

import { coms } from 'smkj'; 
import C1Count from "./C1/Count.vue";
export default { 
    name: "D1", 
    components:{
        StoreRegInfo:coms.StoreRegInfo,StoreMemberIndex:coms.StoreMemberIndex,StoreTaskConfig:coms.StoreTaskConfig,
        StoreSetMemberConfig:coms.StoreSetMemberConfig,CarKeyboard:coms.CarKey,
        StoreSetConfig:coms.StoreSetConfig,StoreNotice:coms.StoreNotice,Camera:coms.Camera,SearchUser:coms.SearchUser,
        StoreTask:coms.StoreTask,C1Count:C1Count,
        ActivityList:coms.CouponActivityList,UploadImg:coms.UploadImg
    }
};
</script>
<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted,nextTick,watch,provide} from "vue";
import { FullScreen , Search ,Avatar,Delete,Plus} from "@element-plus/icons-vue";
import { UserOutlined, DownOutlined } from '@ant-design/icons-vue';
import Statistics from "@/views/mobile/admin/D1/Statistics.vue";
import {kxyk,Api,io,store,__} from "smkj";
import { useRouter,useRoute } from "vue-router";

/** 路由 */
const route = useRoute();
/** 完善信息是缓存用户数据 1 */
let set_user_info = reactive<any>({is_reg:false});
/** 是否门店上级的老板登录 */
// const is_boss = route.query.boss?true:false;
const open_user=ref(null);//挂载快速管理用户的ref层
const on_car=ref(null);//挂载切换车牌ref层
const set_config=ref(null);//挂载门店设置ref层
const set_member_config_ref=ref(null);//挂载门店设置ref层
const task_ref=ref(null);//挂载任务管理层
const set_store_config = ref(false);//是否显示门店设置组件
const set_member_config = ref(false);//是否显示会员设置弹框
const dayOrderRefresh = ref(false);//今日数据刷新控制器
const couponActivityRefresh = ref(false);//购卡活动组件控制器
const compar:any = reactive({
    role:'D1',ID:parseInt(route.params.store_id as string)
})
/** 点击车牌 */
const ConfigOrder = reactive<
    {
        /** 是否显示切换窗口 */
        open:boolean,
        /** 当前操作的用户 */
        u:sm.StoreMember|null,
        /** 当前选择的车牌ID - 如果有值标识订单车牌和选择车牌不一致，记录为选择车牌 */
        select:number,
        /** 切换订单列表 */
        detall:sm.OrderDetall[],
        /** 新切换订单总额 */
        price:number,
        /** 递交状态按钮 */
        loading:boolean,
        /** 缓存用户车牌数组 */
        ccar:sm.UserCarMember[],

    }
>({open:false,u:null,select:0,detall:[],price:0,loading:false,ccar:[]});
/** 保存临时添加车牌 */
const saveTempCar=(c:sm.UserCarMember)=>
{
    if(!kxyk.utils.regx.is_vehicle_number(c.number)) return kxyk.msg.error('车牌填写错误！');
    if(!c.type) return kxyk.msg.error('请选择车型！');
    if(!ConfigOrder.u || !ConfigOrder.u.uid) return kxyk.msg.error('用户ID错误！');
    kxyk.sk.be(Api.shop.D1.SaveTempCar,{number:c.number,type:c.type,uid:ConfigOrder.u.uid},res=>{
        if(res.status){
            kxyk.msg.success('添加成功.');
            if(res.id) c.id = res.id;
            c.is_add = false;
        }else{
            kxyk.msg.error('网络错误，请稍后重试！');
        }
    })
}
/** 删除已保存车牌 */
const delSaveCar=(c:sm.UserCarMember)=>
{
    kxyk.Modal.confirm({
            title: '删除车牌',
            icon:undefined,
            // okButtonProps:is_sub,
            content:`您确定要删除${c.number}车牌吗？`,okText:'确定',cancelText:'取消',
            onOk(){
                kxyk.sk.be(Api.shop.D1.DelCarNumberD1,{uid:ConfigOrder.u?.uid,id:c.id},res=>{
                    if(res.status)
                    {
                        kxyk.msg.success('删除成功.');
                        delNoSaveCar(c);
                    }
                })
            }
        })
}
/** 删除未保存车牌 */
const delNoSaveCar=(c:sm.UserCarMember)=>
{
    __.remove(ConfigOrder.ccar,c);
    let has = kxyk.utils.find(ConfigOrder.ccar,{sw_select:true});
    if(!has){
        ConfigOrder.ccar.forEach(a=>{
            if(ConfigOrder.u && ConfigOrder.u.order && ConfigOrder.u.order.car_number == a.number){
                a.sw_select = true;
                getConfigOrderDetall();
            } 
        })
    }
}
/** ----------------- 扩展信息完善功能 start --------------- */
const hasAddUserInfo = ref<null | sm.StoreMember>(null);
const is_open_add_user_info = ref(false);
const add_user_info_div = ref(null);
const is_submit_add_user_info_loading = ref(false);
const options = ref<{value:any,label:any}[]>([]);
const cancel_add_user_info = ()=>{
    hasAddUserInfo.value = null;
}
const closeTags = (item:tb.kxyk_circle_member_tags)=>{
    if(hasAddUserInfo.value && hasAddUserInfo.value.tags){
        __.remove(hasAddUserInfo.value.tags,item);
    }
}
const saveAddUserInfo = ()=>{
    is_submit_add_user_info_loading.value = true;
    kxyk.sk.be(Api.shop.D1.SaveAddUserInfoTow,{car_photo:hasAddUserInfo.value?.car_photo,tags:hasAddUserInfo.value?.tags,uid:hasAddUserInfo.value?.uid},res=>{
        is_submit_add_user_info_loading.value = false;
        if(res.status){
            is_open_add_user_info.value = false;
            hasAddUserInfo.value = null;
        }
    })
}
const addUserInfoTag = ()=>{
    if(hasAddUserInfo.value){
        let set = new Set(hasAddUserInfo.value.tags?.map((item)=>item.str));
        if(hasAddUserInfo.value.tags_tem){
            hasAddUserInfo.value.tags_tem.forEach(e=>{
                if(!set.has(e)){
                    hasAddUserInfo.value?.tags?.push({str:e,uid:hasAddUserInfo.value.uid,cid:hasAddUserInfo.value.cid,add_uid:0})
                }
            })
        }
        hasAddUserInfo.value.tags_tem = []
    }
}
const openAddUserInfo = (u:sm.StoreMember)=>{

    hasAddUserInfo.value = u;
    if(!hasAddUserInfo.value.car_photo){
        hasAddUserInfo.value.car_photo = '';
    }
    if(!hasAddUserInfo.value.job){
        hasAddUserInfo.value.job = '';
    }
    if(!hasAddUserInfo.value.tags_tem){
        hasAddUserInfo.value.tags_tem = [];
    }
    is_open_add_user_info.value = true;
}
/** ----------------- 扩展信息完善 end --------------------- */


/** 添加车牌 */
const addUserCarNumber=()=>
{
    ConfigOrder.ccar.push({
        id:0,number:'',name:'',type:0,is_show:false,is_add:true
    })
}
// 选择车牌
const onSelectCarNumber=(c:sm.UserCarMember)=>
{
    if(!c.sw_select)
    {
        //清空所有选择
        ConfigOrder.ccar.forEach(a=>{
            a.sw_select = false;
        })
        c.sw_select = true;
        // 开始读取对应车型
        getConfigOrderDetall();
    }else{
        // 已选本车牌不处理
    }
}
/** 切换车型或车牌后读取比对订单数据 */
const getConfigOrderDetall=()=>
{
    ConfigOrder.price = 0;
    ConfigOrder.detall = [];
    // 当前选择车牌
    let hasCar = kxyk.utils.find(ConfigOrder.ccar,{sw_select:true}) as sm.UserCarMember;
    /** 由于车型ID被绑定在自选框，查询数据使用的中文名称，所以重新查询一下备选车型中文名称 */
    if(hasCar){
        let carName:any = kxyk.utils.find(PageD1.CarType,{id:hasCar.type});
        if(carName){
            hasCar.name = carName.name;
        }
    }
    // 订单内车牌
    if(!ConfigOrder.u) return false;
    let orderCar = kxyk.utils.find(ConfigOrder.u.car,{number:ConfigOrder.u?.order?.car_number}) as sm.UserCarMember;
    if(hasCar && orderCar)
    {
        // 是否更新订单车牌号码
        if(hasCar.number != hasCar.number)
        {
            // 车牌不一样更新车牌
            ConfigOrder.select = hasCar.id;
        }
        // 是否更新对比车型
        if(hasCar.type != orderCar.type)
        {
            // 这里开始读取新车型detall
            if(ConfigOrder.u && ConfigOrder.u.order && ConfigOrder.u.order.detall){
                ConfigOrder.u.order.detall.forEach(i=>{
                    // 新老车型都在同一个商品下
                    let goods = kxyk.utils.find(PageD1.Store.goods,{id:i.goods_id}) as sm.good;
                    if(goods)
                    {
                        if(goods.is_spec){
                            let newType = kxyk.utils.find(goods.spec,{spec_name:hasCar.name}) as sm.spec;
                            if(newType){
                                newType.suk.forEach(item=>{
                                    item.items.forEach(ii=>{
                                        if(ii.item_name == i.item_name)
                                        {
                                            // console.log('命中item',ii);
                                            let newSpecItem:sm.OrderDetall = {
                                                oid:0,goods_id:goods.id,item_id:ii.id,item_name:ii.item_name,is_pay:0,is_spec:1,count:0,
                                                price:ConfigOrder.u?.is_guest ? ii.price : ii.v_price,
                                                is_discount:0, pay_price:0, discount:0,coupon_type:0,coupon_id:0,is_add_order:0,
                                                add_time:0,status:0,status2:'',t1:0,t2:0,t3:0,rate:0,msg:'',coupon_ids:[]
                                            }
                                            ConfigOrder.detall.push(newSpecItem);
                                            ConfigOrder.price += newSpecItem.price;
                                        }
                                    })
                                })
                            }else{
                                kxyk.msg.error(hasCar.name+'关联规格查询错误！');
                            }
                        }else{
                            let newGoodItem:sm.OrderDetall = {oid:0,goods_id:goods.id,item_id:0,item_name:goods.goods_name,is_pay:0,is_spec:0,count:i.count
                                ,price: (ConfigOrder.u?.is_guest ? goods.price : goods.v_price) || 0,
                                is_discount:0,pay_price:0,discount:0,coupon_type:0,coupon_id:0,is_add_order:0,
                                add_time:0,status:0,status2:'',t1:0,t2:0,t3:0,rate:0,msg:'',coupon_ids:[]
                            }
                            ConfigOrder.detall.push(newGoodItem);
                            ConfigOrder.price += newGoodItem.price;
                        }
                        
                    }else{
                        kxyk.msg.error('商品或服务查询错误！')
                    }
                })
            }
        }
    }
}
// 提交更换订单
const onSwSubmit = ()=>
{
    // console.log('即将递交',ConfigOrder);
    // ConfigOrder.loading = true;
    let hasCar = kxyk.utils.find(ConfigOrder.ccar,{sw_select:true}) as sm.UserCarMember;
    // console.log('当前选择前端数据',hasCar);
    if(!ConfigOrder.u || !ConfigOrder.u.order || !hasCar) return kxyk.msg.error('用户数据错误！');
    let oCar = kxyk.utils.find(ConfigOrder.u.car,{number:ConfigOrder.u.order.car_number}) as sm.UserCarMember;
    // console.log('当前订单车牌数据',oCar);
    // 当前选择车牌的原始数据
    let hasCarOriginal = kxyk.utils.find(ConfigOrder.u.car,{id:hasCar.id}) as sm.UserCarMember;
    // console.log('当前选择原始数据',hasCarOriginal);
    
    let send = {
        uid:ConfigOrder.u.uid,
        // 是否更换订单车牌 - 如果有值就更换
        number:'',
        // 是否更换车型 - carid + type = 车牌ID + 类型ID
        carid:0,type:0,
        // 切换的订单详情
        detall:ConfigOrder.detall
    }
    //  判断是否更换订单车牌
    if(hasCar.number != oCar.number)
    {
        send.number = hasCar.number;
    }
    // 判断是否需要修改用户车型
    if(hasCar.type != hasCarOriginal.type)
    {
        send.carid = hasCarOriginal.id;
        send.type = hasCar.type;
        // console.log('修改'+hasCar.number+',把'+hasCarOriginal.name+'改为'+hasCar.name);
    }
    if(!send.carid && !send.number){
        ConfigOrder.open = false;
        return kxyk.msg.info('无需操作.');
    } 
    if(send.carid && send.type)
    {
        kxyk.Modal.confirm({
            title: '切换车型',
            icon:undefined,
            // okButtonProps:is_sub,
            content:`您确定要把${hasCar.number}从 ${hasCarOriginal.name} 改为 ${hasCar.name} 吗？`,okText:'确定',cancelText:'取消',
            onOk(){
                kxyk.sk.be(Api.shop.D1.OnSwSubmit,{send:send},res=>{
                    if(res.status)
                    {
                        kxyk.msg.success('操作成功.');
                        ConfigOrder.open = false;
                    }else{
                        kxyk.msg.error(res.msg)
                    }
                })
            }
        })
    }else{
        kxyk.sk.be(Api.shop.D1.OnSwSubmit,{send:send},res=>{
            if(res.status){
                kxyk.msg.success('操作成功.');
                ConfigOrder.open = false;
            }else{
                kxyk.msg.error(res.msg)
            }
        })
    }
    return false;
}

/** 管理员点击车牌号码 */
const onCarNumber=(u:sm.StoreMember)=>
{
    if(!u.is_guest)
    {
        ConfigOrder.ccar = JSON.parse(JSON.stringify(u.car));//克隆用户车牌
        // 指定默认选中的车牌
        ConfigOrder.ccar.forEach(c=>{
            if(u.order && c.number == u.order.car_number)
            {
                c.sw_select = true;
            }else{
                c.sw_select = false;
            }
            // 添加是否新增属性- 否
            c.is_add = false;
        })
        ConfigOrder.u = u;
        ConfigOrder.open = true;
        
    }
    // console.log('开始读取用户数据',u);
}
const refreshDayOrder = ()=>
{
    dayOrderRefresh.value =true;
    kxyk.sk.be(Api.shop.D1.RefreshDayOrder,{},res=>{
        dayOrderRefresh.value = false;
        if(res.status)
        {
            PageD1.Store_.DayOrder = res.list as any;
            PageD1.Store_.sxed = res.sxed;
            kxyk.msg.success('刷新成功.');
        }
    })
}
const formatStatus2 = (o:sm.Order)=>{
    if(o.detall && o.detall.length > 0)
    {
        let status2 = ''; 
        o.detall.forEach(d=>{
            if(d.status2){
                status2 += d.status2;
            }
        })
        return status2;
    }
    return false;
}
let counta = 0;
/** 计算用户车型标识颜色 */
const getUserTypeColor = (u:sm.StoreMember,n:number)=>
{
    if(PageD1.Store.goods.length > 0)
    {
        let ret = '#bfbfbf';
        if(u.order && u.order.detall && u.order.detall.length > 0)
        {
            let detall = kxyk.utils.find(u.order.detall,{'is_spec':1}) as sm.OrderDetall;
            if(detall){
                let g = kxyk.utils.find(PageD1.Store.goods,{id:u.order.detall[0].goods_id}) as sm.good;
                if(g && g.spec && g.spec.length > 0)
                {
                    g.spec.forEach(su=>{
                        if(su.suk.length > 0)
                        {
                            su.suk.forEach(i=>{
                                i.items.forEach(ii=>{
                                    if(ii.id == detall.item_id)
                                    {
                                        switch (su.spec_name) {
                                            case '小型车':
                                                if(n == 1)
                                                {
                                                    ret = getUserColor(u);
                                                }
                                                break;
                                            case '中型车':
                                                if(n <= 2)
                                                {
                                                    ret = getUserColor(u);
                                                }
                                                break;
                                            case '大型车':
                                                ret = getUserColor(u);
                                                break;
                                        }
                                    }
                                })
                            })
                        }
                    })
                }
            }
        }
        return ret;
    }else{

        setTimeout(()=>{
            counta++;
            return getUserTypeColor(u,n);
        },100);
    }
}
/** 计算排队用户边框颜色 */
const getUserColor = (u:sm.StoreMember)=>
{
    // console.log(u.is_coms);
    
    if(!u.is_coms)
    {
        //未到店
        return "#e6a23c";
    }
    if(u.status === 2){
        //未支付
        return "#3388ff";
    }
    if(u.status === 3 )
    {
        //已支付 
        return "#47b381";
    }
    if(u.status === 4){
        //正在服务
        return "#a247b3";
    }
    if(u.status === 5){
        //完成服务
        return "#979797";
    }
    return 'red';
}
// 用户管理
const ShowUser = (user:sm.StoreMember)=>
{
    // console.log(user);
    PageD1.is_show_user = true;
    nextTick(()=>{
        PageD1.Store.StoreMember = user;
    })
}
const set_coms= ()=>
{
    /** 到店操作提醒 设置到店状态 */
    store.SetUserComs(PageD1.Store.id,PageD1.has_set_coms_id);
}
/** 完善用户信息 */
const SetInfoUser = (user:sm.StoreMember) =>
{
    /** 修改门店下用户数据为需要修改的用户数据 */
    Object.assign(set_user_info,JSON.parse(JSON.stringify(user)));
    set_user_info.is_reg = true;
}
/** 共享完善用户信息方法 */
const GetD1 = ()=>{
    return PageD1;
}
provide('SetInfoUser',SetInfoUser);
provide('GetD1',GetD1);

const InfoUserClose=()=>
{
    /**取消完善信息 */
    set_user_info.is_reg = false;
}
const SaveEnd = ()=>
{
    // 完善用户信息完成

}

/** 页面所有数据 */
const PageD1 = reactive<sm.PageD1>({
    pageName:'D1',
    status:false,//页面权限是否准备好
    is_error:false,//页面是否有错误
    is_boss:route.query.boss?true:false,
    error_title:'',//错误标题
    is_sync:false,
    error_msg:'',//错误描述
    Sidebar:false,//侧边栏是否打开
    is_set_coms:false,//是否显示到店状态模态框
    has_set_coms_id:0,//当前准备设置到店状态的用户ID
    is_show_user:false,//是否显示用户sindex组件
    is_up_notice:false,//控制门店通知更新
    CarType:[],//车型列表
    CameraComs:{open:false},//扫描车牌组件数据
    SearchUser:{open:false,type:0,cid:0},//搜索会员组件数据
    CouponActivity:{open:false,refresh:false},//购卡活动组件数据
    Statistics:{refresh:false},
    is_d1:false,
    Store_:{
        AllList:[],//所有用户数据
        DelayList:[],//延期完成的用户列表
        AList:[],//进店没下单或下单无需配对用户
        BList:[],//正在排队 开始服务 等待结束服务 用户
        Summary:[],//营业数据汇总 - 带有时间查询条件
        DayOrder:[],//今日订单列表
        sxed:0,
        Staff:{
            count:0,list:[]
        }
    },
    Store:{
        has_type_car:'',user_end_expire:0,user_queue_expire:0,user_queue_notice:0,
        id:parseInt(route.params.store_id as string),name:'',goods:[],img:'',address:'',lat:'',lng:"",cid:0,operate_end:'',operate_start:'',phone:'',status:1,status_msg:'',
        /** 更新各用户状态 */
        StoreMember:
        {
            uid:0,is_reg:false,phone:'',s_money_cache:0,s_money:0,money_cache:0,coupons_cache:[],vip_cache:0,vip_name_cache:'',cid:0,nickname:'',status:0,is_coms:false,is_follow:0,r_money:0,vip_name:'',vip_jump:0,
            avatar:'',money:0,car:[],vip:0,shoping_car:{glist:[],yue:0,cash:0,discount:0,car_number:''},coupons:[],is_make_order:0,annual:[]
        }
    }
});
watch(
    /** 监控用户变化 */
    ()=>PageD1.is_show_user,
    (newCar,olCar)=>{
        // if(!newCar) PageD1.Store.StoreMember.uid = 0;
    },
)

// 首页初始化
const GetStoreInit=()=>
{
    // 门店ID错误
    if(!PageD1.Store.id)
    {
        PageD1.is_error = true;
        PageD1.error_title = '门店ID错误';
        PageD1.error_msg = "请稍后重试或联系管理员";
        return false;
    }
    // 初始化用户端门店首页
    kxyk.sk.be(Api.shop.U.GetStoreInit,{id:PageD1.Store.id,D1:1},res=>{
        if(res.status){ 
            // 成功接口
            PageD1.status = true;
            PageD1.Store = Object.assign(PageD1.Store,res.Store);//门店数据
            PageD1.CarType = res.CarType;
            if(res.Tags && res.Tags.length){
                res.Tags.forEach((i:tb.kxyk_circle_member_tags)=>{
                    options.value.push({value:i.str,label:i.str});
                })
            }
            // 更新搜索用户组件CID
            if(res.Store && res.Store.cid) PageD1.SearchUser.cid = res.Store.cid;
            // 这里注册进入页面
            kxyk.SetPage(PageD1);
            //初始化店铺内存数据
            GetStoreInitD1();
        }else{
            PageD1.is_error = true;
            PageD1.error_title = res.msg?res.msg:'';
            PageD1.error_msg = res.submsg?res.submsg:'';
        }
    });
}
/** 因性能问题独立加载商品服务 */
const GetStoreGoods=()=>
{
    kxyk.sk.be(Api.shop.U.GetStoreGoods,{store_id:PageD1.Store.id},res=>{
        if(res.status){
            PageD1.Store.goods = res.goods;
        }
    })
}
/** 独立加载内存数据 */
const GetStoreInitD1 =()=>
{
    if(PageD1.Store.id)
    {
        kxyk.sk.be(Api.shop.D1.GetInitD1,{id:PageD1.Store.id,boss:PageD1.is_boss},res=>{
            if(res.__error__){
                PageD1.is_error = true;
                PageD1.error_title = res.msg;
            }
            if(res.status)
            {
                /** 可以加载数据统计 */
                PageD1.is_d1 = true;
                PageD1.Store_.AllList = res.Store_.AllList;
                PageD1.Store_.BList = res.Store_.BList;
                PageD1.Store_.Staff = res.Store_.Staff;
                PageD1.Store_.DayOrder = res.Store_.DayOrder;
                PageD1.Store_.sxed = res.Store_.sxed;
                // 这里开始排队用户
                store.FormatUserList();
            }
        },false);
    }
}
// 初始化店铺数据
GetStoreInit();
onMounted(()=>{

    // 初始化店铺商品数据
    GetStoreGoods();
});



</script>

