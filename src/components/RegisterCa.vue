<template>
    <div>
    <div class="loginBox">
    <h2>注册</h2>

        <div class="item">
         <input type="text" v-model="username" required>
            <label for="">账号</label>
                </div>
                   <div class="item">
                    <input type="password" v-model="pwd" required>
                    <label for="">密码</label>
                     </div>
                     <div class="item">
                    <input type="password" v-model="repwd" required>
                    <label for="">确认密码</label>
                     </div>
                     <div class="item">
                    <input type="text" v-model="realname" required>
                    <label for="">您的真实姓名</label>
                     </div>
                     <div class="item">
                    <input type="text" v-model="idnumber" required>
                    <label for="">您的身份证号</label>
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
  name: 'RegisterCa',
  props: {
    msg: String
  },
  data () {
    return {
      username: '',
      pwd: '',
      repwd: '',
      realname: '',
      idnumber: ''
    }
  },
  methods: {
    submit () {
      if (this.username === '') {
        this.$message.error('请输入用户名')
        return
      }
      if (this.pwd === '') {
        this.$message.error('请输入密码')
        return
      }
      if (this.repwd === '') {
        this.$message.error('请输入确认密码')
        return
      }
      if (this.realname === '') {
        this.$message.error('请输入真实姓名')
        return
      }
      if (this.idnumber === '') {
        this.$message.error('请输入身份证号')
        return
      }

      if (this.pwd !== this.repwd) {
        this.$message.error('两次输入的密码不一样哦！')
        return
      }
      console.log(this.idnumber)
      axios({
        method: 'post',
        url: 'http://localhost:8080/user/register',
        data: {
          username: this.username,
          pwd: this.pwd,
          name: this.realname,
          idNumber: this.idnumber
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.data.msg === '注册成功') {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        } else {
          this.$message.error(res.data.msg)
        }
        console.log(res)
      }).catch(re => {
        console.log(re)
      })
      this.username = ''
      this.pwd = ''
      this.repwd = ''
      this.realname = ''
      this.idnumber = ''
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
                height: 514px;
                background-color: rgba(12, 22, 34,0.9);
                margin: 100px auto;
                border-radius: 10px;
                box-shadow: 0 15px 25px 0 rgba(0, 0, 0, .6);
                padding: 40px;
                box-sizing: border-box;
                position: relative;
                top: -50px;
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
                margin-bottom: 20px;
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
                color: white;
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
