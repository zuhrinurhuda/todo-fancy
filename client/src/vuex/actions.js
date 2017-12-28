import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

const actions = {
  getUserProfile: ({ commit }) => {
    http.get('/users', {
      headers: { accesstoken: localStorage.getItem('accesstoken') }
    })
    .then(({ data }) => {
      commit('setUserProfile', data.userData)
    })
    .catch(err => console.log(err))
  }
}

export default actions
