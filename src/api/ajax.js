import axios from "axios"
axios.defaults.withCredentials = true
//请求拦截器
// axios.instance.interceptors.request.use(    
//   config => {        
//       const token = store.state.token;
//       token && (config.headers.Authorization = 'Bearer ' + token);        
//       return config;    
//   },    
//   error => Promise.error(error)
// )
export default function ajax(url,data={},type="GET"){
  return new Promise((resolve,reject)=>{
    // 执行异步ajax请求
    let promise
    if(type==="GET"){
      let dataStr = ''
      Object.keys(data).forEach(key=>{
        dataStr += key + "=" + data[key] + "&"
      })
      if(dataStr!==''){
        dataStr = dataStr.substring(0,dataStr.lastIndexOf("&"))
        url = url + "?" + dataStr
      }
      promise = axios.get(url)
    }else{
      promise = axios.post(url,data)
    }
    promise.then(function(response){
      resolve(response.data)
    }).catch(function(error){
      reject(error)
    })
  })
}
