<template>
  <div>
    <!-- 懒加载的树形结构 -->
    <el-tree :props="props" :load="loadNode" lazy @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name", //这个叫啥一级的标题就叫啥
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    // 点击树结构节点的回调函数
    handleNodeClick(data) {
      console.log('点击树节点',data);
      // 把点击的节点数据传给父元素（外层弹框上要回显）
      this.$emit('getTreeData',data)
    },
    //   懒加载
    loadNode(node, resolve) {
      //弹窗加载会自己调用这个函数  在点击一级标题啥的也会触发
      console.log(node.level, node); //node就是这个虚拟dom

      if (node.level === 0) {
        console.log("初始化，进入lazy树加载");
        // 这里name的值就是一级标题，name是和上边的label字段要一致
        // 获取一级类目  (一级可以不传参，不传默认等级1)
        this.$api.selectCategory().then((res) => {
          console.log(res);
          if (res.status === 200) {
            // 他是自己定义好的规则，不需要赋值给谁，但是后台的result里一级类目的字段必须和上边定义的一致，正好这个就是name
            return resolve(res.result);
          }
        });
      } else {
        console.log("二级加载");
        // 二级要传参，这个node节点里就能获取到cid了
        this.$api
          .selectCategory({
            id: node.data.cid,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              // 他是自己定义好的规则，不需要赋值给谁，但是后台的result里一级类目的字段必须和上边定义的一致，正好这个就是name
              return resolve(res.result);
            } else {
              // 没数据就是没有再往下的结构了，这个else必须写不然会一致转圈
              return resolve([]);
            }
          });
      }
    },
  },
};
</script>

<style>
</style>