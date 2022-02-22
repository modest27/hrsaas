<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构-头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <TreeTools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @editDepts="editDepts" @addDepts="addDepts" />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增弹层组件 -->
    <addDept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './component/tree-tool.vue'
import addDept from './component/add-dept.vue'

import { getDepartments } from '@/api/departments.js'
import { transListToTreeData } from '@/utils/index.js'
export default {
  components: {
    TreeTools,
    addDept
  },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [
        { name: '总裁办', manager: '刘帅哥', children: [{ name: '董事会', manager: '汪某' }] },
        { name: '行政部', manager: '邓某' },
        { name: '人事部', manager: '向某' }
      ],
      company: { name: '重庆modest教育科技股份有限公司', manager: '负责人', id: '' },
      showDialog: false, // 默认不显示弹出层
      node: null // 当前部门，在这之下添加子部门
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.departs = transListToTreeData(result.depts, '')
      console.log(result)
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node // 因为node是当前的点击的部门， 此时这个部门应该记录下来
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node // 记录当前编辑的节点
      // 父组件 调用子组件的方法
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
