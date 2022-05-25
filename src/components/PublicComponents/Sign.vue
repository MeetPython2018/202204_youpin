<template>
  <main>
    <van-nav-bar title="登录/注册">
      <template #left>
        <i class="iconfont icon-fanhui" @click="$router.back()"></i>
      </template>
    </van-nav-bar>
    <section>
      <div class="logo">
        <img src="../../assets/Nasa.svg" alt="">
        <span>NASA</span>
      </div>
      <div class="signType">
        <span :class="{on:signWay}" @click="signWay=true">短信登录</span>
        <span :class="{on:!signWay}" @click="signWay=false">账号登录</span>
      </div>
      <van-form @submit="onSubmit">
        <div v-if="signWay">
          <van-field v-model="tel" label-width="64" type="tel" label="手机号" 
          required
          placeholder="输入手机号"
          maxlength="11"
          clearable
          @input="inputCheck"
          />
          <van-field
            v-model="sms"
            type="number"
            label-width="64"
            center
            maxlength="6"
            clearable
            required
            label="验证码"
            placeholder="短信验证码"
            >
            <template #button>
              <van-button size="small" type="primary" :disabled="disableSend" @click.prevent="sendCode($event)">
                {{!sending ? '获取验证码':`已发送:${computedTime}秒`}}
              </van-button>
            </template>
          </van-field>
        </div>
        <div v-else>
          <van-field v-model="email" label-width="40" type="text" label="邮箱" 
            required
            placeholder="邮箱地址"
            maxlength="30"
            clearable
            @blur="checkEmail"
            />
          <van-field v-model="password" label-width="40" :type="checked ? 'text':'password'" label="密码" 
            required
            placeholder="设置密码(大于6位且包含数字和字母)"
            maxlength="20"
            clearable
            @blur="checkPassword"
          >
            <template #extra>
              <van-switch v-model="checked" size="18px" active-color="#07c160" inactive-color="#dcdee0"/>
            </template>
          </van-field>
          <van-field v-model="captcha" label-width="60" type="text" label="验证码" 
            required
            placeholder="图形验证码"
            maxlength="4"
            clearable
            @blur="checkPassword"
            />
        </div>
        <div class="tips">
          <p>
            温馨提示: 未注册有品的手机号，登录时将自动注册，且代表已同意
            《<a href="javaScript:;">用户服务协议</a>》
            <a href="javaScript:;" class="forget">找回密码</a>
          </p>
        </div>
        <div class="subBtn">
          <van-button block type="primary" native-type="submit" square :loading="isSubmit" loading-text="登录中...">立即登录</van-button>
        </div>
        <div class="aboutUs"><span>关于我们</span></div>
      </van-form>
    </section>
  </main>
</template>

<script>
import ajax from "../../api/ajax"
import {Login} from "@/api"
import {NavBar,Form,Field,Button,CountDown,Toast,Switch} from "vant"
export default {
  name:"Sign",
  components:{
    [NavBar.name]:NavBar,
    [Form.name]:Form,
    [Field.name]:Field,
    [Button.name]:Button,
    [CountDown.name]:CountDown,
    [Toast.name]:Toast,
    [Switch.name]:Switch
  },
  data() {
    return {
      signWay: false,            //  登录方式
      tel:'',                  // 保存手机号
      sms:'',                 // 保存验证码
      disableSend: true,      // 发送验证码的按钮是否可用
      sending: false,         // 是否已经发送了验证码
      isSubmit: false,
      pattern: /\d{6}/,       // 验证码的正则
      info:"发送验证码",
      computedTime: 60,  // 倒计时
      email:'',
      password:'',
      checked:false,
      captcha:''  // 图形验证码
    }
  },
  computed:{
    submited(){
      return true
    },
    regPhone(){
      return /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(this.tel)
    },
    regSms(){
      return /^\d{6}/.test(this.sms)
    },
    regEmail(){
      return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)
    },
    regPassword(){
      return /\d{3,}[A-z]{3,}|[A-z]{3,}\d{3,}/.test(this.password)
    }
  },
  methods:{
    validator(){
      return /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(this.tel)
    },
    inputCheck(val){  // 手机号输入时验证
      if(val.length===11 && /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(val)){
        this.disableSend = this.sending ? true:false
      }else{
        this.disableSend = true
      }
    },
    sendCode(){  // 点击发送验证码
      this.disableSend = true
      this.sending = true
      const intervalId = setInterval(()=>{
        this.computedTime--
        if(this.computedTime<=0){
          clearInterval(intervalId)
          this.computedTime = 60
          this.sending = false
          this.disableSend = false
        }
      },1000)
    },
    async onSubmit(){
      if(this.signWay){
        if(!this.regPhone){
          Toast.fail("手机号格式不正确")
        }else if(!this.regSms){
          Toast.fail("验证码格式不正确")
        }else{
          this.isSubmit = true
          // const res = await ajax("/api/api/sign",{username:this.tel,password:this.sms},"POST")
          // this.$store.commit("setLogin",res)
          // localStorage.setItem("login",JSON.stringify(res))
          // if(res.code===1){
            this.$router.replace("/")
          // }
        }
      }else{
        if(!this.regEmail){
          Toast.fail("邮箱格式不正确")
        }else if(!this.regPassword){
          Toast.fail("密码不符合要求")
          this.checked = true
        }else if(!/^\w{4}$/.test(this.captcha)){
          Toast.fail("验证码不符合要求")
        }else{
          this.isSubmit = true
          const res = await Login({username:this.email,password:this.password})
          this.$store.commit("setLogin",res)
          localStorage.setItem("cookie",res.token)
          if(res.code===1){
            this.$router.replace("/")
          }else{
            this.isSubmit = false
            Toast.fail(res.msg)
          }
        }
      }
    },
    // 邮箱登录验证
    checkEmail(){
      this.email = this.email.replace(/(^\s*)|(\s*$)/g,'')
      if(this.email){
        if(!this.regEmail){
          Toast.fail("邮箱格式有误")
        }
      }
    },
    // 密码检查
    checkPassword(){
      if(this.password){
        if(!this.regPassword){
          Toast("密码为数字+字母组合，长度不低于6位")
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    height: 100vh;
    section{
      padding: 0 12px;
      margin-top: 32px;
      .logo{
        width: 64%;
        margin: 0 auto;
        font-size: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "macfont";
        span{
          opacity: .54;
        }
        img{
          width: 54px;
        }
      }
      .signType{
        width: 64%;
        margin: 16px auto;
        font-size: 16px;
        display: flex;
        justify-content: space-evenly;
        .on{
          color: @success;
          position: relative;
          &:after{
            content: "";
            width: 100%;
            height: 2px;
            background-color: @success;
            position: absolute;
            left: 0;
            bottom: -3px;
          }
        }
      }
      .slide{
        width: 100%;
        height: 48px;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: 0 8px;
        box-sizing: border-box;
      }
      .van-form{
        .van-cell{
          margin-bottom: 8px;
        }
        .van-switch{
          position: relative;
          right: -5px;
          top: 0;
          bottom: 0;
          margin: auto 0;
        }
        .tips{
          p{
            opacity: .64;
            line-height: 1.5;
            margin: 0;
            font-size: 14px;
            a{
              color: @success;
              text-decoration: underline;
              padding: 0 2px;
              &.forget{
                color: @red;
                margin-left: 8px;
              }
            }
          }
        }
        .subBtn{
          margin: 16px auto 8px;
          display: flex;
          justify-content: space-between;
          .van-button{
            font-size: 16px;
            border-radius: 4px;
            letter-spacing: 1px;
          }
        }
        .aboutUs{
          font-size: 14px;
          text-align: center;
          opacity: .64;
        }
      }
    }
  }
</style>