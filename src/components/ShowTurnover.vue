<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="line-height: 0; width: 100%;height: 100%;">
    <el-tab-pane label="折线图" name="0">
    <el-tabs :tab-position="'left'" style="width: 100%;
    height: 100%;"  v-model="activeName0" @tab-click="handleClick1">
    <el-tab-pane label="全部" name="0">
      <div id = "myChart0" style="width: 1000px; height: 500px;"></div>
    <div style="background-color: rgb(84, 112, 198); width: 100px; height: 10px; position: absolute; padding-top: 10px; top: 0;right: 0;" >总共</div>
    <div style="background-color: rgb(255, 220, 96); width: 100px; height: 20px; position: absolute; padding-top: 10px; top: 20px;right: 0;" >轿车</div>
    <div style="background-color: rgb(145, 204, 117); width: 100px; height: 20px; position: absolute; padding-top: 10px; top: 40px;right: 0;">货车</div>
    <div style="background-color: rgb(238, 102, 102); width: 100px; height: 20px; position: absolute; padding-top: 10px; top: 60px;right: 0;">客车</div></el-tab-pane>
    <el-tab-pane label="总和" name="1"><div id = "myChart1" style="width: 1000px; height: 500px;"></div></el-tab-pane>
    <el-tab-pane label="轿车" name="2">
      <div id = "myChart2" style="width: 1000px; height: 500px;"></div>
    </el-tab-pane>
    <el-tab-pane label="货车" name="3"><div id = "myChart3" style="width: 1000px; height: 500px;"></div></el-tab-pane>
    <el-tab-pane label="客车" name="4"><div id = "myChart4" style="width: 1000px; height: 500px;"></div></el-tab-pane>
  </el-tabs>
  </el-tab-pane>
  <el-tab-pane label="饼图" name="1">
    <el-tabs stretch="false" :tab-position="'left'" style="height: 9%;width: 100%;line-height: 0;" v-model="cycleactive" v-for="(item,index) in this.alldata" v-bind:key="index" @tab-click="handleClick2">
      <el-tab-pane :label="item.returnTime" :name="index.toString()" style="height: 100%;line-height: 0;">
  <div id="cycle0" style="position: absolute;display: inline-block;width: 100%; height: 100%;background-color: red;"></div>
  </el-tab-pane>
  </el-tabs>

  </el-tab-pane>
  </el-tabs>
</template>
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  mounted () {
    let that = this
    console.log('100');
    axios({
        method: 'post',
        url: 'http://localhost:8080/admin/selectTurnover',
        data: {
          selectWay:'month',
         type:'轿车'
        },
        headers: {
          token:this.$store.state.token
        }
      }).then(res => {
        console.log(10000);
        axios({
        method: 'post',
        url: 'http://localhost:8080/admin/selectTurnover',
        data: {
          selectWay:'month',
         type:'货车'
        },
        headers: {
          token:that.$store.state.token
        }
      }).then(re => {
        console.log(1000000);
        axios({
        method: 'post',
        url: 'http://localhost:8080/admin/selectTurnover',
        data: {
          selectWay:'month',
         type:'客车'
        },
        headers: {
          token:that.$store.state.token
        }
      }).then(r => {
        console.log(100000000);
        let t = 11
        this.alldata = r.data.data;
        console.log('asdasd',r.data.data);
for(let i = 0 ;i<12 ; i++)
{
  console.log(t);
that.x[t] = r.data.data[i].returnTime
that.ca[t] = res.data.data[i].rentMoney
that.truc[t] = re.data.data[i].rentMoney
that.bu[t] = r.data.data[i].rentMoney
that.datas[t] = that.ca[t]+that.truc[t]+that.bu[t]
t--
}
that.alll.push(that.datas)
that.alll.push(that.ca)
that.alll.push(that.truc)
that.alll.push(that.bu)

const myChart0 = echarts.init(document.getElementById('myChart0'))
    myChart0.setOption({
      xAxis: {
        type: 'category',
        data: this.x
      },
      yAxis: {
        type: 'value'
      },
      series: [

        {
          data: this.datas,
          type: 'line',
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: 15
            }
          }

        },
        // 货车
        {
          data: this.truc,
          type: 'line',
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: 15
            }
          }

        },
        // 轿车
        {
          data: this.ca,
          type: 'line',
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: 15
            }
          }
        },

        // 客车
        {
          data: this.bu,
          type: 'line',
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: 15
            }
          }
        }
      ]
    })
  }).catch(r => {
console.log(r);
      })

  }).catch(re => {
    console.error(re)
      })
  }).catch(res => {
        console.log(res)
      })

    // const myChart2 = echarts.init(document.getElementById('myChart2'))
    // myChart2.setOption({
    //   xAxis: {
    //     type: 'category',
    //     data: this.bx1
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       data: this.truc1,
    //       type: 'line',
    //       label: {
    //         show: true,
    //         position: 'top',
    //         textStyle: {
    //           fontSize: 15
    //         }
    //       }

    //     },

    //   ]
    // })
    // const myChart3 = echarts.init(document.getElementById('myChart3'))
    // myChart3.setOption({
    //   xAxis: {
    //     type: 'category',
    //     data: this.cx1
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       data: this.bu1,
    //       type: 'line',
    //       label: {
    //         show: true,
    //         position: 'top',
    //         textStyle: {
    //           fontSize: 15
    //         }
    //       }

    //     },

    //   ]
    // })
    // const myChart8 = echarts.init(document.getElementById('myChart8'))
    // myChart8.setOption({
    //   xAxis: {
    //     type: 'category',
    //     data: this.x
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       data: this.datas,
    //       type: 'line',
    //       label: {
    //         show: true,
    //         position: 'top',
    //         textStyle: {
    //           fontSize: 15
    //         }
    //       }

    //     },

    //   ]
    // })

  },
  watch:{
    'activeName'(newValue){
console.log(newValue);
if(newValue === '0'){
this.on('0')
}else if(newValue === '1'){
  this.on1('0')
}else if(newValue === '2'){
  this.on1('0')
}
},
    'activeName0'(newValue){
console.log(newValue);
this.on(newValue)
    },
    'activeName1'(newValue){
console.log(newValue);
this.on1(newValue)
    }
  },
  methods: {
    handleClick2(){

    },
    handleClick1(e,a,c) {
    console.log("收拾收拾",this.cycleactive);
},
    handleClick(e,a,c) {

    },
    handleOpen(){
    console.log("十万",index);
    },
    on(e){
      if(e === 0){
        const myChart0 = echarts.init(document.getElementById('myChart0'))
    myChart0.setOption({
      xAxis: {
        type: 'category',
        data: this.x
      },
      yAxis: {
        type: 'value'
      },
      series: [

        {
          data: this.datas,
          type: 'line',
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: 15
            }
          }

        },
        // 货车
        {
          data: this.truc,
          type: 'line'
        },
        // 轿车
        {
          data: this.ca,
          type: 'line'

        },

        // 客车
        {
          data: this.bu,
          type: 'line'

        }
      ]
    })
    return
      }
      console.log(e);
      console.log(this.alll[e-1]);
      const myChart = echarts.init(document.getElementById(`myChart${e}`))
      myChart.setOption({
      xAxis: {
        type: 'category',
        data: this.x
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.alll[e-1],
          type: 'line',
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: 15
            }
          }

        },

      ]
    })
    },
    on1(e){
      if(e === '0'){
        const myChart = echarts.init(document.getElementById(`myChar0`))
    myChart.setOption({
      series: [
    {
      type: 'pie',
      data: [
        {
          value: this.ca[0],
          name: '轿车'+this.ca[0]+'元'
        },
        {
          value: this.truc[0],
          name: '卡车'+this.truc[0]+'元'
        },
        {
          value: this.bu[0],
          name: '客车'+this.bu[0]+'元'
        }
      ]
    }
  ]
    })
    return
      }
      console.log(e);
      console.log(this.alll[e]);
    myChart.setOption({
      series: [
    {
      type: 'pie',
      data: [
        {
          value: this.ca[1],
          name: '轿车'+this.ca[1]+'元'
        },
        {
          value: this.truc[0],
          name: '卡车'+this.truc[1]+'元'
        },
        {
          value: this.bu[0],
          name: '客车'+this.bu[1]+'元'
        }
      ]
    }
  ]

    })

    }
  },
   created () {

  },
  data () {
    return {
      x: [],
      datas: [],
      datasx: [],
      truc: [],
      ca: [],
      bu: [],
      busx: [],
      month: [],
      activeName: '',
      activeName0: '0',
      activeName1: '',
      monthName:[],
      alll:[],
      alldata:[],
      index:[],
      cycleactive:'0',
    }
  }
}
</script>
<style scoped >
*{
  overflow-y:hidden
}
  .like {
    cursor: pointer;
    font-size: 25px;
    display: inline-block;
  }
  .el-tabs--card {
  height: calc(100vh - 110px);
  /* overflow-y: auto; */
}
.el-tab-pane {
  height: calc(100vh - 110px);
  overflow-y: auto;
}
  </style>
