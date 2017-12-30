<template>
  <main class="ui container">
    <div class="ui equal width celled stackable grid">
      <section class="sixteen wide column">
        <h2 class="ui header">Hi, Zuhri.</h2>
        <p>What is your main focus for today?</p>
      </section>
      <div class="row">
        <div class="column">
          <button class="ui labeled icon button">
            <i class="filter icon"></i>
            Filter
          </button>
        </div>
        <div class="ten wide column">
          <div class="ui category search">
            <div class="ui fluid icon input">
              <input class="prompt" type="text" placeholder="Search...">
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
        </div>
        <div class="left aligned column">
          <button class="ui right labeled icon button" @click="addTaskModal">
            <i class="right plus icon"></i>
            Add Task
          </button>
        </div>
      </div>
      <todo-list v-for="(task, index) in tasks" :key="index" :task="task"></todo-list>
    </div>
  </main>
</template>

<script>
  /* global $ */
  import { mapActions, mapGetters } from 'vuex'
  import TodoList from '@/components/TodoList'
  export default {
    name: 'TodoComponent',
    components: {
      TodoList
    },
    computed: {
      ...mapGetters(['tasks'])
    },
    methods: {
      ...mapActions(['getTasks']),
      addTaskModal: function () {
        $('.ui.small.modal').modal('show')
      }
    },
    created: function () {
      this.getTasks()
    }
  }
</script>

<style>

</style>
