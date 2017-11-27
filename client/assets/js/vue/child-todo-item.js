Vue.component('todo-item', {
  // props: ['todos'],
  template: `<div class="row">
              <div class="one wide column none-shadow">
                <i class="green large checkmark box icon"></i>
              </div>
              <div class="left aligned column none-shadow">
                <span class="ui medium header">{{todo.task}}</span>
              </div>
              <div class="two wide column none-shadow">
                <a class="ui small red horizontal label">HTML5</a>
              </div>
              <div class="two wide column none-shadow">
                <i class="grey large edit icon"></i>
                <i class="grey large trash outline icon"></i>
              </div>
            </div>`,
  data: function () {
    return {
      message: 'Hello Vue!',
    }
  },
})
