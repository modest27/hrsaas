// 统一注册全局自定义组件
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'

export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    Vue.component('pageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload) // 注册图片上传组件
    Vue.use(Print)
  }
}
