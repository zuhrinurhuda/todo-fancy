<template>
  <div class="row">
    <div class="one wide column ">
      <i class="grey square outline icon" @click="setComplete(task)" v-if="!task.complete"></i>
      <i class="green checkmark box icon" @click="setComplete(task)" v-else></i>
    </div>
    <div class="column">
      <div class="ui accordion">
        <div class="title" @click="accordion">
          <i class="dropdown icon"></i>
          <span class="ui medium header" :class="{ complete: isComplete }">{{ task.task }}</span>
        </div>
        <div class="content">
          <p class="transition hidden">
            {{ task.description}}
          </p>
        </div>
      </div>
    </div>
    <div class="three wide column">
      <a class="ui red label" v-for="(tag, index) in task.tags" :key="index">{{ tag }}</a>
    </div>
    <div class="two wide column">
      <i class="grey edit icon"></i>
      <i class="grey folder open outline icon"></i>
      <i class="grey trash outline icon" @click="submitDeleteTask(task)"></i>
    </div>
  </div>
</template>

<script>
  /* global $ */
  import { mapActions } from 'vuex'
  export default {
    name: 'TodoList',
    props: ['task'],
    data: function () {
      return {
        isComplete: false
      }
    },
    // computed: {
    //   addCompleteClass: function () {
    //     return {
    //       complete: this.isComplete
    //     }
    //   }
    // },
    methods: {
      ...mapActions([
        'changeCompleteStatus',
        'deleteTask'
      ]),
      accordion: function () {
        $('.ui.accordion').accordion()
      },
      setComplete: function (task) {
        this.changeCompleteStatus(task)
      },
      checkCompleteStatus: function () {
        let checkStatus = this.task.complete
        // console.log('status: ', checkStatus)
        if (checkStatus) {
          this.isComplete = true
        } else {
          this.isComplete = false
        }
        // console.log('isComplete: ', this.isComplete)
      },
      submitDeleteTask: function (task) {
        this.deleteTask(task)
      }
    },
    created: function () {
      this.checkCompleteStatus()
    },
    updated: function () {
      this.checkCompleteStatus()
    }
  }
</script>

<style scoped>
  .ui.label {
    margin: 0 .14285714em .28em;
  }

  i.icon {
    font-size: 1.5em;
  }

  .complete {
    text-decoration: line-through;
  }
</style>
