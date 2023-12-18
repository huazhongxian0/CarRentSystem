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
          移除
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
    deleteRow (index, rows) {
      index = (this.pageNumber - 1) * 9 + index
      if (this.tableData123[index].condition === '已租') {
        this.$message('此车已经租出去了，不可下架哦')
      } else {
        // this.tableData123[index].vehicleId
        console.log(this.tableData123[index].vehicleId)
        axios({
          url: 'http://localhost:8080/admin/deleteVehicle',
          method: 'post',
          data: {
            vehicleId: this.tableData123[index].vehicleId
          },
          headers: {
            token: this.$store.state.token
          }
        }).then(re => {
          this.$message({ message: re.data.msg, type: 'success' })
          this.tableData123.splice(index, 1)
          this.pageC(Math.floor(index / 9) + 1)
        }).catch(re => {
          console.log(re)
        })
      }
    },
    changeSize (e) {

    },
    pageC (e) {
      console.log('=========================')
      console.log('正确的pageC')
      console.log(this.tableData123)
      console.log(e)
      this.pageNumber = e
      this.current = this.tableData123.slice((e - 1) * 9, e * 9)
      console.log(this.current)
      console.log('=========================')
    },
    addCondition () {
      console.log('正确的addCondition')
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
      url: 'http://localhost:8080/admin/selectVehicle',
      headers: {
        token: this.$store.state.token
      },
      data: {

        pageNumber: 0,
        pageSize: 1000
      }
    })
      .then(res => {
        console.log('res', res)
        axios({
          method: 'post',
          url: 'http://localhost:8080/admin/selectVehicle',
          headers: {
            token: this.$store.state.token
          },
          data: {
            pageNumber: 0,
            pageSize: res.data.data.count
          }
        })
          .then(re => {
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
