// 包含请求函数的模块
import ajax from "./ajax"
// const BASE_URL = "http://8.219.72.10:9000"
const BASE_URL = '/api'

// 获取首屏商品
export const reqRecommedGoods = () => ajax(`${BASE_URL}/pullgoods`)
// 查询业务线分类
export const reqCategory = () => ajax(`${BASE_URL}/category`)
// 登录
export const Login = (data) => ajax(`${BASE_URL}/sign`,data,"POST")
// 使用seesion自动登录
export const autoLogin = ()=> ajax(`${BASE_URL}/userinfo`)
// 查询地址
export const reqAddress = (uid) => ajax(`${BASE_URL}/findaddress?uid=`+uid)
// 添加地址
export const addAddress = (data) => ajax(`${BASE_URL}/addlocation`,data,"POST")

