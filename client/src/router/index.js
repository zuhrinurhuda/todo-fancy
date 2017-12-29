import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import MainComponent from '@/components/MainComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage,
      children: [
        {
          path: '',
          name: 'Home',
          component: MainComponent
        }
      ]
    }
  ]
})
