<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" border style="width: 100%" class="mt-15 mb-15">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="authName" label="权限名称">
      </el-table-column>
      <el-table-column prop="path" label="路径">
      </el-table-column>
      <el-table-column prop="level" label="层级">
        <!-- 这里渲染需要使用过滤器,因为数据格式不匹配,但使用过滤器又必须使用{{}},使用作用域插槽 -->
        <template slot-scope='scope'>
          <span class="myspan">{{scope.row.level | filterLevel}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getRights } from '@/api'
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.initList()
  },
  filters: {
    filterLevel: function (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else {
        return '三级'
      }
    }
  },
  methods: {
    initList () {
      getRights('list')
        .then(res => {
          // console.log(res)
          this.tableData = res.data.data
        })
    }
  }
}
</script>
