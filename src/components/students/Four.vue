<template>
  <div class="four">
    <jianshu />
  </div>
</template>

<script>
import { dataGet } from "@/api/api.js";
import jianshu from "@/components/tables/jianshu.vue";
export default {
  data() {
    return {
      data: "",
      jianList: [],
      blogList: [],
    };
  },
  components: {
    jianshu
  },
  created() {

    // 绑定自定义事件
    this.$bus.$on('classname', (classname) => {
      console.log('我是Four组件，收到了数据', classname);
      dataGet({ dept_name: classname })
        .then((res) => {
          if (res.status === 200) {
            this.$bus.$emit('brotherEvent', res.data.data[0])
          }
        })
    })


  },
  beforeDestroy() {
    this.$bus.$off('classname')
  }
}
</script>

<style lang="scss"></style>
 