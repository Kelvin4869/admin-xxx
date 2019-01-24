<template>
  <div class="add-goods">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- active用来控制步骤条进行到哪一步,默认从0开始 -->
    <el-steps :space="400" :active="activeIndex" finish-status="success">
      <el-step title="步骤1"></el-step>
      <el-step title="步骤2"></el-step>
      <el-step title="步骤3"></el-step>
      <el-step title="步骤4"></el-step>
      <el-step title="步骤5"></el-step>
    </el-steps>
    <!-- 点击tab栏应该让activeIndex变量根据点击的值进行变化 -->
    <el-tabs tab-position="left" style="height: 500px;" @tab-click='handleClick'>
      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">
        <!-- action上传的服务器地址,on-preview表示预览,on-remove移除时执行的方法 -->
        <!-- file-list表示上传的文件列表,list-type文件列表的类型 -->
        <!-- el-upload组件中封装了自己的ajax.不会被axios拦截器拦截,如果需要添加请求头,需要设置headers属性 -->
        <el-upload
          action="http://localhost:8888/api/private/v1/upload"
          :on-preview="handlePreview"
          :headers='myheaders'
          :on-remove="handleRemove"
          :on-success='handleSuccess'
          :before-upload='beforeUpload'
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">文件大小不能超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: 0,
      fileList: [],
      myheaders: {
        Authorization: localStorage.getItem('token')
      },
      content: null,
      editorOption: {
        placeholder: '请输入内容'
      }
    }
  },
  methods: {
    // tab栏点击
    handleClick (obj) {
      // 直接将点击的tab栏的索引值赋值转换为num赋值给activeindex
      this.activeIndex = parseInt(obj.index)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    // 上传成功
    handleSuccess (res, file, filelist) {
      // console.log(res)
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg)
      }
    },
    // 上传之前
    beforeUpload (file) {
      if (file.size >= 500 * 1024) {
        this.$message.error('文件大小不能超过500kb')
        return false
      }
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    }
  }
}

</script>
