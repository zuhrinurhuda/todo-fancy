Vue.component('todo-list', {
  props: ['task'],
  template: `<div class="row">
              <div class="one wide column none-shadow">
                <i class="green large checkmark box icon" v-if="task.complete" @click="complete"></i>
                <i class="abu-abu large square outline icon" v-else @click="getId"></i>
              </div>
              <div class="left aligned column none-shadow">
                <span class="ui medium header">{{task.task}}</span>
              </div>
              <div class="two wide column none-shadow" v-for="(tag, index) in task.tags" :key="index">
                <a class="ui small red horizontal label">{{tag}}</a>
              </div>
              <div class="two wide column none-shadow">
                <i class="grey large edit icon"></i>
                <i class="grey large trash outline icon"></i>
              </div>
            </div>`,
  data: function () {
    return {
      message: 'Hello Vue!',
      test: this.task,
      taskDetail: [],
    }
  },
  methods: {
    getId() {
      this.taskDetail = this.task
      // console.log(this.taskDetail._id);
      this.$emit('task-action', {
        id: this.taskDetail._id
      })
    }
  }
})
