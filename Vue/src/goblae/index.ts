
export default {
    install(app:any) {
        const version = Number(app.version.split('.')[0])
        if (version < 3) {
            console.warn('This plugin requires Vue 3')
        }
    }
}