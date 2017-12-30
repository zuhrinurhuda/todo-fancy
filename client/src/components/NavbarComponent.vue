<template>
  <header class="ui attached stackable menu">
    <nav class="ui container">
      <a href="" class="item"><i class="dashboard icon"></i>Dashboard</a>
      <a href="" class="item"><i class="tasks icon"></i>My Tasks</a>
      <a href="" class="item"><i class="archive icon"></i>Archive</a>
      <div class="right item">
          <a class="ui facebook button" @click="login" v-if="!isLogin">
            <i class="facebook icon"></i>
            Log in with Facebook
          </a>
          <a class="ui top right pointing dropdown" v-else>
            <img class="ui avatar image" :src="userProfile.picture">
            {{ userProfile.name }}
            <i class="dropdown icon"></i>
            <a class="menu">
              <a class="item"><i class="edit icon"></i> Edit Profile</a>
              <a class="item" @click="logout"><i class="sign out icon"></i> Log out</a>
            </a>
          </a>
      </div>
    </nav>
  </header>
</template>

<script>
  /* global $ */
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'NavbarComponent',
    data: function () {
      return {
        isLogin: false
      }
    },
    computed: {
      ...mapGetters(['userProfile'])
    },
    methods: {
      ...mapActions(['getUserProfile']),
      login: function () {
        window.FB.login(response => {
          if (response.status === 'connected') {
            console.log('Success login ', response)
            this.$http.post('/users/login', {}, {
              headers: { accesstoken: response.authResponse.accessToken }
            })
            .then(({ data }) => {
              localStorage.setItem('accesstoken', data.accesstoken)
              this.isLogin = true
              this.getUserProfile()
            })
            .catch(err => console.log(err))
          } else {
            console.log('Login failed')
          }
        }, {scope: 'public_profile, email'})
      },
      checkLoginStatus: function () {
        let checkToken = localStorage.getItem('accesstoken')
        if (checkToken) {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
      },
      logout: function () {
        localStorage.removeItem('accesstoken')
        this.isLogin = false
      }
    },
    created: function () {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '2060415780639578',
          cookie: true,
          xfbml: true,
          version: 'v2.11'
        })
      };
      (function (d, s, id) {
        let js
        let fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) { return }
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))

      this.checkLoginStatus()
      if (localStorage.getItem('accesstoken')) this.getUserProfile()
    },
    updated: function () {
      $(document).ready(function () {
        $('.ui.top.right.pointing.dropdown').dropdown({
          on: 'hover'
        })
      })
    }
  }
</script>

<style>

</style>
