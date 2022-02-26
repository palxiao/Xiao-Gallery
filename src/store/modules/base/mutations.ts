/**
 * 同步操作 store.commit() 调用
 */
// import { Toast } from 'vant'
export default {
    loading(state: Type.Object, data: any) {
        // Toast.clear();
        let msg = ''
        if (typeof data === 'string') {
            msg = data
        } else {
            // Toast.clear();
            return false
        }
        // Toast.loading({
        //     duration: 0,       // 持续展示 toast
        //     loadingType: 'spinner',
        //     message: msg
        // });
    },
    changeOnline(state: Type.Object, status: string) {
        state.online = status;
    },
    changeUser(state: Type.Object, name: string) {
        // state.user.name = name;
        // state.user = Object.assign({}, state.user)
        // localStorage.setItem('username', name);
    },
    setImgsLength(state: Type.Object, long: string|number) {
        state.imgsLength = long;
    },
    setShareEl(state: Type.Object, document: any) {
        state.shareEl = document;
    }
}
