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
          <!-- 一个角色的所有权限都保存在这个角色对象,也就是scope.row.children -->
          <!-- firstChildItem表示第一个children中的每一项 -->
          <el-row v-for='firstChildItem in scope.row.children' :key='firstChildItem.id'>
            <el-col :span='4'>
              <el-tag closable @close='handleClose(scope.row.id, firstChildItem.id, scope.row)'>
                {{firstChildItem.authName}}
              </el-tag>
              <i class="el-icon-arrow-right" v-if='firstChildItem.children.length > 0'></i>
            </el-col>
            <el-col :span='20'>
              <!-- v-for加给el-row -->
              <el-row v-for='secondChildItem in firstChildItem.children' :key='secondChildItem.id'>
                <el-col :span='4'>
                  <el-tag closable type='success' @close='handleClose(scope.row.id, secondChildItem.id, scope.row)'>
                    {{secondChildItem.authName}}
                  </el-tag>
                  <i class="el-icon-arrow-right"  v-if='secondChildItem.children.length > 0'></i>
                </el-col>
                <el-col :span='20'>
                  <!-- 这个v-for直接加给el-tag组件 -->
                  <el-tag closable type='warning' v-for='lastChildItem in secondChildItem.children' :key='lastChildItem.id' @close='handleClose(scope.row.id, lastChildItem.id, scope.row)'>{{lastChildItem.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='24'>
              <el-tag type='info' v-if='scope.row.children.length <= 0'>该角色还未授权,请前往授权!</el-tag>
            </el-col>
          </el-row>
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
          <el-button size="mini" icon='el-icon-edit' type='primary' circle></el-button>
          <el-button size="mini" icon='el-icon-check' type='warning' @click='handleCheck(scope.row)' circle></el-button>
          <!-- scope.row获取到的是点击的那一行的数据 -->
          <el-button size="mini" type="danger" icon='el-icon-delete' circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 授权角色对话框 -->
    <el-dialog title="授权角色" :visible.sync="checkDialogFormVisible">
      <div class="tree-box">
        <!-- default-expand-all表示展开所有节点，props属性用于配置字段 -->
        <el-tree
          :data="rightList"
          ref="tree"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectIds"
          :props="defaultProps">
        </el-tree>
      </div>
      <div slot="footer">
        <el-button @click="checkDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmCheck">确 定</el-button>
      </div>
      </el-dialog>
  </div>
</template>
<script>
import { getRoleList, delUserRight, getRights, grantRoleRight } from '@/api'
export default {
  data () {
    return {
      tableData: [],
      checkDialogFormVisible: false, // 授权角色弹框显示和隐藏
      rightList: [],
      defaultProps: {
        children: 'children',
        // label属性用来指定在后台返回给我们的数据中，到底是哪个字段名用来展示汉字
        label: 'authName'
      },
      selectIds: [], // 用来保存默认选中的节点的id
      currentRole: {} // 缓存当前点击的角色
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
    },
    // 点击tag组件的删除
    handleClose (roleId, rightId, row) {
      // console.log('123')
      delUserRight(roleId, rightId)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            // this.initList()
            row.children = res.data.data
          }
        })
    },
    // 点击授权按钮
    handleCheck (row) {
      // 在点击确定授权按钮之前，应该先用一个变量将row缓存起来
      this.currentRole = row
      this.checkDialogFormVisible = true
      // 再给selectIds赋值之前，需要先给它清空
      this.selectIds = []
      getRights('tree')
        .then(res => {
          this.rightList = res.data.data
        })

      // 通过三层循环取到最后一层children里面每一项的id，将他们push数组中
      row.children.forEach(firstChildItem => {
        if (firstChildItem.children && firstChildItem.children.length > 0) {
          firstChildItem.children.forEach(secondChildItem => {
            if (secondChildItem.children && secondChildItem.children.length > 0) {
              secondChildItem.children.forEach(lastItem => {
                this.selectIds.push(lastItem.id)
              })
            }
          })
        }
      })
    },
    // 确定授权
    confirmCheck () {
      // this.$refs.tree.getCheckedKeys()获取的是全选的节点的id
      // this.$refs.tree.getHalfCheckedKeys()获取的是半选的节点的id
      let allCheckedKeys = this.$refs.tree.getCheckedKeys()
      let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      // 将两个数组合并为一个大数组
      // let idsArr = allCheckedKeys.concat(halfCheckedKeys)
      let idsArr = [...allCheckedKeys, ...halfCheckedKeys]
      grantRoleRight(this.currentRole.id, idsArr.join(','))
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            this.checkDialogFormVisible = false
            this.initList()
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.roles {
  .el-tag {
    margin: 5px 5px 5px 0;
  }
  .tree-box {
    height: 300px;
    overflow: auto;
  }
}
</style>
