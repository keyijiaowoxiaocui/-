<template>
  <div class="four">
    <el-table v-loading="loading"
      :data="data.data"
      border
      style="width: 100% backgroung-color:red;"
    >
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column label="博客 & 简书">
        <template slot-scope="scope">
          <el-table  border :data="scope.row.blog_article">
            <el-table-column label="类型" width="200" prop="type">
              <template slot-scope="scope">
                <p>{{ scope.row.type == undefined ? "博客" : "简书" }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="blog_article_url" label="链接">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :href="scope.row.blog_article_url"
                  target="_blank"
                  >{{ scope.row.blog_article_name }}</el-link
                >
              </template>
            </el-table-column>
            <el-table-column label="评选文章" prop="id" width="208" v-if="show">
              <template slot-scope="scope">
                <!-- <el-button type="primary" plain @click="isExllcentBlog(scope, scope.row.id, $event)" ref="bt1">{{
                  scope.row.is_excellent_blog == true ? "取消优秀" : "判为优秀文章"
                }}</el-button> -->
                <button
                  :class="
                    scope.row.is_excellent_blog == true
                      ? 'checked'
                      : 'nochecked'
                  "
                  @click="isExllcentBlog(scope, scope.row.id, $event)"
                >
                  {{
                    scope.row.is_excellent_blog == true
                      ? "取消优秀"
                      : "判为优秀文章"
                  }}

                </button>
              </template>
            </el-table-column>
            <!-- <el-table-column label="查重率" width="200"> </el-table-column> -->
          </el-table>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/api/request";
import {userRole } from "@/api/api.js";
export default {
  data() {
    return {
      data: "",
      jianList: [],
      blogList: [],
      num: 0,
      role: "",
      show: false,
      loading:true,
    };
  },

  mounted() {
    this.permission();
    this.$bus.$on("brotherEvent", (res) => {
      
      this.data = res;
      console.log(this.num);
      console.log(123456);

        this.role = localStorage.getItem("role");
        this.num++;

        res.data.map((item) => {
          // 创建一个简书数组
          let articles = [];
          // 遍历简书，将简书对象转化为博客对象，并且给对象添加type属性
          item.jian_shu_article.map((article) => {
            // 因为 blog 对象是一个循环内的对象，所以需要添加到循环之外的数组articles当中
            let blog = {
              // 对象内容映射
              id: article.id,
              is_excellent_blog: article.is_excellent_jian,
              blog_article_url: article.jian_shu_article_url,
              blog_article_name: article.jian_shu_article_name,
              user_name: article.user_name,
              // type随便写，任意值就行，上边判断简书和博客主要依赖于是否存在该字段
              // type: true,
              // type: 1,
              type: "jianshu",
            };
            // 将对象添加到数组
            articles.push(blog);
          });
          // 拼接成一个数组
          item.blog_article = [...item.blog_article, ...articles];
        });
   
    });
    this.loading = false

  },
  methods: {
    isExllcentBlog(scope, id, val) {
      if (scope.row.type) {
        request
        .post("/ding/user/UpdateIsExcellentJianShu", { id })
        .then((res) => {
            console.log(res.data.msg);
            if (res.data.msg != "很抱歉您没有此权限") {
              if (res.data.msg == "标记优秀成功") {
                val.target.innerText = "取消优秀";
                val.target.className = "checked";
                this.$message({ message: "评优成功", type: "success" });
              } else {
                val.target.innerText = "判为优秀文章";
                val.target.className = "nochecked";
                this.$message({ message: "取消成功", type: "success" });
              }
            } else {
              this.$message({ message: "很抱歉您没有此权限", type: "warning" });
            }
          });
      } else {
        request.post("/ding/user/UpdateIsExcellentBlog", { id }).then((res) => {
          console.log(id);
          if (res.data.msg != "很抱歉您没有此权限") {
            if (res.data.msg == "标记优秀成功") {
              val.target.innerText = "取消优秀";
              val.target.className = "checked";
              this.$message({ message: "评优成功", type: "success" });
            } else {
              val.target.innerText = "判为优秀文章";
              val.target.className = "nochecked";
              this.$message({ message: "取消成功", type: "success" });
            }
          } else {
            this.$message({ message: "很抱歉您没有此权限", type: "warning" });
          }
        });
      }
    },
    permission() {
      userRole().then((res) => {
        this.role = res.data.data;
        // console.log(this.role);
        if (this.role === "user") {
          this.show = false;
        } else {
          this.show = true;
        }
      });
    },
    ex(scope) {
      console.log(scope);
    },
  },
};
</script>
  
<style lang="scss">
.four {
  overflow: hidden;

  .cell {
    text-align: center;

    .cell {
      .nochecked {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: 0.1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        background-color: #ecf5ff;
        color: #409eff;
      }
      .nochecked:hover {
        background-color: #409eff;
        color: #fff;
      }

      .checked {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: 0.1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
}
</style>
   