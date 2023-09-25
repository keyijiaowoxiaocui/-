<template>
  <div class="header">
    <el-header>
      <div class="logo"><img src="@/assets/ms.png" alt="" /></div>
      <div class="title">三月软件简书管理系统</div>
      <div class="user">
        <p v-if="this.username">用户：{{ username }}</p>
        <p v-else>用户：请登录</p>
      </div>
      <div class="exit">
        <el-button type="danger" size="small" @click="exit()"
          >退出登录</el-button
        >
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      username: "",
    };
  },

  created() {
    console.log(localStorage.getItem("username"));
    this.username = localStorage.getItem("username");
  },
  methods: {
    exit() {
      if (window.confirm("您确定退出吗")) {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        this.$router.push("/login");
        this.$message({ message: "退出成功", type: "success" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  height: 70px !important;
  min-width: 1100px;
  .el-header {
    position: relative;
    height: 70px !important;
    display: flex;
    justify-content: center;
    line-height: 70px;
    color: #000;

    .logo {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 10px;
      left: 40px;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 30px;
      width: 300px;
      font-family: 黑体;
      margin-left: 80px;
      color: #000;
    }

    .user {
      position: absolute;
      font-size: 20px;
      font-family: 黑体;
      top: 0;
      right: 250px;
      color: #000;
    }

    .exit {
      position: absolute;
      top: 0;
      right: 100px;

      .el-button {
        span {
          font-size: 30px;
          font-family: 黑体;
        }
      }
    }
  }
}
</style>