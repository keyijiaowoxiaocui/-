<template>
  <div id="app">
    <div class="home">
      <Header />
      <el-container class="content">
        <Menu :menu="menus" />
        <el-container>
          <el-main class="custom-background">
            <Bread />
            <div class="cont">
              <Four/>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
// import Footer from "../components/common/Footer.vue";
import Menu from "../components/common/Menu.vue";
import Bread from "../components/common/Breadcrumb.vue";
import Four from "../components/students/Four.vue";

import {getRouters} from '@/api/api.js'
export default {
  components: {
    Header,
    // Footer,
    Menu,
    Bread,
    Four
  },
  data() {
    return {
      menus: [],
    };
  },

  created() {
    getRouters().then(res => {
      this.menus = res.data.data
      console.log(res.data.data);
    })
  }
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;

  .content {
    position: absolute;
    width: 100%;
    top: 70px;
    bottom: 0;

    .cont {
      margin: 20px 0;
      color: #dcdcdc;
    }

    .el-main {
      padding: 0px;

      .el-card {
        background-color: #dcdcdc;

        .el-breadcrumb__inner {
          color: #000;
          font-family: 黑体;
          font-size: 16px;
        }
      }
    }

    .el-footer {
      padding: 15px 0px;
    }
  }
}
</style>
    <!-- .custom-background {
      background-color: #7a7374; /* 这里可以设置为你想要的颜色 */
    } -->