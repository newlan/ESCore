import { defineStore } from 'pinia';

// export const useNoticeStore = {}
export const useNoticeStore = defineStore('notice', {
    state: () => ({
        notices: [] as sm.Com.StoreChatMsg[]
    }),
    
    actions: {
        show(msg:sm.Com.StoreChatMsg) {
            // const id = Date.now() + Math.random().toString(36).substring(2, 9);
            // 如果是语音消息，标记为锁定状态，不触发自动销毁
            const isVoice = msg.type === 2;
            const newNotice = { ...msg, isLocked: isVoice };
            this.notices.push(newNotice);
            
            // 非语音消息：5秒后自动关闭
            // 语音消息：不在这里设置定时器，等待播放完手动关闭
            if (!isVoice) {
                // setTimeout(() => {
                // this.remove(msg.id);
                // }, 5000);
            }
        },
        
        // 供语音组件播放完成后调用
        finishVoice(id:number) {
            const notice = this.notices.find(item => item.id === id);
            if (notice) {
                notice.isLocked = false;
                // 播放完后延迟 1 秒关闭，给用户一个缓冲感
                // setTimeout(() => {
                //     this.remove(id);
                // }, 1000);
            }
        },
        remove(id: number) {
            const index = this.notices.findIndex(item => item.id === id);
            if (index !== -1) {
                this.notices.splice(index, 1);
            }
        },
        /** 删除所有 */
        removeAll() {
            this.notices = [];
        }
    }
});