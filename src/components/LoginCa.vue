<template>
    <div>
    <div class="loginBox">
<h2>登录</h2>

        <div class="item">
         <input type="text" v-model="username" required>
            <label for="">用户名</label>
                </div>
                   <div class="item">
                    <input type="password" v-model="pwd" required>
                    <label for="">密码</label>
    </div>
    <button class="btn" @click="submit">提交
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
        </div>
    </div>
    </template>
<script>
import axios from 'axios'
export default {
  name: 'LoginCa',
  props: {
    msg: String
  },
  data () {
    return {
      pwd: '',
      username: ''
    }
  },
  methods: {
    submit () {
      if (this.$store.state.admin === true) {
        axios({
          method: 'post',
          url: 'http://localhost:8080/admin/login',
          data: {
            username: this.username,
            pwd: this.pwd
          }

        }).then(res => {
          if (res.data.data !== null) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$store.commit('setToken', res.data.data)
            this.$router.push('/AdminView')
          } else {
            this.$message.error(res.data.msg + '注意这是管理员模式。如果你是用户请切换到用户模式')
          }
        }).catch(re => {
          console.log(re)
        })
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:8080/user/login',
          data: {
            username: this.username,
            pwd: this.pwd
          }
        }).then(res => {
          if (res.data.data !== null) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$store.commit('setToken', res.data.data)
            this.$router.push('/HomeView')
          } else {
            this.$message.error(res.data.msg)
          }
          console.log(res)
        }).catch(re => {
          console.log(re)
        })
      }
    }
  }
}
</script>
    <style scoped>
    * {
                margin: 0;
                padding: 0;
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
                background-color: rgba(12, 22, 34,0.9);
                margin: 100px auto;
                border-radius: 10px;
                box-shadow: 0 15px 25px 0 rgba(0, 0, 0, 0.6);
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
                color: rgb(255, 255, 255);
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
				color:rgb(255, 255, 255)
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
