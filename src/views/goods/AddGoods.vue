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
    <el-tabs tab-position="left" style="height: 300px;" @tab-click='handleClick'>
      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    // tab栏点击
    handleClick (obj) {
      // 直接将点击的tab栏的索引值赋值转换为num赋值给activeindex
      this.activeIndex = parseInt(obj.index)
    }
  }
}
</script>
