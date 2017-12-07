new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    fbaccesstoken: localStorage.getItem('fbaccesstoken'),
    datalogin: {
      username: '',
      password: ''
    },
    tasks: [],
  },
  methods: {
    loginModal() {
      $('.ui.mini.modal').modal('show')
    },
    login() {
      axios.post('http://localhost:3000/users/login', this.datalogin)
      .then(response => {
        console.log(response);
        localStorage.setItem('jwtaccesstoken', response.data.token)
        // location.reload()
      })
      .catch(err => console.log(err))
    },
    removeToken() {
      localStorage.removeItem('fbaccesstoken');
      location.reload();
    },
    completed(payload) {
      console.log(payload.id);
    }
  },
  created: function() {
    axios.get('http://localhost:3000/tasks/5a1a18541b2c980b06a5f65c')
    .then(response => {
      this.tasks = response.data
      console.log(this.tasks);
    })
    .catch(err => console.log(error))
  }
})
