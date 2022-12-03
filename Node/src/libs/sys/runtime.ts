/** 进程内运行状态，仅用于框架首页健康检查。 */
export const runtime = {
    eappStarted: false,
    wssStarted: false,
    /** 由 app.listen 回调回填的真实监听端口 */
    wssPort: 0,
};
