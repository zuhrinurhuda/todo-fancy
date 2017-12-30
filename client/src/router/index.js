import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import IndexComponent from '@/components/IndexComponent'
import TodoComponent from '@/components/TodoComponent'

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
          component: IndexComponent
        },
        {
          path: '/tasks',
          name: 'MyTask',
          component: TodoComponent
        }
      ]
    }
  ]
})
