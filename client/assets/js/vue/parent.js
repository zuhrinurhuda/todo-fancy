new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    fbaccesstoken: localStorage.getItem('fbaccesstoken')
  },
  methods: {
    loginModal() {
      $('.ui.mini.modal').modal('show')
    },
    removeToken() {
      localStorage.removeItem('fbaccesstoken');
      location.reload();
    }
  }
})
