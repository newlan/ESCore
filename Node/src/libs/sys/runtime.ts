/**
 * 进程内运行状态，仅用于框架首页健康检查。
 *
 * 备注：并发调用时由调用方保证顺序
 */
export const runtime = {
    eappStarted: false,
    wssStarted: false,
    /** 由 app.listen 回调回填的真实监听端口 */
    wssPort: 0,
};
