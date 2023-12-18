<template>
  <div>
  <div class="contain" style="height:80%;">
      <el-container>
<el-header height="100px" style="text-align: center;">
<img src="../assets/Snipaste_2023-11-14_23-48-19.png" alt="" class="line">
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

      <el-menu-item index="/AdminMainPage">
        <i class="el-icon-s-home"></i>
        <span slot="title">主页面</span>
      </el-menu-item>
      <el-menu-item index="/AddCar">
        <i class="el-icon-circle-plus"></i>
        <span slot="title">添加车辆</span>
      </el-menu-item>
      <el-menu-item index="/ShowTurnover">
        <i class="el-icon-s-order"></i>
        <span slot="title">营业额</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
<div class="light">汽车租赁管理系统</div>
    </el-aside>

    <el-main  :style="{height:this.height-100+'px'}">
    <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
  <div class="contian0"> </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      height: ''
    }
  },
  methods: {
    loseLogin () {
      this.$router.push({
        path: '/LoginContain'
      }, () => {}, () => {})
    }
  },
  created () {
    this.height = window.innerHeight
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
*{
  margin:  0;
  padding: 0;
}
.loseLogin{
  border-radius: 20px;
  position: relative;
  left: 35%;
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

.input{
  width: 35%;
  height: 50%;
  position: relative;
  left: 300px;
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
