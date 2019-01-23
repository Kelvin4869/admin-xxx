<template>
  <div class="cate">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type='primary' plain @click='handleAdd'>添加分类</el-button>
    <tree-grid
      class="mt-15"
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory">
    </tree-grid>
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
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addDialogFormVisible">
      <!-- 在el-form组件上面添加rules属性 -->
      <el-form :model="addForm" :rules='myrules' ref='addRef'>
        <el-form-item label="分类名称" label-width="90px" prop="cat_name">
          <el-input v-model="addForm.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父类名称" label-width="90px">
          <!-- props属性用于配置字段名 -->
          <!-- change-on-select可以选择任意一级数据 -->
          <el-cascader
            :options="options"
            :props='defaultProps'
            change-on-select
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCates, addCate } from '@/api'
// 引入组件
import TreeGrid from '@/components/TreeGrid/TreeGrid'
export default {
  // 注入组件
  components: {
    TreeGrid
  },
  data () {
    return {
      dataSource: [],
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }],
      pagesize: 10,
      pagenum: 1,
      currentPage: 1, // 页面数据条数,默认展示第一页
      totalNum: 0, // 数据总条数,默认为0
      addDialogFormVisible: false,
      addForm: {
        cat_name: '',
        cat_pid: 0, // 默认用户不选择,创建的是一级节点,父id为0
        cat_level: 0 // 默认用户不选择,创建的是一级节点,层级为0
      },
      myrules: {
        cat_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      },
      options: [], // 级联选择器数据
      selectedOptions: [],
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
    }
  },
  created () {
    this.initTable()
  },
  methods: {
    initTable () {
      getCates(3, this.pagenum, this.pagesize)
        .then(res => {
          // console.log(res)
          this.dataSource = res.data.data.result
          this.totalNum = res.data.data.total
        })
    },
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      // 赋值完每页条数后重新发请求
      this.initTable()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      // 复制完当前页之后重新发请求
      this.initTable()
    },
    // 点击添加分类
    handleAdd () {
      // console.log('123')
      getCates(2)
        .then(res => {
          // console.log(res)
          this.options = res.data.data
        })
      this.addDialogFormVisible = true
    },
    // 确认添加
    confirmAdd () {
      // 校验通过之后才能发请求
      this.$refs.addRef.validate(isPass => {
        if (isPass) {
          // 发请求
          addCate(this.addForm)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.$message.success(res.data.meta.msg)
                this.addDialogFormVisible = false
                this.initTable()
                // 初始化addForm数据
                this.addForm.cat_name = ''
                this.addForm.cat_level = 0
                this.addForm.cat_pid = 0
                // 初始化级联选择器选中的数据
                this.selectedOptions = []
              } else {
                this.$message.error('请填写正确的数据!')
              }
            })
        } else {
          this.$message.error('请填写正确的数据!')
        }
      })
    },
    // 级联选择器数据改变执行的方法
    handleChange (value) {
      console.log(value)
      // 我们可以根据value的长度推断我们创建的节点为几级节点,
      // 如果长度为1,说明创建的是二级节点.它的cat_level = 1,它的cat_pid = 一级节点的id
      // 如果长度为2,说明创建的是三级节点,cat_level = 2,cat_pid = 二级节点的id
      if (value.length === 1) {
        this.addForm.cat_level = 1
        this.addForm.cat_pid = value[0]
      } else {
        this.addForm.cat_level = 2
        this.addForm.cat_pid = value[1]
      }
    }
  }
}

</script>
