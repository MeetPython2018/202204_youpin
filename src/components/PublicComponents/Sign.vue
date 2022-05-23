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
          placeholder="请输入手机号"
          maxlength="11"
          clearable
          @input="inputCheck"
          />
          <div class="slide" v-show="isSlideShow">
            <drag-verify ref="dragVerify" :width="360" text="请按住滑块拖动" message="" :isPassing.sync="isPassing" 
              handlerIcon="iconfont icon-jiantou_xiangyouliangci_o" successIcon="iconfont icon-wancheng" @passcallback="disableSend = false" successText="人机通过"
              >
            </drag-verify>  
          </div>
          <van-field
            v-model="sms"
            type="number"
            label-width="64"
            center
            maxlength="6"
            clearable
            required
            label="验证码"
            placeholder="请输入短信验证码"
            >
            <template #button>
              <van-button size="small" type="primary" :disabled="disableSend" @click="sendCode($event)">
                {{info}}
                <van-count-down :time="time" format="ss" ref="countDown" :auto-start="false" @finish="finish" v-show="send"/>
              </van-button>
            </template>
          </van-field>
        </div>
        <div v-else>
          <van-field v-model="email" label-width="40" type="text" label="邮箱" 
            required
            placeholder="输入邮箱地址"
            maxlength="30"
            clearable
            @blur="checkEmail"
            />
          <van-field v-model="password" label-width="40" type="password" label="密码" 
            required
            placeholder="设置密码（大于6位且包含数字和字母）"
            maxlength="20"
            clearable
            @blur="checkPassword"
            />
          <p class="forget">登录即注册，如忘记密码，<span style="color:red">点此处找回密码</span></p>
        </div>
        <div style="margin: 32px 0;">
          <van-button round block type="primary" native-type="submit">立即登录</van-button>
        </div>
      </van-form>
    </section>
  </main>
</template>

<script>
import ajax from "../../api/ajax"
import {NavBar,Form,Field,Button,CountDown,Toast} from "vant"
export default {
  name:"Sign",
  components:{
    [NavBar.name]:NavBar,
    [Form.name]:Form,
    [Field.name]:Field,
    [Button.name]:Button,
    [CountDown.name]:CountDown,
    [Toast.name]:Toast
  },
  data() {
    return {
      signWay:true,   //  登录方式
      tel:'',   // 保存手机号
      sms:'',   // 保存验证码
      isPassing: false,    // 人机滑动是否通过
      isSlideShow: false,     // 滑动检测是否出现
      disableSend: true,     // 发送验证码的按钮是否可用
      send: false,       // 是否已经发送了验证码
      pattern: /\d{6}/,   // 验证码的正则
      time: 90*1000,    // 倒计时
      info:"发送验证码",
      password:'',
      email:''
    }
  },
  computed:{
    submited(){
      return true
    },
    regEmail(){
      return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)
    },
    regPassword(){
      return /\d{3,}[A-z]{3,}/.test(this.password)
    }
  },
  methods:{
    validator(){
      return /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(this.tel)
    },
    inputCheck(val){  // 手机号输入时验证
      if(val.length===11 && /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(val)){
        this.isSlideShow = true
      }else{
        this.isPassing = false
        this.$refs.dragVerify.reset()
        this.isSlideShow = false
        this.disableSend = true
      }
    },
    sendCode(e){  // 点击发送验证码
      this.disableSend = true
      this.send = true
      this.info = "重新发送"
      this.$refs.countDown.start()
      e.preventDefault();
    },
    finish(){
      this.send = false
      this.info = "发送验证码"
      this.$refs.countDown.reset()
      this.disableSend = false
    },
    reset(){
      this.isPassing = true,
      this.$refs.dragVerify.reset()
    },
    onSubmit(){
      if(this.signWay){
        if(this.validator && /\d{6}/.test(this.sms)){
          Toast.success("手机号和验证码都已填写,可以向服务器发送请求！")
          ajax("/api/sign",{"username":this.tel,"password":this.sms},"POST")
        }else{
          Toast.fail("手机号和验证码格式不正确")
          return false
        }
      }else{
        if(this.regEmail){
          Toast.success("邮箱和验证码都已填写,可以向服务器发送请求！")
        }else{

        }
      }
      
    },
    // 邮箱登录验证
    checkEmail(){
      this.email = this.email.replace(/(^\s*)|(\s*$)/g,'')
      if(this.email){
        if(this.regEmail && this.email.length){
          Toast("邮箱格式正确，是否可用需请求服务器")
        }else{
          Toast("邮箱格式不正确，请检查后继续")
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
        font-size: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "macfont";
        span{
          opacity: .64;
        }
        img{
          width: 64px;
        }
      }
      .signType{
        padding: 16px 8px;
        font-size: 16px;
        display: flex;
        justify-content: center;
        span:last-child{
          margin-left: 8px;
        }
      }
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
          bottom: 0;
        }
      }
      .forget{
        padding: 10px 18px;
        margin: 0;
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
      .van-button__text{
        display: flex;
        justify-content: space-around;
        align-items: center;
        .van-count-down{
          margin-left: 2px;
          color: #fff;
          &:before{
            content: ":";
          }
        }
      }
    }
  }
</style>