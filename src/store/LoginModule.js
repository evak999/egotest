export default {
    namespaced:true,
    state:{
        token:'',
        user:''
    },
    mutations:{
        setUser(state,payload){
            state.user=payload.user
            state.token=payload.token
        },
        clearUser(state){
            state.user=''
            state.token=''
        }
    }
}