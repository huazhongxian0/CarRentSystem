<template>
    <div class="contain" style="height:100%;">
      <el-container>
<el-header height="100px" style="text-align: center;">
<img src="../assets/Snipaste_2023-11-14_23-48-19.png" alt="" class="line">
<div class="credit">您的账户余额还有 <span style="padding: 10px; font-weight: 600;"> {{ this.$store.state.money }}</span>元</div>
  <el-input v-model="input" placeholder="请输入内容" class="input" prefix-icon="el-icon-search" @keyup.enter.native="on"></el-input>
<button class="loseLogin" @click="loseLogin">退出登录</button>
  </el-header>
  <el-container>
    <el-aside width="180px" style="overflow-x: hidden;">
      <el-row class="tac">
      <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router="true"
      style="width: 180px; align-items: center;"
      >

      <el-menu-item index="/MainPage">
        <i class="el-icon-s-home"></i>
        <span slot="title">租赁面板</span>
      </el-menu-item>
      <el-menu-item index="/Lookfor">
        <i class="el-icon-s-help"></i>
        <span slot="title">充值</span>
      </el-menu-item>
      <el-menu-item index="/ReturnCar">
        <i class="el-icon-document"></i>
        <span slot="title">我的订单</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
<div class="light">汽车租赁系统</div>
    </el-aside>
    <el-main  :style="{height:this.height-100+'px'}">
    <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
<div class="contain2"></div>
</div>

</template>
<script>
import axios from 'axios'
export default {
  name: 'HomeView',
  components: {
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      height: 0,
      input: '',
      credit: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    on () {
      axios({
        method: 'post',
        url: 'http://localhost:8080/user/selectVehicle',
        data: {
          pageNumber: 0,
          pageSize: 10
        },
        headers: {
          token: this.$store.state.token,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        axios({
          method: 'post',
          url: 'http://localhost:8080/user/selectVehicle',
          data: {
            pageNumber: 0,
            pageSize: response.data.data.count,
            vehicleType: this.input,
            vehicleBrand: this.input,
            vehicleModel: this.input
          },
          headers: {
            token: this.$store.state.token,
            'Content-Type': 'application/json'
          }
        }).then(re => {
          console.log(re)
        })
      })
    },
    loseLogin () {
      this.$store.commit('setToken', null)
      console.log('退出登录以后的token:', this.$store.token)
      this.$router.push({
        path: '/LoginContain'
      }, () => {}, () => {})
    }
  },
  created () {
    this.height = window.innerHeight
    this.$store.commit('loginCondition', false)
    axios({
      method: 'post',
      url: 'http://localhost:8080/user/getInfo',
      headers: {
        token: this.$store.state.token
      },
      data: {
      }
    })
      .then(re => {
        this.credit = re.data.data.remindMoney
        this.$store.commit('setMoney', re.data.data.remindMoney)
      })
      .catch(err => {
        console.error(err)
      })
  }
}

</script>

<style scoped>
*{
  margin:  0;
  padding: 0;
}
.credit{
width: 20%;
height: 100%;
display:flex;
align-items: center;
justify-content: center;
color: black;
font-size: large;
}
.light{
    font-size: 15px;
    width: 180px;
    height: 20px;
    color: #fefefe;
    text-shadow: 0 0 0.5em #0ae642, 0 0 0.2em #5c5c5c;
    position: relative;

}
.loseLogin{
  border-radius: 20px;
  position: relative;
  left: 15%;
  height: 50%;
  width: 15%;
  top: 20px;
  background-color: white;
  box-shadow: 8px 8px 30px rgba(0, 0, 0,0.2),
  -8px -8px 30px rgb(179, 192, 209);
  border: white;
}
.loseLogin:hover{
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
  0 0 0 rgba(255, 255, 255, 0.8),
  inset 8px 8px 20px rgba(0, 0, 0,0.3),
  inset -8px -8px 20px white;
}
.loginContain{
  position: relative;
 display: flex;
  width: 10%;
  height: 100%;
  left: 35%;
}

.input{
  width: 35%;
  height: 50%;
  position: relative;
  left: 5%;
  top: 15px;

}
.line{
  width: 180px;
  height: auto;
  background-color: red;
}
.contain{
  display:flex;
align-items: center;
margin: 0;
  padding: 0;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  margin: 0;
  padding: 0;
  display: flex;
}
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
  overflow-y: scroll;
  margin: 0;
  padding: 0;

}

body > .el-container {
  margin: 0;
  padding: 0;
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  margin: 0;
  padding: 0;
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  margin: 0;
  padding: 0;
  line-height: 320px;
}
</style>
