import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    height: 0,
    vehicle: [],
    userVehicle: [{
      vehicleId: 101,
      vehicleType: '轿车',
      vehicleBrand: '凯迪拉克',
      vehicleModel: 'CT5',
      vehicleDate: '2023-7-1'
    }],
    admin: false,
    token: '',
    money: ''
  },
  getters: {
  },
  mutations: {
    loginCondition (state, a) {
      this.state.admin = a
    },
    setHeight (state, a) {
      this.state.height = a
    },
    setToken (state, a) {
      this.state.token = a
    },
    setMoney (state, a) {
      this.state.money = a
    }
  },
  actions: {
  },
  modules: {
  }
})
