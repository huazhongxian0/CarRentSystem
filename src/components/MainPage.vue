<template>
  <div style="height:100%; overflow: hidden;">
  <el-table
    :data="current"
    style="width: 100%; line-height:0; height:90%;"
    height="90%"
    >
    <el-table-column
      fixed
      prop="type"
      label="汽车类型"
      width="150">
    </el-table-column>
    <el-table-column
      prop="brand"
      label="汽车品牌"
      width="150">
    </el-table-column>
    <el-table-column
      prop="model"
      label="汽车型号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="perRent"
      label="日租金"
      width="120">
    </el-table-column>
    <el-table-column
      prop="vehicleLicense"
      label="车牌号"
      width="250">
    </el-table-column>
    <el-table-column
      prop="condition"
      label="状态"
      width="150">
    </el-table-column>
    <el-table-column
    fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button
          @click="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          租用
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="height: 20%;  background-color: rgb(179, 192, 209);">
      <el-pagination
background
layout="prev, pager, next"
page-size="9"
@current-change="pageChange"
:total=this.tableData123.length size-change="changeSize" next-click="changeSize">
</el-pagination>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  methods: {
    pageChange (e) {
      console.log('正确的pageChange')
      this.pageC(e)
    },
    // index = (this.pageNumber - 1) * 9 + index
    // this.tableData123[index].vehicleId

    deleteRow (index, rows) {
      index = (this.pageNumber - 1) * 9 + index
      if (this.tableData123[index].condition === '未租') {
        this.$prompt('请输入租用天数', '日期', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          axios({
            method: 'post',
            url: 'http://localhost:8080/user/rentVehicle',
            headers: {
              token: this.$store.state.token
            },
            data: {
              vehicleId: this.tableData123[index].vehicleId,
              days: value
            }
          })
            .then(re => {
              console.log(re.data.msg)
              if (re.data.msg === '租车成功') {
                this.$alert('本次花费了' + re.data.data + '元,已从账户扣除', re.data.msg, {
                  confirmButtonText: '确定',
                  callback: action => {

                  }
                })
                this.tableData123[index].condition = '已租'
              } else {
                this.$alert(re.data.data, re.data.msg, {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `action: ${action}`
                    })
                  }
                })
              }
            })
            .catch(err => {
              console.error(err)
            })
        }).catch(err => {
          console.error(err)
        })
      } else {
        this.$message({
          type: 'error',
          message: '这个车已经被租了哦'
        })
      }
    },
    changeSize (e) {

    },
    pageC (e) {
      console.log('正确的pageC')
      console.log(this.tableData123)
      console.log(e)
      this.pageNumber = e
      this.current = this.tableData123.slice((e - 1) * 9, e * 9)
      console.log(this.current)
    },
    addCondition () {
      console.log(this.tableData123)
      for (let i = 0; i < this.tableData123.length; i++) {
        if (this.tableData123[i].userId === null && this.tableData123[i].beginTime === null && this.tableData123[i].deadline === null) {
          this.tableData123[i].condition = '未租'
        } else {
          this.tableData123[i].condition = '已租'
        }
        if (this.tableData123[i].type === '货车') {
          this.tableData123[i].brand += '吨)'
        } else if (this.tableData123[i].type === '客车') {
          this.tableData123[i].brand += '座)'
        }
      }
    }
  },
  data () {
    return {
      tableData: [],
      tableData123: [],
      current: '',
      pageNumber: ''
    }
  },
  created () {
    this.token = this.$store.state.token
    console.log(this.token)
    axios({
      method: 'post',
      url: 'http://localhost:8080/user/selectVehicle',
      headers: {
        token: this.$store.state.token
      },
      data: {
        pageNumber: 0,
        pageSize: 10
      }
    })
      .then(res => {
        axios({
          method: 'post',
          url: 'http://localhost:8080/user/selectVehicle',
          headers: {
            token: this.$store.state.token
          },
          data: {
            pageNumber: 0,
            pageSize: res.data.data.count
          }
        })
          .then(re => {
            console.log(re)
            this.tableData123 = re.data.data.vehicleInfos
            this.addCondition()
            this.pageC(1)
          })
          .catch(err => {
            console.error(err)
          })
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>
<style>

</style>
