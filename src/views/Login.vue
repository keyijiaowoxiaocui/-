<template>
  <div class="login">
    <!-- :model 表单数据的来源 写了之后 才能写 form.xxx -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>简书博客管理系统</span>
      </div>
      <div class="text item">
        <el-form label-width="80px" :model="form" ref="form" :rules="rules">
          <el-form-item class="login_box" prop="username">
            <!-- required就是不能为空 必须在css效果中有很大的作用 -->
            <!-- 可以简写为required -->
            <input
              auto-complete
              type="text"
              v-model="form.username"
              required
            /><label>用户名</label>
          </el-form-item>
          <el-form-item class="login_box" prop="password">
            <input
              type="password"
              v-model="form.password"
              required="required"
              @keyup.enter="submitForm('form')"
            /><label>密码</label>
          </el-form-item>
          <!-- <el-button type="primary" class="button" @click="submitForm('form')">登录</el-button> -->
          <div class="bottom">
            <a
              href="javascript:void(0)"
              class="left"
              @click="submitForm('form')"
            >
              登录
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { setToken } from "@/utils/setToken.js";
import { login } from "@/api/api.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },

      rules: {
        /* 
        element-ui进行的表单页面的格式检查   需要在<el-form> 配置:rules="rules"  相应 <el-form-item> 配置 prop="username"
        required ： 必填
        min，max ： 最小最大字符数
        message：判断错误时返回的错误信息
        tigger：检查时机
      */
        username: [
          { required: true, message: "请输入用户名", tigger: "blur" },
          // { min: 4, max: 10, message: '长度在4-10位字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入密码", tigger: "blur" },
          // { min: 6, max: 12, message: '长度在6-12位字符之间', trigger: 'blur' }
        ],
      },
    };
  },

  //validate 函数用于element-ui的表单验证 需在 <el-form-item> 里写 prop属性
  methods: {
    submitForm(form) {
      localStorage.clear();
      //this.$refs[form] === this.$refs.form
      // validate函数是element-ui封装的对整个表单进行格式验证的函数，使用时需要配置prop,如果通过valid返回true
      // 提交时进行一次验证
      this.$refs[form].validate((valid) => {
        if (valid) {
          login(this.form).then((res) => {
            if (res.data.code === 200) {
              console.log(res.data);
              // 设置token
              setToken("username", res.data.data.user_name);
              setToken("token", res.data.data.token);
              // 弹出登录成功提示  message提示信息
              this.$message({ message: "登录成功", type: "success" });
              // // 进行路由跳转
              this.$router.push("/home");
            } else {
              this.form.username = "";
              this.form.password = "";
              this.$message({ message: "用户名或密码错误", type: "error" });
            }
            // console.log(res.data.code);
          });
        }
        // else {
        //   console.error(this.form)
        //   return false;
        // }
      });
    },
  },
};
</script>


<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #1a293e;

  .login_box {
    /* 相对定位 */
    position: relative;
    width: 100%;

    input {
      -webkit-text-security: none;

      /* 清除input框自带的边框和轮廓 */
      outline: none;
      border: none;
      width: 100%;
      padding: 10px 0;
      margin-bottom: 30px;
      color: #fff;
      font-size: 1vw;
      border-bottom: 1px solid #fff;
      /* 背景颜色为透明色 */
      background-color: transparent;
    }

    label {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px 0;
      font-size: 1vw;
      color: #fff;
      /* 这个属性的默认值是auto 默认是这个元素可以被点击 但是如果我们写了none 就是这个元素不能被点击 , 就好像它可见但是不能用 可望而不可即 */
      /* 这个就是两者的区别 */
      pointer-events: none;
      /* 加个过渡 */
      transition: all 0.5s;
    }
  }

  .box-card {
    position: relative;
    width: 25vw;
    height: 25vw;
    min-width: 400px;
    min-height: 400px;
    padding: 1vw;
    margin: 150px auto;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);
    border: none;

    .el-card__header {
      border: none;

      span {
        font-size: 1.5vw;
        color: #fff;
        font-weight: bold;
      }
    }

    .clearfix {
      display: flex;

      span {
        margin: auto;
      }
    }

    .el-form > div {
      margin-top: 2vw;
      .el-form-item__content {
        margin-left: 0 !important;
        input {
          padding-top: 30px;
          padding-bottom: 0;
        }
        .el-form-item__error {
          margin-top: -20px;
        }
      }
    }
  }

  .button {
    margin-left: 90px;
  }

  #button {
    margin-left: 100px;
  }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

/* :focus 选择器是当input获得焦点是触发的样式 + 是相邻兄弟选择器 去找与input相邻的兄弟label */
/* :valid 选择器是判断input框的内容是否合法,如果合法会执行下面的属性代码,不合法就不会执行,我们刚开始写布局的时候给input框写了required 我们删掉看对比 当没有required的话input框的值就会被认为一直合法,所以一直都是下方的样式 ,但是密码不会,密码框内的值为空,那么这句话局不合法,required不能为空 当我们给密码框写点东西的时候才会执行以下代码*/
.login .login_box input:focus + label,
.login .login_box input:valid + label {
  top: -15px;
  color: #03e9f4;
  font-size: 0.8vw;
}

.bottom {
  a {
    margin: 0 auto;
    display: block;
    width: 3vw;
    height: 2vw;
    min-width: 25px;
    overflow: hidden;
    position: relative;
    padding: 10px 20px;
    color: #03e9f4;
    text-align: center;
    line-height: 2vw;
    /* 取消a表现原有的下划线 */
    text-decoration: none;
    /* 同样加个过渡 */
    transition: all 0.5s;
    font-size: 1vw;

    span {
      position: absolute;
    }
  }
}

.bottom a:hover {
  color: #fff;
  border-radius: 5px;
  background-color: #03e9f4;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.bottom a span:first-child {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  /* to right 就是往右边 下面的同理 */
  background: linear-gradient(to right, transparent, #03e9f4);
  /* 动画 名称 时长 linear是匀速运动 infinite是无限次运动 */
  animation: move1 1s linear infinite;
}

.bottom a span:nth-child(2) {
  right: 0;
  top: -100%;
  width: 2px;
  height: 100%;
  background: linear-gradient(transparent, #03e9f4);
  /* 这里多了个0.25s其实是延迟时间 */
  animation: move2 1s linear 0.25s infinite;
}

.bottom a span:nth-child(3) {
  right: -100%;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to left, transparent, #03e9f4);
  animation: move3 1s linear 0.5s infinite;
}

.bottom a span:last-child {
  left: 0;
  bottom: -100%;
  width: 2px;
  height: 100%;
  background: linear-gradient(#03e9f4, transparent);
  animation: move4 1s linear 0.75s infinite;
}

/* 写一下动画 再坚持一下 视频马上就完了 */
@keyframes move1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

@keyframes move2 {
  0% {
    top: -100%;
  }

  50%,
  100% {
    top: 100%;
  }
}

@keyframes move3 {
  0% {
    right: -100%;
  }

  50%,
  100% {
    right: 100%;
  }
}

@keyframes move4 {
  0% {
    bottom: -100%;
  }

  50%,
  100% {
    bottom: 100%;
  }
}
</style>