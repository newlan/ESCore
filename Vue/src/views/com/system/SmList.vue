
<style lang="stylus">
@import "./SmList.styl" 
</style>
<template lang="pug">
div.SmList
  div.container
    div.swipe-container( ref="swipeContainer" @mousedown="handleDragStart" @mousemove="handleDragMove" @mouseup="handleDragEnd" @mouseleave="handleDragEnd" @touchstart="handleDragStart" @touchmove="handleDragMove" @touchend="handleDragEnd" )
        div.swipe-wrapper(:class="{ dragging: isDragging }" :style="{ transform: `translateX(${translateX}px)` }" )
            div( v-for="page in totalPages" :key="page" class="swipe-slide" )
                div.grid-container(:style="gridStyle")
                    div.grid-item(v-for="(item,index) in getPageData(page - 1)" :key="item.id")
                        slot(name="item" :item="item" :index="index")
                            //- <!-- 默认插槽内容 -->
                            div.grid-item-header
                                span.serial-badge 序号: {{ item.id }}
                    div.empty-item(v-for="i in getEmptySlots(page - 1)" :key="'empty-' + i"  :style="{ height: maxHeight > 0 ? `${maxHeight}px` : 'auto' }" )
                        span(v-if="showEmpty") 暂无数据
    div.header(v-if="showHeader")
        span  共 {{ dataList.length }} 条 | 第 {{ currentPage + 1 }} / {{ totalPages }} 屏
</template>
<script setup lang="ts"  generic="T extends Record<string, any>">

import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import type { Ref, ComputedRef, CSSProperties } from 'vue'



// 设置组件名
defineOptions({
  name: 'SmList'
});

// Props 接口定义 - 使用泛型 T
interface Props<T> {
  dataList: T[]
  columns?: number
  rows?: number
  gap?: string
  showHeader?: boolean,
  /** 设置默认空数据高度 */
  minHeight?: number
  /** 是否显示暂无数据 */
  showEmpty?: boolean
}

// Props 定义
const props = withDefaults(defineProps<Props<T>>(), {
  columns: 3,
  rows: 3,
  gap: '20px',
  showHeader: true,
  minHeight: 0,showEmpty: false
})

// Emits 定义
interface Emits {
  (e: 'page-change', page: number): void
  (e: 'update:currentPage', page: number): void
  (e: 'item-click', item: T): void
}

const emit = defineEmits<Emits>()

// 响应式数据
const currentPage: Ref<number> = ref(0)
const isDragging: Ref<boolean> = ref(false)
const startX: Ref<number> = ref(0)
const currentX: Ref<number> = ref(0)
const translateX: Ref<number> = ref(0)
const containerWidth: Ref<number> = ref(0)
const swipeContainer: Ref<HTMLElement | null> = ref(null)
const gridItemHeights: Ref<number[]> = ref([])
const maxHeight: Ref<number> = ref(0)

// 计算属性
const itemsPerPage: ComputedRef<number> = computed(() => {
  return props.columns * props.rows
})

const totalPages: ComputedRef<number> = computed(() => {
  // return Math.ceil(props.dataList.length / itemsPerPage.value)
    const pages = Math.ceil(props.dataList.length / itemsPerPage.value)
    return Math.max(1, pages)   // 最少显示 1 屏
})

const startIndex: ComputedRef<number> = computed(() => {
  return currentPage.value * itemsPerPage.value + 1
})

const endIndex: ComputedRef<number> = computed(() => {
  return Math.min(
    (currentPage.value + 1) * itemsPerPage.value,
    props.dataList.length
  )
})

const gridStyle: ComputedRef<CSSProperties> = computed(() => {
  return {
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    gridTemplateRows: `repeat(${props.rows}, auto)`,
    gap: props.gap
  }
})

const updateGridItemHeights = (): void => {
  if (!swipeContainer.value) return
  
  const items = swipeContainer.value.querySelectorAll('.grid-item')
  const heights: number[] = []
  
  items.forEach((item) => {
    heights.push((item as HTMLElement).offsetHeight)
  })
  
  maxHeight.value = heights.length > 0 ? Math.max(...heights) : props.minHeight
}



const updateContainerWidth = (): void => {
  if (swipeContainer.value) {
    containerWidth.value = swipeContainer.value.offsetWidth
    translateX.value = -currentPage.value * containerWidth.value
  }
}

const getPageData = (page: number): T[] => {
  const start = page * itemsPerPage.value
  const end = start + itemsPerPage.value
  return props.dataList.slice(start, end)
}

const getEmptySlots = (page: number): number => {
  // 只有最后一页才需要填充空白格子
  if (page !== totalPages.value - 1) {
    return 0
  }
  
  const data = getPageData(page)
  return data.length < itemsPerPage.value 
    ? itemsPerPage.value - data.length 
    : 0
}

const handleDragStart = (e: MouseEvent | TouchEvent): void => {
  isDragging.value = true
  startX.value = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  currentX.value = translateX.value
}

const handleDragMove = (e: MouseEvent | TouchEvent): void => {
  if (!isDragging.value) return
  
  const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
  const diff = x - startX.value
  translateX.value = currentX.value + diff
}

const handleDragEnd = (): void => {
  if (!isDragging.value) return
  
  isDragging.value = false
  const movedBy = translateX.value - currentX.value
  const threshold = containerWidth.value / 10

  if (movedBy < -threshold && currentPage.value < totalPages.value - 1) {
    currentPage.value++
  } else if (movedBy > threshold && currentPage.value > 0) {
    currentPage.value--
  }

  translateX.value = -currentPage.value * containerWidth.value
}

const goToPage = (page: number): void => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page
    translateX.value = -currentPage.value * containerWidth.value
  }
}

// 生命周期钩子
onMounted(() => {
  updateContainerWidth()
  window.addEventListener('resize', updateContainerWidth)
setTimeout(updateGridItemHeights, 100)
  window.addEventListener('resize', updateGridItemHeights)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateContainerWidth);
  window.removeEventListener('resize', updateGridItemHeights)
})

// 监听器
watch(currentPage, (newPage: number) => {
  updateContainerWidth()
  emit('page-change', newPage)
  emit('update:currentPage', newPage)
})
watch(() => props.dataList, () => {
  setTimeout(updateGridItemHeights, 100)
}, { deep: true })
// 暴露方法和数据给父组件
defineExpose({
  goToPage,
  currentPage,
  totalPages,
  getPageData
})


onMounted(()=>{})
</script>
