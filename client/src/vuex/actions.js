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
  },
  getTasks: ({ commit }) => {
    http.get('/tasks', {
      headers: { accesstoken: localStorage.getItem('accesstoken') }
    })
    .then(({ data }) => {
      commit('setTasks', data.userTasks)
    })
    .catch(err => console.log(err))
  },
  addNewTask: ({ commit }, payload) => {
    http.post('/tasks', payload, {
      headers: { accesstoken: localStorage.getItem('accesstoken') }
    })
    .then(({ data }) => {
      commit('setNewTask', data.task)
    })
    .catch(err => console.log(err))
  },
  changeCompleteStatus: ({ commit }, payload) => {
    http.put(`/tasks/${payload._id}/changestatus`, payload, {
      headers: {
        accesstoken: localStorage.getItem('accesstoken'),
        user: payload.user
      }
    })
    .then(({ data }) => {
      commit('setCompleteStatus', data.task)
    })
    .catch(err => console.log(err))
  },
  deleteTask: ({ commit }, payload) => {
    http.delete(`/tasks/${payload._id}`, {
      headers: {
        accesstoken: localStorage.getItem('accesstoken'),
        user: payload.user
      }
    })
    .then(({ data }) => {
      commit('setDeletedTask', data.deletedTask)
    })
    .catch(err => console.log(err))
  }
}

export default actions
