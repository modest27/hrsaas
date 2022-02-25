<template>
  <div>
    <!-- action为什么给#， 因为前面我们讲过了，我们要上传到腾讯云，需要自定义的上传方式,action给个#防止报错 -->
    <el-upload list-type="picture-card" :limit="1" action="#" :on-preview="preview" :on-remove="handleRemove" :on-change="fileChange" :http-request="upload" :before-upload="beforeUpload" :file-list="fileList" :class="{disabled:fileComputed}">
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" style="width:180px;" :percentage="percent" />
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="" style="width:100%;">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDQggPs51g39zYqqa2D7j6CeqkNjodAQP7', // 身份识别id
  SecretKey: 'TfZCZfU2KL4WhaCXaNt74lBKDqCH4aqp' // 身份识别密钥
})
export default {
  data() {
    return {
      fileList: [], // 放置图片地址的数组
      showDialog: false,
      imgUrl: '',
      currentFileUid: null, // 记录当前正在上传的uid
      percent: 0, // 记录当前的百分比
      showPercent: false
    }
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    fileChange(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      //   已经确定当前上传的就是当前的这个file了
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    // 进行上传操作
    upload(params) {
      //   console.log(params.file)
      if (params.file) {
        // 执行上传操作
        cos.putObject(
          {
            Bucket: 'modest-photo-1309814331', // 存储桶
            Region: 'ap-chongqing', // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
            // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
            // 进度条
            onProgress: params => {
              this.percent = params.percent * 100
            }
          },
          (err, data) => {
            // data返回数据之后 应该如何处理
            console.log(err || data)
            // data中有一个statusCode === 200 的时候说明上传成功
            if (!err && data.statusCode === 200) {
              //   此时说明文件上传成功  要获取成功的返回地址
              // fileList才能显示到上传组件上 此时我们要将fileList中的数据的url地址变成 现在上传成功的地址
              // 目前虽然是一张图片 但是请注意 我们的fileList是一个数组
              // 需要知道当前上传成功的是哪一张图片
              this.fileList = this.fileList.map(item => {
                // 去找谁的uid等于刚刚记录下来的id
                if (item.uid === this.currentFileUid) {
                  // 将成功的地址赋值给原来的url属性
                  return { url: 'http://' + data.Location, upload: true }
                  // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
                  // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
                }
                return item
              })
              // 将上传成功的地址 回写到了fileList中 fileList变化  =》 upload组件 就会根据fileList的变化而去渲染视图
              setTimeout(() => {
                this.showPercent = false // 隐藏进度条
                this.percent = 0 // 进度条归零
              }, 2000)
            }
          }
        )
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
