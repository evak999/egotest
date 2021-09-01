<template>
  <div>
    <el-pagination 
     background 
     layout="total,prev, pager, next,jumper" 
     :total="total"
     :pageSize='pageSize'
     @current-change="changePage"
     >
    </el-pagination>
  </div>
</template>

<script>
export default {
   props:{ 
     pageSize: { //每页显示条目个数
       type:Number,
       default:10
     },
     total:{ //总条目数
       type:Number,
       default:100
     }
   },
   methods: {
      changePage(val) {
        console.log(`当前页: ${val}`);
        // 传给父亲当前页，父亲请求数据
        this.$emit('changeCur',val)
      }
    },

};
</script>

<style>
</style>