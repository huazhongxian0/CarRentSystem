<template>
  <div class="contain">
    <block v-if= "this.switch" >
    <div style="position: absolute; top:10%; font-weight: 550; display: flex; justify-content: center;  align-items: center; width: 100%;">您的账户余额还有 {{ this.$store.state.money }} 元</div>
    <el-input style="width: 30%; position:absolute;top: 25%;left:20%;line-height: 0;" v-model="input" placeholder="请输入您想充值的金额(元)"></el-input>
    <el-select v-model="value" style="width: 20%;top: 25%;right: 20%;display: inline-block;position:absolute;top: 25%; line-height: 0;" placeholder="请选择支付方式">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-button type="primary" @click="on" style="position: absolute; right:20%; top: 65%; background-color: rgb(255, 255, 255); color: rgb(245, 10, 10);">确定</el-button>
</block>
<block v-else>
<h2 style="position: absolute; width: 100%; margin-top: 10%;">确认订单</h2>
<div style="position: absolute; width: 100%; top: 30%;left: -25%;">充值方式 :<span style="color: red;">  <block v-show="this.value === 0 ">微信支付</block><block v-show="this.value === 1 ">支付宝支付</block></span></div>
<div style="position: absolute; width: 100%; top: 40%;left: -27%;">充值金额 :<span style="color: red;">{{input}}元</span></div>
<div style="position: absolute; top: 22%;right: 15%;" >
  <block v-show="this.value === 0 "><img src="../assets/Snipaste_2023-11-18_23-21-19.png" alt=""></block>
<block v-show="this.value === 1 "> <img  style="width: 80%; height: 80%;" src="../assets/Snipaste_2023-11-18_23-21-30.png" alt=""></block>
</div>
<div style="position: absolute; width: 100%; bottom: 30%;left: 0%;">注意:
  <block v-show="this.value === 0 ">请打开微信“扫一扫”进行支付</block>
<block v-show="this.value === 1 ">请打开支付宝“扫一扫”进行支付</block>
</div>
</block>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    sub () {
      console.log(1)
      axios({
        method: 'post',
        url: 'http://localhost:8080/user/charge',
        headers: {
          token: this.$store.state.token
        },
        data: {
          chargeMoney: this.input
        }
      })
        .then(re => {
          console.log(re)
          this.$message(re.data.msg)
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
              this.$store.commit('setMoney', re.data.data.remindMoney)
            })
            .catch(err => {
              console.error(err)
            })
        })
    },
    on () {
      if (this.input === '') {
        this.$message('请输入充值金额')
      } else if (this.value === '') {
        this.$message('请选择充值方式')
      } else {
        this.switch = false
      }
    }
  },
  data () {
    return {
      options: [{
        value: 0,
        label: '微信支付'
      }, {
        value: 1,
        label: '支付宝支付'
      }],
      value: '',
      input: '',
      switch: true,
      credit: ''
    }
  },
  created () {
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
        this.$store.commit('setMoney', re.data.data.remindMoney)
      })
      .catch(err => {
        console.error(err)
      })
  },
  mounted () {
    const that = this
    document.addEventListener('keyup', function (e) {
      if (e.keyCode === 68) {
        that.sub()
      }
    })
  }
}
</script>
<style scoped>
.contain{
  width: 60%;
  height: 80%;
  margin-top: 5%;
  display: inline-block;
  background-color: rgb(179, 192, 209);
  box-shadow: 0px 5px 20px 5px rgb(179, 192, 209);
  position: relative;
  line-height: 0;
  }
</style>
