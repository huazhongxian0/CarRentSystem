<template>
  <div class="Input">
    <div style="display: inline-block;  ">
<div style="display: inline-block; margin-right: 0px;">车辆类型</div>
<el-select v-model="value" placeholder="请选择" style="width: 200px;display: inline-block;">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
</div>

<div style="">
  <div style="display: inline-block;margin-right: 10px;">车辆品牌</div>
<el-input
  placeholder="请输入内容"
  v-model="Brandinput"
  clearable
  style="width: 200px;display: inline-block;"
  >
</el-input>

</div>

<div style="">
  <div style="display: inline-block;margin-right: 10px;">汽车型号</div>
<el-input
  placeholder="请输入内容"
  v-model="Modelinput"
  clearable
  style="width: 200px;display: inline-block;"
  >
</el-input>
</div>
<div style="">
  <div style="display: inline-block;margin-right: 10px;">汽车租金</div>
<el-input
  placeholder="请输入内容"
  v-model="PerSentinput"
  clearable
  style="width: 200px;display: inline-block;"
  >
</el-input>
</div>
<div style="">
  <div style="display: inline-block;margin-right: 10px;">车牌号码</div>
<el-input
  placeholder="请输入内容"
  v-model="LicenseInput"
  clearable
  style="width: 200px;display: inline-block;"
  >
</el-input>
</div>
<div style="" v-if=" value === '客车' ">
  <div style="display: inline-block;margin-right: 10px;">座位数量</div>
<el-input
  placeholder="请输入内容"
  v-model="PeopleNumeber"
  clearable
  style="width: 200px;display: inline-block;"
  >
</el-input>

</div>
<div style="" v-if=" value === '货车' ">
  <div style="display: inline-block;margin-right: 10px;">载货吨位</div>
<el-input
  placeholder="请输入内容"
  v-model="CargoTonnage"
  clearable
  style="width: 200px;display: inline-block;"
  >
</el-input>

</div>
<el-button type="primary" style="display: inline-block; height: 40px;width: 10%; position: absolute; right: 45%; bottom:30%;" plain @click="submit">提交增加</el-button>
</div>
</template>
<script>
import axios from 'axios'
export default {
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    changeSize (e) {
      console.log(e)
    },
    submit () {
      console.log(this.value)
      axios({
        method: 'post',
        url: 'http://localhost:8080/admin/addVehicle',
        headers: {
          token: this.$store.state.token
        },
        data: {
          vehicleType: this.value,
          vehicleBrand: this.Brandinput + '(' + this.CargoTonnage + this.PeopleNumeber,
          vehicleModel: this.Modelinput,
          perRent: this.PerSentinput,
          vehicleLicense: this.LicenseInput
        }
      }).then(res => {
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        if (res.data.msg === '添加成功!') {
          this.Brandinput = ''
          this.Modelinput = ''
          this.PerSentinput = ''
          this.LicenseInput = ''
        }
        console.log('张德明第二个想看的', res)
      }).catch(err => {
        console.error(err)
        this.$throw()
      })
    }
  },
  data () {
    return {
      options: [{
        value: '轿车',
        label: '轿车'
      }, {
        value: '货车',
        label: '货车'
      }, {
        value: '客车',
        label: '客车'
      }],
      value: '',
      // 车辆类型
      Type: '',
      // 车辆品牌
      Brandinput: '',
      // 车辆型号
      Modelinput: '',
      // 租金
      PerSentinput: '',
      // 车牌号
      LicenseInput: '',
      // 载客数
      PeopleNumeber: '',
      // 载货吨位
      CargoTonnage: ''
    }
  }
}
</script>
<style>
.Input{
width: 70%;
height: 70%;
background-color: rgb(227, 209, 209);
box-shadow: 0px 0px 10px 0px rgb(146, 139, 139);
line-height: 0;
position: relative;
top: 15%;
left: 16%;
flex-wrap: wrap;
justify-content:space-evenly;

}
.Input div{
  display: inline-block;
  margin: 10px;
  }

</style>
