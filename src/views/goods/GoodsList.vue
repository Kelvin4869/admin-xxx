<template>
  <div class="goods-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type='primary' plain @click='jumpToAdd'>添加商品</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    jumpToAdd () {
      console.log('123')
      this.$router.push({ name: 'addgoods' })
    }
  }
}
</script>
