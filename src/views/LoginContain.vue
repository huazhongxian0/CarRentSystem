<template>
<div class="bgcimg" :style="{height:this.height+'px'}">
 <div class="light" style="position: absolute; font-size: 35px; width: 20%; color: rgb(51, 0, 255)(216, 94, 94);">汽车租赁系统</div>
  <div class="admin"><el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
{{ admin }}
</div>
<button class="login" @click = "oncl">
<i class="
el-icon-arrow-left"></i>
    {{ login }}
</button>
<router-view></router-view>
</div>
    </template>
<script>

export default {
  name: 'LoginContain',
  props: {
    msg: String
  },
  data () {
    return {
      login: '注册',
      value: true,
      admin: '用户模式',
      height: {}
    }
  },
  watch: {
    'value' (newValue) {
      this.admin = this.admin === '用户模式' ? '管理模式' : '用户模式'

      if (newValue === true) {
        this.login = '注册'
        this.$store.commit('loginCondition', false)
      } else {
        this.login = '请登录'
        this.$store.commit('loginCondition', true)
        this.$router.push({
          path: '/LoginCa'
        }, () => {}, () => {})
      }
      console.log(this.$store.state.admin)
    }
  },
  methods: {
    oncl () {
      if (this.value === true) {
        if (this.login === '注册') {
          this.login = '登录'
          this.$router.push({
            path: '/RegisterCa'
          }, () => {}, () => {})
        } else {
          this.login = '注册'
          this.$router.push({
            path: '/LoginCa'
          }, () => {}, () => {})
        }
      } else {
        this.login = '请登录'
      }
    }
  },
  created () {
    this.height = window.innerHeight
    console.log(this.height)
    this.$store.commit('loginCondition', false)
    this.$store.commit('setHeight', this.height)
  }
}
</script>
    <style scoped>
    .light{
    font-size: 15px;
    width: 180px;
    height: 20px;
    color: #fefefe;
    text-shadow: 0 0 0.5em #0ae642, 0 0 0.2em #5c5c5c;
    position: relative;
}
    * {
                margin: 0;
                padding: 0;
            }
            .bgcimg{
                width: 100%;
                background-image: url('../assets/u=3446705521\,3340858807&fm=253&fmt=auto&app=138&f=PNG.webp');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                display: inline-block;

            }
            .admin{
      position:absolute;
      right:100px;
      color: yellow;
            }
.login{
    width: 100px;
    height: 50px;
    background-color: rgba(12, 22, 34,0.5);
    position: relative;
    color: #03e9f4;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .6);
}
.login:hover{
    box-shadow: 0 0px 0px 0 rgba(255, 255, 255, .6);
    position: relative;
}
            a {
                text-decoration: none;
            }

            input,
            button {
                background: transparent;
                border: 0;
                outline: none;
            }

            .loginBox {
                width: 400px;
                height: 364px;
                background-color: #0c1622;
                margin: 100px auto;
                border-radius: 10px;
                box-shadow: 0 15px 25px 0 rgba(0, 0, 0, .6);
                padding: 40px;
                box-sizing: border-box;
            }

            h2 {
                text-align: center;
                color: aliceblue;
                margin-bottom: 30px;
                font-family: 'Courier New', Courier, monospace;
            }

            .item {
                height: 45px;
                border-bottom: 1px solid #fff;
                margin-bottom: 40px;
                position: relative;
            }

            .item input {
                width: 100%;
                height: 100%;
                color: #fff;
                padding-top: 20px;
                box-sizing: border-box;
            }

            .item input:focus+label,
            .item input:valid+label {
                top: 0px;
                font-size: 12px;
            }

            .item label {
                position: absolute;
                left: 0;
                top: 12px;
                transition: all 0.2s linear;
            }

            .btn {
                padding: 10px 20px;
                margin-top: 30px;
                color: #03e9f4;
                position: relative;
                overflow: hidden;
                text-transform: uppercase;
                letter-spacing: 2px;
                left: 35%;
            }

            .btn:hover {
                border-radius: 5px;
                color: #fff;
                background: #03e9f4;
                box-shadow: 0 0 5px 0 #03e9f4,
                    0 0 25px 0 #03e9f4,
                    0 0 50px 0 #03e9f4,
                    0 0 100px 0 #03e9f4;
                transition: all 1s linear;
            }

            .btn>span {
                position: absolute;
            }

            .btn>span:nth-child(1) {
                width: 100%;
                height: 2px;
                background: -webkit-linear-gradient(left, transparent, #03e9f4);
                left: -100%;
                top: 0px;
                animation: line1 1s linear infinite;
            }

            @keyframes line1 {

                50%,
                100% {
                    left: 100%;
                }
            }

            .btn>span:nth-child(2) {
                width: 2px;
                height: 100%;
                background: -webkit-linear-gradient(top, transparent, #03e9f4);
                right: 0px;
                top: -100%;
                animation: line2 1s 0.25s linear infinite;
            }

            @keyframes line2 {

                50%,
                100% {
                    top: 100%;
                }
            }

            .btn>span:nth-child(3) {
                width: 100%;
                height: 2px;
                background: -webkit-linear-gradient(left, #03e9f4, transparent);
                left: 100%;
                bottom: 0px;
                animation: line3 1s 0.75s linear infinite;
            }

            @keyframes line3 {

                50%,
                100% {
                    left: -100%;
                }
            }

            .btn>span:nth-child(4) {
                width: 2px;
                height: 100%;
                background: -webkit-linear-gradient(top, transparent, #03e9f4);
                left: 0px;
                top: 100%;
                animation: line4 1s 1s linear infinite;
            }

            @keyframes line4 {

                50%,
                100% {
                    top: -100%;
                }
            }
        </style>
