<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type='primary' plain>添加角色</el-button>
    <el-table :data="tableData" border style="width: 100%" class="mt-15 mb-15">
      <el-table-column type="expand">
        <template slot-scope='scope'>
          <el-tag>{{scope.row.roleName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="roleDesc" label="描述">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 点击编辑按钮 -->
          <el-button size="mini" icon='el-icon-edit' type='primary' circle @click='handleEdit(scope.row)'></el-button>
          <el-button size="mini" icon='el-icon-check' type='warning' @click='handleCheck(scope.row)' circle></el-button>
          <!-- scope.row获取到的是点击的那一行的数据 -->
          <el-button size="mini" type="danger" icon='el-icon-delete' @click="handleDelete(scope.row)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getRoleList } from '@/api'
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      getRoleList()
        .then(res => {
          this.tableData = res.data.data
        })
    }
  }
}
</script>
