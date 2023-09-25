// 项目中我们大多数时候都会把对应的接口请求封装成api来调用
import request from "./request.js";
// import request2 from "./request2.js";


// 四期数据获取
export function dataGet(params) {
    // console.log("111111111111111", params);
    return request({
        method: 'get',
        url: '/ding/user/GetAllJinAndBlog',
        params
    })
}

// 登录
export function login(data) {
    return request({
        method: 'post',
        url: '/v2/login',
        data
    })
}
export function userRole() {
    return request({
        method: 'get',
        url: '/ding/user/getUserRole',
    })
}

// 获取路由数据
export function getRouters() {
    return request({
        method:'get',
        url:'/ding/dept/getNeedJianShuAndBlogDept'
    })
}