// 基础路径
const base={
    baseUrl:'http://localhost:4000',
    login:'/api/login', //登录
    register:'/api/register',//注册接口
    productList:"/api/projectList",//商品信息 page
    search:'/api/search',//搜索接口
    selectCategory:'/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择
    upload:'/upload', //上传图片接口，不能跨域
    addProduct:'/api/backend/item/insertTbItem', //添加商品 参数： title cid  category sellPoint price num desc paramsInfo image
    delProduct:'/api/backend/item/deleteItemById', //删除商品  参数id
    delGoods:'/api/batchDelete', //批量删除  参数 idArr 需要传递数据是 离散的数字格式
    editGoods:'/api/backend/item/updateTbItem', //修改商品 title, sellPoint, price, cid, category, num, desc, paramsInfo, image, id
    getParams:'/api/backend/itemParam/selectItemParamAll', //规格参数的数据
    addParams:'/api/backend/itemParam/insertItemParam',//添加规格
    guiBack:"/api/category/data", //规格回显
    searchParam:"/api/params/search", //规格模糊查询 参数：search
    delParam:"/api/params/delete", // 删除规格  参数 id
    editParam:"/api/update/category", //修改规格参数 cid content id  specsName
    adList:"/api/content/selectContentCategoryByParentId", //广告列表
    addAd:'/api/content/insertContentCategory', //增加子导航
    editAd:'/api/content/updateContentCategory', //编辑 参数pid name
    delAd:"/api/content/deleteContentCategoryById", //删除  pid
    getAdContent:"/api/content/selectTbContentAllByCategoryId", //获取内容 pid

}

export default base