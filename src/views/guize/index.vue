<template>
  <div>
    <!-- 搜索框 -->
    <div class="header">
      <!-- change事件在失去焦点或回车时候触发 -->
      <el-input
        v-model="keyword"
        placeholder="请输入内容"
        @change="goSearch"
      ></el-input>
      <el-button type="primary" @click="goSearch">查询</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>
    <!-- 规格参数的表 -->
    <div>
      <el-table :data="tableData" ref="multipleTable" class="list">
        <!-- prop 对应列内容的字段名，也可以使用 property 属性 -->
        <el-table-column
          prop="itemCatId"
          label="规格参数ID"
          width="120"
        ></el-table-column>
        <el-table-column prop="id" label="类目ID" width="120"></el-table-column>
        <el-table-column
          prop="specsName"
          label="规格名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="paramData"
          label="规格参数"
          show-overflow-tooltip
        ></el-table-column>
        <!-- show-overflow-tooltip 当内容过长被隐藏时显示 tooltip -->
        <!-- 最后一列的编辑 删除 -->
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <Pagination :pageSize="pageSize" :total="total" @changeCur="changeCur" />
    </div>
    <!-- 弹框 -->
    <div>
      <el-dialog
        title="商品类目选择 规则参数"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="clearDialog"
      >
        <div v-if="dialogVisible">
          <!-- 每次显示树结构都能初始状态，不然点开过再打开是展开的 -->
          <Tree @getTreeData="getTreeData" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="clearDialog">取 消</el-button>
          <el-button type="primary" @click="addGroup" :disabled="flag"
            >确定并添加分组</el-button
          >
          <!-- 内弹框 -->
          <el-dialog
            title="商品规格参数配置"
            :visible.sync="innerVisible"
            width="60%"
            append-to-body
          >
            <Dialog :treeData="treeData" @hasDone="hasDone" ref="paramref" />
            <span slot="footer" class="dialog-footer">
              <el-button @click="innerVisible = false">取 消</el-button>
              <el-button type="primary" @click="innerVisible = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from "./../../components/Pagination.vue";
export default {
  components: {
    Pagination,
    Tree: () => import("./../goods/GoodsTree.vue"),
    Dialog: () => import("./Dialog.vue"),
  },
  data() {
    return {
      tableData: [],
      curPage: 1, //当前页
      pageSize: 10,
      total: 100,
      keyword: "", //搜索的关键词
      dialogVisible: false, //弹框是否显示，外
      innerVisible: false, //内弹框
      flag: true, //外弹框确定是否禁用
      treeData: "", //树类目
      paramData: [], //编辑的回显
      bian: false, //是否是编辑
    };
  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      console.log("编辑", index, row);
      // 回显规格参数，树类目选择
      this.dialogVisible = true;
      this.bian = true;
      this.paramData = JSON.parse(row.paramData);
    },
    // 删除
    handleDelete(index, row) {
      // 下标，这一行的{}，里边是各种信息
      console.log(index, row);
      // 弹框问一下是不是确认删除
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认删除
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 清空
    clearDialog() {
      this.dialogVisible = false;
      if (this.$refs.paramref) {
        this.$refs.paramref.dynamicForm.groups = [];
      }
      this.bian = false;
    },
    // 添加分组
    addGroup() {
      this.innerVisible = true;
      // 判断是编辑还是添加
      if (this.bian) {
        this.$nextTick(() => {
          this.$refs.paramref.dynamicForm.groups = this.paramData;
          console.log(this.$refs.paramref);
        });
      }
    },
    // 搜索
    goSearch() {},
    // 添加
    showDialog() {
      this.dialogVisible = true;
    },
    // 获取树的类目
    getTreeData(data) {
      this.flag = false; //按钮不禁用
      this.treeData = data;
      // console.log(data);
    },
    // 表格填完，关弹窗
    hasDone() {
      this.innerVisible = false;
      this.dialogVisible = false;
      // 按钮禁止
      this.flag = true;
      // 更新视图
      this.getParams(this.curPage);
    },
    // 请求规格列表数据
    getParams(page) {
      this.$api.getParams({ page }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.tableData = res.data;
          this.pageSize = res.pageSize;
          this.total = res.total;
        } else {
          console.log("无数据");
        }
      });
    },
    // 换页
    changeCur(cur) {
      this.curPage = cur;
      this.getParams(cur);
    },
  },

  created() {
    // 请求表格数据
    this.getParams(1);
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  margin: 30px;
  button {
    margin-left: 10px;
  }
}
.list {
  height: 500px;
}
.pagination {
  width: 500px;
  margin: 30px auto;
}
</style>