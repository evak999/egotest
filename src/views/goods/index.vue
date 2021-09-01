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
    <!-- 商品列表 -->
    <div>
      <el-table
        :data="tableData"
        ref="multipleTable"
        class="list"
        @selection-change="handleSelectionChange"
      >
        <!-- 前边选择的多选小方框 -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <!-- 下边是表头（内容他会根据data自己填） -->
        <!-- prop 对应列内容的字段名，也可以使用 property 属性 -->
        <el-table-column prop="id" label="商品ID" width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="商品名称"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="100">
        </el-table-column>
        <el-table-column prop="num" label="商品数量" width="100">
        </el-table-column>
        <el-table-column prop="category" label="规格类目"> </el-table-column>
        <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
        </el-table-column>
        <!-- show-overflow-tooltip 当内容过长被隐藏时显示 tooltip -->
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
        </el-table-column>
        <!-- 最后一列的编辑 删除 -->
        <el-table-column label="操作">
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
      <!-- 下边的操作 -->
      <div style="margin: 20px">
        <el-button @click="delMore">批量删除</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <Pagination :pageSize="pageSize" :total="total" @changeCur="changeCur" />
    </div>
    <!-- 弹框 -->
    <div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="clearDialog"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="addForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="类目选择">
            <el-button type="primary" @click="showInnerVisible"
              >类目选择</el-button
            >
            {{ ruleForm.name }}
          </el-form-item>
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="ruleForm.price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="num">
            <el-input v-model="ruleForm.num"></el-input>
          </el-form-item>
          <el-form-item label="商品卖点" prop="sellPoint">
            <el-input v-model="ruleForm.sellPoint"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="image">
            <el-button type="primary" @click="uploadImg">上传图片</el-button>
            <!-- 上传的图片 -->
            <img
              :src="ruleForm.image"
              alt=""
              style="width: 140px; vertical-align: middle; margin-left: 20px"
            />
          </el-form-item>
          <el-form-item label="商品描述" prop="desc">
            <WangEditor @getWangData="getWangData" ref="wangref" />
          </el-form-item>
        </el-form>
        <!-- 回显规格 -->
        <div v-show="showParam">
          <p>类目参数配置</p>
          <el-form
            :model="dynamicForm"
            ref="dynamicForm"
            label-width="100px"
            class="demo-dynamic"
          >
            <!-- 第一层 -->
            <el-form-item
              v-for="(item, index) in dynamicForm.groups"
              :label="item.title"
              :key="index"
            >
              <!-- 之前是添加title，现在要输value了 -->
              <el-input v-model="item.value"></el-input>
              <!-- 第二层 -->
              <el-form-item
                v-for="(ele, n) in item.children"
                :label="ele.title"
                :key="n"
              >
                <el-input v-model="ele.value"></el-input>
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="clearDialog">取 消</el-button>
          <el-button type="primary" @click="uploadGoods">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 内弹框  写在哪无所谓 弹框都是定位的 -->
      <el-dialog
        width="40%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body
      >
        <GoodsTree @getTreeData="getTreeData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="showTreeData">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 内弹框 上传图片 -->
      <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="imgInnerVisible"
        append-to-body
      >
        <GoodsUpload @showImg="showImg" />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="imgInnerVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from "./../../components/Pagination.vue";
import WangEditor from "./WangEditor.vue";
export default {
  components: {
    Pagination,
    GoodsTree: () => import("./GoodsTree.vue"),
    GoodsUpload: () => import("./GoodsUpload.vue"),
    // WangEditor: () => import("./WangEditor.vue"),
    WangEditor,
  },
  data() {
    return {
      showParam: false, //是否显示回显的规格参数
      dynamicForm: {
        //回显的数据
        groups: [],
      },
      dialogTitle: "", //编辑和添加商品公用弹窗，标题先传
      curPage: 1, //当前页
      idArr: [], //多选选中的id
      tableData: [],
      pageSize: 10,
      total: 100,
      keyword: "", //搜索的关键词
      dialogVisible: false, //弹框是否显示，外
      innerVisible: false, //内弹框
      imgInnerVisible: false, //上传图片的内弹框显示
      treeData: {}, //树结构数据
      ruleForm: {
        //外弹框输入框关联
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
        // 树结构的也统一管理
        category: "", //类目
        cid: "",
        // 上传的图片
        image: "",
      },
      rules: {
        //验证规则
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, message: "至少一件商品", trigger: "blur" },
        ],
      },
    };
  },
  // 监测表单内容变化
  // watch: {
  //   ruleForm(val) {
  //     this.$nextTick(() => {
  //       //延迟执行，等dom有了再执行
  //       console.log("监听数据修改了", val);
  //       // this.ruleForm = val;
  //       //清空富文本编译器
  //       // console.log(this.$refs.wangEditor);
  //       // this.$refs.wangEditor.editor.txt.html(val.descs);
  //     });
  //   },
  // },

  methods: {
    // 取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogTitle = "编辑商品";
      this.dialogVisible = true;
      // 点击同一个商品时，让ruleForm 能被检测出变化，用...  不然对象传址，这样每次都是新地址
      this.ruleForm = { ...row };
      console.log(this.$refs);
      console.log(this.$refs.wangref);
      // 这个打印$refs有wangref是后加载出来之后才有的，但是因为指向地址，先打印的也有了，如果打印this.$refs.wangref就是undefined，之所以一开始没有是因为先点编辑，后加载出显示弹窗，一开始确实没有那个ref
      this.$nextTick(() => {
        this.$refs.wangref.editor.txt.html(this.ruleForm.descs);
      });
      //  this.$refs.wangref.editor.txt.html(this.ruleForm.descs);
      // 如果有规格参数就显示，没有就不显示
      // 回显规格
      this.$api
        .getGuiGeBack({
          cid: row.cid,
        })
        .then((res) => {
          console.log("回显", res);
          if (res.status === 200) {
            let arr = res.result[0].paramData;
            this.dynamicForm.groups = JSON.parse(arr);
            this.showParam = true;
          }
        });
    },
    // 删除商品
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
          this.$api
            .delProduct({
              id: row.id,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message.success("删除成功");
                // 重新请求数据----但是这个在不是第一页删除请求第一页就会显示第一页
                this.getGoods(this.curPage);
              } else {
                this.$message.error(res.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 多选的选项改变触发的函数
    handleSelectionChange(selection) {
      // console.log("多选选项", selection);
      // 要先清空，不然一直都在添加，重复的和删除过得都在
      this.idArr = [];
      selection.map((ele) => this.idArr.push(ele.id));
      console.log(this.idArr);
    },
    // 批量删除
    delMore() {
      // 弹框问一下是不是确认删除
      this.$confirm("选中信息将全部永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认删除
          this.$api
            .delGoods({
              idArr: this.idArr,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message.success("删除成功");
                // 重新请求数据----但是这个在不是第一页删除请求第一页就会显示第一页
                this.getGoods(this.curPage);
              } else {
                this.$message.error(res.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 请求商品列表数据
    getGoods(page) {
      this.$api.productList({ page }).then((res) => {
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
    // 改变当前页，请求数据
    changeCur(val) {
      this.curPage = val;
      this.getGoods(val);
    },
    // 搜索商品
    goSearch() {
      console.log(this.keyword);
      if (this.keyword) {
        this.$api
          .getSearch({
            search: this.keyword,
          })
          .then((res) => {
            console.log("搜索结果", res.data);
            if (res.data.status === 200) {
              this.tableData = res.data.result;
              this.pageSize = 8;
              this.total = res.data.result.length;
            } else {
              console.log("无数据");
              this.tableData = [];
              this.pageSize = 1;
              this.total = 0;
            }
          });
      } else {
        //搜索为空
        this.getGoods(1);
      }
    },
    // 显示弹窗--添加商品触发
    showDialog() {
      this.dialogVisible = true;
      this.dialogTitle = "添加商品";
    },
    //显示类目选择的内弹框
    showInnerVisible() {
      this.innerVisible = true;
    },
    // 外弹框获取内弹框点击树结构的数据
    getTreeData(data) {
      // console.log("baba", data);
      this.treeData = data;
    },
    // 点击确定时候才回显数据--
    showTreeData() {
      this.ruleForm.name = this.treeData.name;
      this.ruleForm.cid = this.treeData.cid;
      this.innerVisible = false;
    },
    // 提交添加的商品数据/或编辑
    uploadGoods() {
      this.dialogVisible = false;
      // 添加的信息会根据字段到表单信息里
      console.log(this.ruleForm);
      if (this.dialogTitle == "添加商品") {
        console.log("添加");
        // 参数：title cid category sellPoint price num desc paramsInfo image
        let { title, cid, sellPoint, price, num, desc, image, category } =
          this.ruleForm;
        this.$api
          .addProduct({
            title,
            cid,
            sellPoint,
            price,
            num,
            desc,
            image,
            category,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success("添加成功");
              // 关闭清空
              this.clearDialog();
              // 刷新商品列表（重新请求当前页数据）
              this.getGoods(this.curPage);
            } else {
              this.$message.error("添加失败");
            }
          });
      } else {
        console.log("修改商品");
        let {
          title,
          sellPoint,
          price,
          cid,
          category,
          num,
          desc,
          paramsInfo,
          image,
          id,
        } = this.ruleForm;
        this.$api
          .editGoods({
            title,
            sellPoint,
            price,
            cid,
            category,
            num,
            desc,
            paramsInfo,
            image,
            id,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success("修改成功");
              // 关闭清空
              this.clearDialog();
              // 刷新商品列表（重新请求当前页数据）
              this.getGoods(this.curPage);
            }
          });
      }
    },
    // 关闭----清空弹窗表单的方法
    clearDialog() {
      // 隐藏弹框
      this.dialogVisible = false;
      //清空表单数据  (也可重新设置值为空，初始化)
      // this.$refs["addForm"].resetFields();
      this.ruleForm = {
        category: "", //类目名称
        cid: "", //类目标识
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
      };
      // 清空富文本框（清空的方法在子组件实例上）
      this.$refs.wangref.editor.txt.clear();
      // 清下边的回显
      this.dynamicForm.groups = [];
    },
    // 上传图片  显示弹窗
    uploadImg() {
      this.imgInnerVisible = true;
    },
    // 图片回显
    showImg(imgUrl) {
      this.ruleForm.image = imgUrl;
    },
    // 获取文本框内容
    getWangData(desc) {
      console.log(desc);
      this.ruleForm.desc = desc;
    },
  },

  created() {
    // 请求第一页数据
    this.getGoods(1);
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