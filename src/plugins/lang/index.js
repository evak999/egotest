// 切换语言的
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// element的引用它自己的语言兼容方法
import Element from 'element-ui'

// 引入自定义的语言（自己写的界面上的文字不同语言的版本）
import enLocale from './en'
import zhLocale from './zh'

// 引element的语言包
import elementEn from 'element-ui/lib/locale/lang/en'
import elementZh from 'element-ui/lib/locale/lang/zh-CN'


Vue.use(VueI18n)

// 中英文对应的属性名一致
const messages = {
    en: {
        ...enLocale,
        ...elementEn, // 或者用 Object.assign({ message: 'hello' }, enLocale)
    },
    zh: {
        ...zhLocale,
        ...elementZh, // 或者用 Object.assign({ message: '你好' }, zhLocale)
    }
}

// 创建 VueI18n 实例
const i18n = new VueI18n({
    locale: "zh", //设置默认的语言版本
    messages, //设置语言信息
})

//配置element支持vue-i18n 
Element.i18n((key, value) => i18n.t(key, value))

// 导出实例 （挂全局）
export default i18n;