<template>
  <div class="menu">
    <el-aside width="180px">
      <el-menu router default-active="2" class="el-menu-vertical-demo" background-color="#dcdcdc" text-color="#000">

        <el-menu-item-group v-for="(child, index) in menu" :key="index">
          <el-menu-item @click="show(child.name)">
            {{ child.name }}
          </el-menu-item>
        </el-menu-item-group>

      </el-menu>
    </el-aside>
  </div>
</template>

<script>

export default {
  data() {
    return {
      menus: [],

    };
  },
  methods: {
    show(classname) {
      this.$bus.$emit('classname', classname);
    }
  },

  props: {
    menu: Array
  }

};
</script>

<style lang="scss" scoped>
.menu {
  .el-aside {
    height: 100%;

    .el-menu {
      height: 100%;

      //box-sizing: border-box;
      // padding-top: 60px;
      .fa {
        margin-right: 10px;
      }
    }

    .el-submenu .el-menu-item {
      min-width: 0;
    }

    .el-menu-item {
      text-align: center;
      font-family: "黑体";
      font-size: 20px;
    }
  }
}
</style>