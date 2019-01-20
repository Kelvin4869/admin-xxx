<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-input placeholder="请输入内容" v-model="searchVal" class="search-input">
        <el-button slot="append" icon="el-icon-search" @click='handleSearch'></el-button>
      </el-input>
      <el-button type="primary" plain>添加用户</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class="mt-15 mb-15">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <el-table-column prop="mg_state" label="状态">
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>
<script>
import { getUserList } from '@/api'
export default {
  data () {
    return {
      searchVal: '',
      currentPage4: 4,
      tableData: []
    }
  },
  created () {
    // 调用初始化表格数据方法
    this.initList()
  },
  methods: {
    // 初始化表格数据
    initList () {
      getUserList({ query: this.searchVal, pagenum: 1, pagesize: 10 })
        .then(res => {
          console.log(res)
          this.tableData = res.data.data.users
        })
    },
    // 搜索用户
    handleSearch () {
      this.initList()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}

</script>
<style lang="scss" scoped>
.search-input {
    width: 300px;
    margin-right: 20px;
}
</style>
