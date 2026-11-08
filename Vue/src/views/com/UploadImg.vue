
<style scoped lang="stylus">
.upload1
    :deep(.van-uploader__wrapper)
        display: flex; flex-wrap: wrap;
    // :deep(.van-uploader__preview)
    //     margin:0 
    :deep(.van-uploader__upload)
        width: 100%; min-width: 80px; height: 100%; min-height: 80px;margin:0;
    :deep(.van-image)
        min-width: 80px; min-height: 80px; max-height: 80px; 
    :deep(.van-uploader__preview-delete)
        width: 30px; height: 30px; border-radius: 0 0 0 30px;
    :deep(.van-uploader__preview-delete-icon)
        font-size: 29px; 
</style>
<template lang="pug">

div.upload1
    van-uploader(style="width:100%" v-model="fileList" :after-read="afterRead" @delete="delRead" :max-count="max" )

</template>

<script lang=ts>
export default { 
    name: "UploadImg",
    components:{},
};
</script>

<script setup lang=ts>
import { kxyk ,Api} from 'smkj';
import { ref, watch } from 'vue';
import zipimg from 'compressorjs';
import axios from 'axios';

const emit = defineEmits(['update:url',"change"]);
interface Props {
    url?:string|string[],max?:string,
}
// 接受参数
const props = withDefaults(defineProps<Props>(), {
    url:'',max:"3"
})
// 绑定图片列表
const fileList = ref<{url:string,isImage:boolean}[]>([]);
const is_array = ref(false);
/** 初始化绑定数据 */

watch(    
    () => props.url,
    (coms, prevCount) => {
        if(coms && fileList.value.length === 0){
            if(Array.isArray(coms))
            {
                is_array.value = true;
                coms.forEach(url=>{
                    fileList.value.push({url:url,isImage:true});
                })
            }else{
                fileList.value.push({url:coms,isImage:true});
                
            }
        }else{
            if(!coms && fileList.value.length >0){
                fileList.value =[];
            }
            if(typeof coms === 'string'){
                fileList.value = [{url:coms,isImage:true}];
            }
        }
    }
)
if(Array.isArray(props.url))
{
    is_array.value = true;
    props.url.forEach(url=>{
        fileList.value.push({url:url,isImage:true});
    })
}else{
    if(props.url){
        fileList.value.push({url:props.url,isImage:true});
    }else{
        fileList.value = [];
    }
}
// 组件删除了图片
const delRead = (e:any)=>
{
    if(e.id && e.file_name)
    {
        kxyk.sk.be(Api.shop.Base.DelUploadImg,{id:e.id,file_name:e.file_name},res=>{
            // console.log('删除返回',res);
        });
    }
    up_model();
}
// 更新双向绑定
const up_model = ()=>
{
    // console.log('即将更新',fileList.value);
    
    let up = null;
    if(is_array.value)
    {
        up = [];
        fileList.value.forEach(e=>{
            up.push(e.url);
        })
    }else{
        up='';
        if(fileList.value.length > 0)
        {
            up = fileList.value[0]?.url;
        }
    }
    emit('update:url',up);
    emit('change',up);
}
// 这里开始上传
const afterRead = (file:any) => {
    // console.log('这里这里',file,file.file.name);
    // console.log('原始大小',file.file.size);
    new zipimg(file.file,{
        quality: 0.7,
        maxWidth:1000,
        maxHeight:1000,
        success(result:any) {
            const formData = new FormData();
            formData.append('upfile', result,result.name);
            axios({
                url:'/api/upload',
                method:'post',
                data:formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((res)=>{
                if(res.data.status && res.data.db)
                {
                    file.status = 'done';
                    file.url = res.data.db.qiniu_url;
                    if(res.data.db.id) file.id = res.data.db.id;
                    if(res.data.db.file_name) file.file_name = res.data.db.file_name;
                    up_model();
                }else{
                    file.status = 'failed';
                    file.message = res.data.msg?res.data.msg:'上传错误';
                }
            });
        },
        error(err) {
            file.status = 'failed';
            file.message = '压缩错误';
            console.log(err.message);
        },
    })
    file.status = 'uploading';
    file.message = '上传中...';
};
</script>


