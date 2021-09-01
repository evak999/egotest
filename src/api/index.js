import axios, {
    get,
    post
} from './../utils/myRequest'
import base from './base'

const api = {
    // 登录
    getLogin(params) {
        return post(base.login, params)
    },
    // 注册
    register(params) {
        return post(base.register, params)
    },
    // 获取商品列表
    productList(params) {
        return get(base.productList, params)
    },
    // 搜索商品结果
    getSearch(params) {
        return axios.get(base.search, {
            params
        })
    },
    // 获取类目
    selectCategory(params) { //{id:cid}
        return get(base.selectCategory, params)
    },
    // 添加商品
    addProduct(params) {
        return get(base.addProduct, params)
    },
    // 删除商品   参数id
    delProduct(params) {
        return get(base.delProduct, params)
    },
    // 批量删除  参数 idArr
    delGoods(params) {
        return get(base.delGoods, params)
    },
    // 修改商品
    editGoods(params) {
        return get(base.editGoods, params)
    },
    // 规格参数  page
    getParams(params) {
        return get(base.getParams, params)
    },
    // 添加规格  参数 itemCatId content specsName
    addParams(params) {
        return get(base.addParams, params)
    },
    // 规格参数类目结构数据获取 cid
    getGuiGeBack(params) {
        return get(base.guiBack, params)
    },
    // 搜索
    searchParam(params) {
        return get(base.searchParam, params)
    },
    // 删除
    delParam(params) {
        return get(base.delParam, params)
    },
    // 编辑
    editParam(params) {
        return get(base.editParam, params)
    },
    // 获取广告列表导航 参数 id 不传默认1
    getAdList(params) {
        return get(base.adList, params)
    },
    // 增加广告子导航  pid name
    addAd(params) {
        return get(base.addAd, params)
    },
    // 修改  pid name
    editAd(params){
        return get(base.editAd, params)
    },
    // 删除  pid 
    delAd(params){
        return get(base.delAd, params)
    },
    getAdContent(params){
        return get(base.getAdContent, params)
    },

}

export default api