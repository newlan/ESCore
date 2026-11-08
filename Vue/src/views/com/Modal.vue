<style scoped lang="stylus">
.com_Modal
    color: red;
    pointer-events: none;

    /* 当弹窗处于打开状态时，才允许响应点击事件 */
    &.modal-open
        pointer-events: auto;
:deep(.full-modal-a1)
    .ant-modal
        max-width: 100%; top: 0; padding-bottom: 0; margin: 0;
    .ant-modal-content
        display: flex; flex-direction: column; height: 100%;
    .ant-modal-body
        flex: 1; padding: 0px;
    .ant-modal-footer
        padding: 6px; background: white; z-index: 20;

:deep(.full-modal-a2)
    .ant-modal
        padding-bottom: 0;
    .ant-modal-content
        display: flex; flex-direction: column; height: 100%;
    .ant-modal-body
        flex: 1; padding: 0px; display: flex; flex-direction: column; height: 100%; overflow: hidden;
    .ant-modal-footer
        padding: 6px; background: white; z-index: 20;

:deep(.full-modal-a4)
    .ant-modal
        padding-bottom: 0; top: 0; bottom: 0; left: 0; right: 0; padding: 0; margin: 0; max-width: 100%;
    .ant-modal-content
        display: flex; flex-direction: column; height: 100%;
    .ant-modal-body
        flex: 1; padding: 0px; display: flex; flex-direction: column; height: 100%; overflow: hidden;
    .ant-modal-footer
        padding: 6px; background: white; z-index: 20;

:deep(.full-modal-a3)
    display: flex; justify-content: center; align-items: center;
    .ant-modal
        padding-bottom: 0; top: 0;
    .ant-modal-content
        display: flex; flex-direction: column; height: 100%;
    .ant-modal-body
        flex: 1; padding: 0px;
    .ant-modal-footer
        padding: 6px; background: white; z-index: 20;


:deep(.mobile-top-modal)
    display: flex !important;
    align-items: flex-start !important; 
    justify-content: center !important; 
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 100% !important;
    display: block !important;
    overflow: hidden !important;

    .ant-modal
        top: 0px !important; 
        margin: 0 !important;
        padding-bottom: 0 !important;
        width: calc(100%) !important;
        max-width: 100% !important;

    .ant-modal-content
        display: flex;
        flex-direction: column;
        height: v-bind(mobileContentHeight) !important;
        overflow: hidden;

    .ant-modal-body
        flex: 1; padding: 0px; overflow-y: auto !important; -webkit-overflow-scrolling: touch;
    .ant-modal-footer
        padding: 8px 12px; background: white; z-index: 20; flex-shrink: 0;

</style>


<template lang="pug">

div.com_Modal(ref="SelectGoods" :class="{ 'modal-open': modelVisible }")
    a-modal(v-model:visible="modelVisible" :z-index="zindex" :height="hh" :width="modalWidth" :maskClosable="false" :wrap-class-name="computedWrapClass" :dialogClass="cname" :getContainer="()=>SelectGoods" :closable="closable" @cancel="emit('cancel')" okText="保存" ) 
        template(#title)
            slot(name="title")
        template(#footer)
            slot(name="footer")
        slot
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted,watch } from "vue";

// 声明组件名称（替代传统的 export default）
defineOptions({
    name: "Modal"
});

interface Props {
    title?: string;
    open: boolean;
    closable?: boolean;
    cname?: string;
    ww?: string;
    hh?: string;
    class?: 'full-modal-a2' | 'full-modal-a1' | 'full-modal-a3' | 'full-modal-a4';
    zindex?: number;
    /** 是否指定为移动端，不传则自动根据宽度 (<768px) 判断 */
    isMobile?: boolean;
}

const SelectGoods = ref(null);
// 记录屏幕物理高度 (未唤起键盘前的完整高度)
const screenHeight = ref(window.innerHeight);

// 监听窗口大小变化（防翻转屏幕）
const handleResize = () => {
    // 只有在没弹键盘（比如屏幕旋转）时更新参考高度
    if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        screenHeight.value = window.innerHeight;
    }
};
const props = withDefaults(defineProps<Props>(), {
    title: '提示',
    open: false,
    closable: false,
    cname: "no_class_name",
    hh: '100%',
    ww: '100%',
    class: "full-modal-a1",
    zindex: 10000,
    isMobile: undefined
});

const emit = defineEmits(['cancel', 'update:open']);
// 计算移动端下的固定 px 高度（屏幕物理高度的 50%）
const mobileContentHeight = ref<string>('auto');

// 当弹窗打开时，瞬间“锁定”当前的 50% 高度值
watch(() => props.open, (val) => {
    if (val && checkMobile.value) {
        // 在弹窗打开瞬间锁定像素值，不给键盘后续压缩它的机会
        const targetPx = Math.floor(screenHeight.value * 0.5);
        mobileContentHeight.value = `${targetPx}px`;
    }
}, { immediate: true });
// 响应式窗口宽度检测
const innerWidth = ref(window.innerWidth);


onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

// 判断是否为移动端模式
const checkMobile = computed(() => {
    if (typeof props.isMobile === 'boolean') {
        return props.isMobile;
    }
    return false;
});

// 动态 Class：移动端挂载顶置+避开键盘的样式
const computedWrapClass = computed(() => {
    return checkMobile.value ? 'mobile-top-modal' : props.class;
});

// 动态 Width
const modalWidth = computed(() => {
    if (checkMobile.value) {
        return 'calc(100% - 24px)';
    }
    return props.ww;
});

// 显示控制计算属性
const modelVisible = computed({
    get: () => props.open,
    set: (val) => emit('update:open', val)
});
</script>