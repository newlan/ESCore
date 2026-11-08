<style lang="stylus">
  @import "./MemberAdmin.styl"
  
</style>
<template lang="pug">
div
  div.MemberAdmin 
  div.title
    div(style="height: 2.6rem;")
      Title(ref="titlecom" :coms="{str:'会员管理'}")
        template(#right)
          div.cog(style="text-align: center;" )                     
    div(style="text-align: left;")
      a-row 
        a-col
          input(type="text" placeholder="请输入搜索关键词"  @input="search" class="search" style="height: 30px; width:300px;")
        a-col
          el-select(v-model="value" clearable  placeholder="分类" @change='getValue()')
            el-option(v-for="item in options" :key="item.value" :label="item.label" :value="{ value: item.value, label: item.label}")
        a-col(style="text-align: right;")
          el-button(type="primary" @click="sendM(value)") 发送消息 
          div 
            Template1(:msg="sendMsg" )        
  div(v-if="list")
    div(style="text-align: left;")
      a-row(justify="space-between"  class="van-hairline--top" style="text-align:center;" align="middle")
        a-col(span="1")
          div 
          el-checkbox(v-model="isAllCheck" @change="selectedAll(isAllCheck)")
        a-col(span="5" class="van-hairline--right")
          div  会员头像
        a-col(span="4" class="van-hairline--right")
          div 会员姓名
        a-col(span="3" class="van-hairline--right")
          div(style="text-align: center;") 余额
        a-col(span="6" class="van-hairline--right")
          div
            div 电话
        a-col(span="5" class="van-hairline--right")
          div
            div 会员等级
  van-pull-refresh(v-model="refreshing" @refresh="onRefresh")
  van-list(v-model:loading="loading" :finished="finished" finished-text="没有更多数据了" @load="onLoad" )                     
    div.list(v-for="li in list2" style="text-align: left;") 
      a-row(justify="space-between"  class="van-hairline--top"  align="middle")
        a-col(span="1")
          div 
          el-checkbox(v-model="li.cid" id="li.id" value="li.id" @change="itemCheck(li)")
        a-col(span="5" class="van-hairline--right")
          VanDivider
            el-avatar(:src="li.avatar")
        a-col(span="4" class="van-hairline--right")
          div
            span {{li.real_name}}
        a-col(span="3" class="van-hairline--right")
          div(style="text-align: center;") 
            a-row(style="color: red;font-weight: bold;") {{li.money}}
            a-row
              van-icon(name="balance-o" size="20"  v-on:click="editmoney(li);"  color="#1989fa")
              van-dialog(v-model:show="showmoney" title="充值" show-cancel-button @confirm="editm();" v-cloak @cancel="closem();")
                el-input-number(v-model="num" :min="0" :max="1000000" :step="10")
        a-col(span="6" class="van-hairline--right" )
          div
            div {{li.phone?li.phone:'暂无号码'}}               
            div(v-if="list")
        a-col(span="5")
          div
            a-row {{li.grade}}
            a-row
              van-icon(name="vip-card-o" size="25" v-on:click="editgrade(li.id);"  color="#1989fa" ) 
              van-dialog(v-model:show="show"  title="修改会员等级" show-cancel-button @confirm="editg();" v-cloak @cancel="closeg();")
                el-select(v-model="value1"  placeholder="会员等级" )
                  el-option(v-for="ite in grade" :key="ite.value1" :label="ite.label1" :value="{ value: ite.value1, label:ite.label1 }")                
                          
                

</template>
<script lang="ts">
import { coms } from "smkj";
import Template1 from "@/views/mobile/admin/send_wechat_template/Template1.vue";
import { Toast } from "vant/lib/toast/function-call";

export default {
  name: "MemberAdmin",
  components: {
    Title: coms.Title
  },
};
</script>
<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { toRaw } from '@vue/reactivity';
// import { kxyk,io} from "@/libs/smkj";
import { kxyk, Api, io, __ } from "smkj";
import { createApp } from 'vue';
import { Icon } from 'vant';

// 数据列表
let list: any = ref([]);
let checkedNames: any = [];
const list2: any = ref([]);
//加载数据中
const loading = ref(false);
//是否加载完成
const finished = ref(false);
// 正在刷新状态
let refreshing = ref(false);
let isAllCheck = ref(false);
const show = ref(false);
const showmoney = ref(false);
const num = ref(0);
// 页码
const page = ref(0);
const value = ref('');
const value1 = ref('');
let id = ref('');
let uid = ref('');
let mon = 0;
const sendMsg = reactive(
  {

    title: '',
    title_color: '#bfbfbf',
    start: '',
    time_color: "#409EFF",
    end: '',
    detall: '',
    detall_color: '#409EFF',
    car_number_color: "#bfbfbf",
    count: 0,
    url: '',
    // type:route.params.type,
    car_number: "",
    open: false,
    value: value
  });
/*   const props = defineProps<{coms:sm.RefreshList}>();
  watch(
  ()=>props.coms.refresh,
  (newVal,olVal)=>{
      onRefresh();
  }
) */
//发送消息
const sendM = (value: any) => {
  if (value) {
    sendMsg.open = true

  } else {
    Toast.fail('请选择需要发消息的类别');
  }

}
const Detail = (value: any) => {
  if (value) {
    sendMsg.open = true

  }

}
const closem = () => {
  num.value = 0;
}
const closeg = () => {
  value1.value = '';
  onRefresh();
}
const editgrade = (editeid: any) => {

  id = editeid;
  show.value = !show.value;
  return { show };
}
const editg = () => {

  let val = JSON.parse(JSON.stringify(value.value));
  kxyk.sk.be(Api.lcy.editGrade, { id: id, value: val.value }, res => {
    if (res.status) {

      onRefresh();
    }
  })
  // let gra=value.editgra;

}
/**
 * 充值
 */
const editmoney = (li: any) => {
  mon = +li.money;
  uid = li.id;
  showmoney.value = !showmoney.value;
  return { show };
}
const editm = () => {

  mon = +num.value + mon;
  kxyk.sk.be(Api.lcy.editMoney, { id: uid, value: mon }, res => {
    if (res.status) {
      num.value = 0;
      onRefresh();
    }
  })
  // let gra=value.editgra;

}
const selectedAll = (isAllCheck: any) => {

  // 控制全选 全不选
  list2.value.forEach((li: any) => {

    !isAllCheck ? isAllCheck = false : isAllCheck = true
    li.cid = isAllCheck;
    if (li.cid == true) {
      checkedNames.push(li);
    } else {
      checkedNames = [];
    }
  })
}
//判断选中
const itemCheck = (li: any) => {
  if (li.cid == true) {

    checkedNames.push(li);


  } else {
    checkedNames = []
  }

  // 当arrTrue长度等于购物车列表的数组的长度时，说明全部选中
  if (checkedNames.length == list2.value.length) {

    isAllCheck.value = true
  } else {
    isAllCheck.value = false
  }

}

//下拉刷新
const onRefresh = () => {
  finished.value = false;
  list.value = [];
  list2.value = [];
  page.value = 0;
  loading.value = true;
  onLoad();
}
//分类的选项
const options = [
  {
    value: '1',
    label: 'A类',
  },
  {
    value: '2',
    label: 'B类',
  },
  {
    value: '3',
    label: 'C类',
  },
  {
    value: '4',
    label: 'D类',
  },
]
//会员等级的选项
const grade = [
  {
    value1: '0',
    label1: '普通会员',
  },
  {
    value1: '1',
    label1: '一级会员',
  },
  {
    value1: '2',
    label1: '二级会员',
  },
  {
    value1: '3',
    label1: '三级会员',
  },
]

const getValue = () => {

  let val = value.value;
  let Classify: any = toRaw(val);

  if (val) {
    kxyk.sk.be(Api.lcy.getClassify, { id: 29, value: Classify.value }, res => {
      page.value++;
      let newList: any = [];
      if (res.status) {
        //  console.log(props);
        loading.value = false;
        refreshing.value = false;
        // if(res.count/(props.coms.size||10)<page.value)
        // {
        //     finished.value = true;
        //     console.log(page.value);
        // }

        if (res.list2.length > 0) {
          //  console.log("======="+res.list);
          res.list2.forEach((d: any) => {
            finished.value = true;
            newList.push(d);
            list2.value = newList;
            //Memberlist=list;
            // console.log(Memberlist);
          });
        }
      }

    })
  } else {
    onRefresh();
  }
}
const onLoad = () => {
  kxyk.sk.be(Api.lcy.getMember, { id: 29 }, res => {
    page.value++;
    if (res.status) {
      //  console.log(props);
      loading.value = false;
      refreshing.value = false;
      /*   if(res.count/(props.coms.size||10)<page.value)
        {
           finished.value = true;
           console.log(page.value);
        } */

      if (res.list2.length > 0) {
        //  console.log("======="+res.list);
        res.list2.forEach((d: any) => {
          finished.value = true;
          list2.value.push(d);
          list.value.push(d);
          //Memberlist=list;
          // console.log(Memberlist);
        });
      }
    }

  })
}
onMounted(() => {
});
const search = (se: any) => {
  let v = se.target.value;
  let newList2: any = [];
  if (v) {

    if (list.value.length > 0) {
      list.value.forEach(function (val: any) {

        // val.list.forEach((s:any)=>{
        //  console.log("++++++++++"+val.real_name.indexOf(v));
        if (val.real_name.indexOf(v) > -1) {
          //  console.log("+++++++++"+Memberlist.value.indexOf(val.real_name));
          //  console.log("++++++++++"+val.real_name);
          if (list.value.indexOf(val.real_name) == -1) {
            newList2.push(val);
            //list.value.push(val);
            // this.list=list;
            //  console.log("++++++++++"+val.list.value);
            list2.value = newList2;

          }

        } else {
          list2.value = newList2;
          //    list.value=newList2;
          //  list.value=[];
        }

        //  }) 
      })
    }


  } else {
    onRefresh();
  }

}

</script>


