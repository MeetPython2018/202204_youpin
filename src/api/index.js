// 包含请求函数的模块
import ajax from "./ajax"
const BASE_URL = "http://8.219.72.10:9000"
// const BASE_URL = '/api/api'

export const reqRecommedGoods = () => ajax(`${BASE_URL}/pullgoods`)
export const reqCategory = () => ajax(`${BASE_URL}/category`)
export const Login = (postData) => ajax(`${BASE_URL}/sign`,postData,"POST")
