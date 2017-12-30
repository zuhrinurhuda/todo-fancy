const mutations = {
  setUserProfile: (state, payload) => {
    state.userProfile = payload
  },
  setTasks: (state, payload) => {
    state.tasks = payload
  },
  setNewTask: (state, payload) => {
    state.tasks.push(payload)
  },
  setCompleteStatus: (state, payload) => {
    let index = state.tasks.findIndex(element => {
      return element._id === payload._id
    })

    state.tasks.splice(index, 1, payload)
  },
  setDeletedTask: (state, payload) => {
    let index = state.tasks.findIndex(element => {
      return element._id === payload._id
    })

    state.tasks.splice(index, 1)
  }
}

export default mutations
