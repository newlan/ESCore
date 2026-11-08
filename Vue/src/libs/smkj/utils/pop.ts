import { createVNode, render, defineComponent, h, Transition } from 'vue'




const CustomDialog = defineComponent({
  props: {
    title: { type: String, required: true },
    message: { type: String, required: true },
    buttons: { type: Array as () => sm.Com.showPopBut[], default: () => [] }
  },
  setup(props) {
    const handleClick = (btn: sm.Com.showPopBut) => {
      btn.action?.()
      closeDialog()
    }

    return () =>
      h('div', { class: 'custom-dialog-mask' }, [
        h(Transition, { name: 'dialog-fade' }, {
          default: () => h('div', { class: 'custom-dialog-box' }, [
            h('div', { class: 'custom-dialog-title' }, props.title),
            h('div', { class: 'custom-dialog-message' }, props.message),
            h('div', { class: 'custom-dialog-footer' },
              props.buttons.map(btn =>
                h('button', {
                  class: 'custom-dialog-btn',
                  onClick: () => handleClick(btn)
                }, btn.text)
              )
            )
          ])
        })
      ])
  }
})

let container: HTMLElement | null = null

export function closeDialog() {
  if (container) {
    render(null, container)
    document.body.removeChild(container)
    container = null
  }
}

export function showCustomDialog(options: sm.Com.showPopOption,className = '') {
  // 避免重复弹出
  if (container) closeDialog()

  container = document.createElement('div')
  // 只给指定弹框添加专属样式类
  if (className) {
    container.classList.add(className)
  }
  document.body.appendChild(container)

  const vnode = createVNode(CustomDialog, options as Record<string, any>)
  render(vnode, container)
}

// 注入样式（仅一次）
if (!document.getElementById('custom-dialog-style')) {
  const style = document.createElement('style')
  style.id = 'custom-dialog-style'
  style.innerHTML = `
    .socket-reconnect-dialog .custom-dialog-title::before {
      content: '';
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 12px;
      border: 3px solid #dbeafe;
      border-top-color: #409eff;
      border-right-color: #409eff;
      border-radius: 50%;
      vertical-align: 4px;
      animation: socket-reconnect-spin 0.8s linear infinite;
    }

    /* 重连提示文字呼吸效果 */
    .socket-reconnect-dialog .custom-dialog-message {
      animation: socket-reconnect-pulse 1.8s ease-in-out infinite;
    }

    @keyframes socket-reconnect-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes socket-reconnect-pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.55;
      }
    }

    .custom-dialog-mask {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 999999999999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity .2s ease;
    }
    .custom-dialog-box {
      background: white;
      border-radius: 12px;
      padding: 20px;
      width: 80%;
      max-width: 400px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      text-align: center;
      animation: scale-in 0.25s ease;
    }
    .custom-dialog-title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .custom-dialog-message {
      font-size: 26px;
      color: #333;
      margin-bottom: 20px;
      white-space: pre-wrap;
    }
    .custom-dialog-footer {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    .custom-dialog-btn {
      padding: 6px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #409eff;
      color: white;
      font-size: 25px;
      flex: 1;
      transition: background 0.2s;
    }
    .custom-dialog-btn:hover {
      background: #66b1ff;
    }
    @keyframes scale-in {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `
  document.head.appendChild(style)
}
