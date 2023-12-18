<template>
<div style="display: inline-block; height: 100%; width: 100%;">
  <el-table
    :data="tableData"
    height=" 100%"
    stripe="true"
    style="width: 100%; line-height:0;"
    show-header="false"
    >
    <el-table-column
      prop="type"
      label="车型"
      width="180"
   >
    </el-table-column>
    <el-table-column
      prop="brand"
      label="品牌"
      width="200">
    </el-table-column>
    <el-table-column
      prop="model"
      label="型号">
    </el-table-column>
    <el-table-column
      prop="beginTime"
      label="租用日期">
    </el-table-column>
    <el-table-column
      prop="deadline"
      label="计划归还日期">
    </el-table-column>
    <el-table-column
      prop="perRent"
      label="已付租金(元)">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="Return(scope)" type="text" size="small">还车</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ReturnCar',
  props: {

  },
  data () {
    return {
      userVehicle: [],
      tableData: []
    }
  },
  methods: {
    Return (e) {
      console.log(this.tableData[e.$index].vehicleId)
      axios({
        method: 'post',
        url: 'http://localhost:8080/user/returnVehicle',
        data: {
          vehicleId: this.tableData[e.$index].vehicleId
        },
        headers: {
          token: this.$store.state.token,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.data.msg === '还车成功！') {
          this.$message({
            type: 'success',
            message: response.data.msg
          })
          this.tableData.splice(e.$index, 1)
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
        } else {
          this.$message(response.data.msg)
        }
      })
    }
  },
  created () {
    axios({
      method: 'post',
      url: 'http://localhost:8080/user/rentingVehicle',
      headers: {
        token: this.$store.state.token
      },
      data: {
        pageSize: 5,
        pageNumber: 0
      }
    })
      .then(re => {
        axios({
          method: 'post',
          url: 'http://localhost:8080/user/rentingVehicle',
          headers: {
            token: this.$store.state.token
          },
          data: {
            pageSize: re.data.data.count,
            pageNumber: 0
          }
        })
          .then(res => {
            console.log(res)
            this.tableData = res.data.data.vehicleInfos
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
