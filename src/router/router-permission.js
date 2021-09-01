// 路由守卫
import router from './index'
import store from './../store'

router.beforeEach((to, from, next) => {
    // 判断是否需要登录
    if (to.matched.some(ele => ele.meta.isLogin)) { //需要登录
        // 判断是否登录
        let token = store.state.LoginModule.token
        if (token) { //登陆了
            console.log('已经登录');
            next()
        } else { //没登录
            console.log('没登录');
            next('/login')
        }
    }else{//不需要登录
        next()
    }
})