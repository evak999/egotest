<template>
  <div>
    <div class="ad-type">
      <el-tree
        :data="data"
        :props="props"
        lazy
        :load="loadNode"
        :expand-on-click-node="false"
        :render-content="renderContent"
        node-key="pid"
        :default-expanded-keys="[1001]"
        @node-click="handleNodeClick"
      >
      </el-tree>
      <!-- 使用render-content指定渲染函数，该函数返回需要的节点区内容即可 -->
      <!-- 弹框 -->
      <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
        <p>当前广告位置：{{ adInfo.name }}</p>
        <el-input type="text" v-model="advertName" />

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAdvert">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="ad-content">
      <div class="title">
        <el-button type="primary">{{ adInfo.name }}</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="pid" label="PID" width="180"> </el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column
          prop="url"
          label="访问地址"
          width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="image"
          label="图片地址"
          width="200"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      title: "", //弹窗的标题
      adInfo: {
        name: "广告",
        pid: "",
      }, //点击的广告信息
      advertName: "", //输入的广告名
      data: [],
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      tableData: [], //表格数据
    };
  },

  methods: {
    // 请求树结构数据
    http() {
      this.$api.getAdList().then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.data = res.result;
        } else {
          console.log("没数据");
        }
      });
    },
    // 进入组件懒加载数据
    loadNode(node, resolve) {
      if (node.level === 0) {
        //0是第一次进
        this.$api
          .getAdList() //第一次请求第一层直接，不传参默认1
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              console.log("没数据");
              return resolve([]);
            }
          });
      }
      if (node.level >= 1) {
        this.$api
          .getAdList({ id: node.data.pid }) //点的id  node里有
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              console.log("没数据");
              return resolve([]);
            }
          });
      }
    },

    // 增加 / 编辑
    append(data, type) {
      console.log("点击的节点信息-----", data);
      this.dialogVisible = true;
      this.adInfo = data;
      if (type == "add") {
        this.title = "添加广告";
        this.advertName = "";
      } else {
        this.title = "编辑广告";
        this.advertName = data.name;
      }
    },
    // 增加、编辑 弹窗确认
    submitAdvert() {
      console.log("输入的要添加的广告名字", this.advertName);
      if (this.title === "添加广告") {
        // 请求要的name是输入的name，不是点击的name，他是靠pid找的往哪里加
        this.$api
          .addAd({
            pid: this.adInfo.pid,
            name: this.advertName,
          })
          .then((res) => {
            console.log("添加结果", res);
            if (res.status === 200) {
              this.$message.success("添加成功");
              // 更新数据
              this.http();
            } else {
              this.$message.error("添加失败");
            }
          });
      } else {
        this.$api
          .editAd({
            pid: this.adInfo.pid,
            name: this.advertName,
          })
          .then((res) => {
            console.log("编辑结果", res);
            if (res.status === 200) {
              this.$message.success("修改成功");
              // 更新数据
              this.http();
            } else {
              this.$message.error("修改失败");
            }
          });
      }
      // 清空输入框数据
      this.dialogVisible = false;
    },

    // 删除广告分类
    remove(node, data) {
      console.log(node, data);
      this.$api.delAd({ pid: data.pid }).then((res) => {
        console.log("删除结果", res);
        if (res.status === 200) {
          this.$message.success("删除成功");
          this.http();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // render方式渲染树节点的添加 编辑 删除
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              // 可以在触发事件时候传标识
              on-click={() => this.append(data, "add")}
            >
              增加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data, "edit")}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
    // 点击树节点的节点，右边出现对应广告内容
    handleNodeClick(data) {
      console.log("点击的节点信息", data);
      this.adInfo = data;
      // 清空之前的表格数据
      this.tableData=[]
      // 请求广告数据
      this.$api.getAdContent({pid:data.pid}).then(res=>{
        console.log('获取广告内容',res);
        if(res.status===200){
          this.tableData=res.result
        }else{
          console.log('无数据');
        }
      })
    },
    // 广告的按钮点击，出弹窗，输入框对应表格那几项修改
    // 广告内容部分表格里的删除
    handleDelete() {},
  },
};
</script>

<style lang="scss" scoped>
.ad-type,
.ad-content {
  float: left;
  margin: 30px;
}
.el-tree-node__content {
  .custom-tree-node {
    padding-right: 20px;
  }
  button {
    margin-left: 10px;
  }
}
.ad-content{
  .title {
    button {
      margin: 20px 360px;
    }
  }
}
</style>