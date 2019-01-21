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
      <el-button type="primary" plain @click='handleAdd'>添加用户</el-button>
    </div>
    <!-- 表格 -->
    <!-- v-loading自定义指令是element定义的,通过布尔值控制 -->
    <el-table v-loading='loading' :data="tableData" border style="width: 100%" class="mt-15 mb-15">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <template slot-scope="scope">
          <!-- 5.1 监听开关的change事件 -->
          <el-switch
            @change="handleChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#c7c7c7">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 点击编辑按钮 -->
          <el-button size="mini" icon='el-icon-edit' type='primary' circle @click='handleEdit(scope.row)'></el-button>
          <el-button size="mini" icon='el-icon-check' type='warning' circle></el-button>
          <!-- scope.row获取到的是点击的那一行的数据 -->
          <el-button size="mini" type="danger" icon='el-icon-delete'
              @click="handleDelete(scope.row)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <!-- 在el-form组件上面添加rules属性 -->
        <el-form :model="addForm" :rules='myrules' ref='addRef'>
          <el-form-item label="用户名" label-width="90px" prop="username">
            <el-input v-model="addForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="90px" prop="password">
            <el-input v-model="addForm.password" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="90px" prop="email">
            <el-input v-model="addForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="90px" prop="mobile">
            <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 4.1 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
        <!-- 在el-form组件上添加rules属性 -->
        <el-form :model="editForm" :rules="myrules" ref="editRef">
          <el-form-item label="用户名" label-width="90px">
            <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="90px" prop="email">
            <el-input v-model="editForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="90px" prop="mobile">
            <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
        </div>
      </el-dialog>
    <!-- 分页 -->
    <!-- page-size:表示默认上来每页显示多少条 -->
    <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </div>
</template>
<script>
import { getUserList, addUser, delUser, editUser, changeUserState } from '@/api'
export default {
  data () {
    // 创建自定义校验规则
    let checkEmail = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请输入邮箱'))
      } else {
        // 判断格式是否正确
        let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
        if (emailReg.test(value)) {
          // 校验通过
          cb()
        } else {
          // 校验不通过
          cb(new Error('请输入正确邮箱格式'))
        }
      }
    }
    return {
      searchVal: '', // 搜索数据
      currentPage: 1, // 页面数据条数,默认展示第一页
      totalNum: 0, // 数据总条数,默认为0
      pagenum: 1, // 当前页码默认为1
      pagesize: 10, // 每页显示条数默认10条
      tableData: [], // 表格数据
      addDialogFormVisible: false, // 控制添加用户对话框的显示与否
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editDialogFormVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      myrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ]
      },
      loading: true // loading动画控制
    }
  },
  created () {
    // 调用初始化表格数据方法
    this.initList()
  },
  methods: {
    // 初始化表格数据
    initList () {
      // 在刷新数据之前,先把loading置为true,不然会出现没有loading动画的情况
      this.loading = true
      getUserList({ query: this.searchVal, pagenum: this.pagenum, pagesize: this.pagesize })
        .then(res => {
          // console.log(res)
          this.tableData = res.data.data.users
          // 给totalNum赋值
          this.totalNum = res.data.data.total
          // 数据加载完之后,loading置为false
          this.loading = false
        })
    },
    // 搜索用户
    handleSearch () {
      // 查找之前把pagenum置为1
      this.pagenum = 1
      this.initList()
    },
    // 添加用户按钮事件
    handleAdd () {
      this.addDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addRef.clearValidate()
      })
    },
    // 确定添加
    confirmAdd () {
      this.$refs.addRef.validate(isPass => {
        if (isPass) {
          // 发请求
          addUser(this.addForm)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                // 添加成功,弹成功提示信息,刷新表格,弹框隐藏,清空表格
                this.$message.success(res.data.meta.msg)
                this.initList()
                this.addDialogFormVisible = false
                this.addForm.username = ''
                this.addForm.password = ''
                this.addForm.email = ''
                this.addForm.mobile = ''
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
        } else {
          this.$message.error('请输入正确的信息')
        }
      })
    },
    // handleDialogClose () {
    //   // console.log('guanbi')
    //   // 清除校验信息
    //   this.$refs.addRef.clearValidate()
    // },
    // 删除用户数据
    handleDelete (row) {
      console.log(row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的操作
        delUser(row.id)
          .then(res => {
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)
              this.initList()
            } else {
              this.$message.error(res.data.meta.msg)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 点击编辑按钮
    handleEdit (row) {
      this.editDialogFormVisible = true
      this.editForm.username = row.username
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
      this.editForm.id = row.id
    },
    // 确定编辑
    confirmEdit () {
      editUser(this.editForm)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            this.initList() // 刷新表格
            this.editDialogFormVisible = false // 隐藏编辑对话框
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
    },
    //  切换开关
    handleChange (row) {
      // console.log('123')
      changeUserState(row.id, row.mg_state)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            this.initList() // 刷新表格
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      // 赋值完每页条数后重新发请求
      this.initList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      // 复制完当前页之后重新发请求
      this.initList()
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
