<template>
  <div class="Breadcrumb">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in this.$route.matched"
          :key="index"
        >
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$route.matched);
  },
};
</script>

<style lang="scss">
.el-card {
  width: 100%;
}
</style>