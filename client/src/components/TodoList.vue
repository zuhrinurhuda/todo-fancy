<template>
  <div class="row">
    <div class="middle aligned center aligned one wide column ">
      <i class="grey square outline icon" @click="setComplete(task)" v-if="!task.complete"></i>
      <i class="green checkmark box icon" @click="setComplete(task)" v-else></i>
    </div>
    <div class="middle aligned column">
      <div class="ui accordion">
        <div class="title" @click="accordion">
          <i class="dropdown icon"></i>
          <span class="ui medium header" :class="{ complete: isComplete }">{{ task.task }}</span>
        </div>
        <div class="content">
          <p class="transition hidden" :class="{ complete: isComplete }">{{ task.description}}</p>
        </div>
      </div>
    </div>
    <div class="middle aligned four wide column">
      <a class="ui red label" v-for="(tag, index) in task.tags" :key="index">{{ tag }}</a>
    </div>
    <div class="middle aligned center aligned two wide column">
      <!-- <i class="grey edit icon"></i>
      <i class="grey folder open outline icon"></i> -->
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
  .ui.celled.grid>.row>.column {
    padding: 0.5em;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .ui.accordion .title:not(.ui) {
    padding: .2em 0;
  }

  .ui.accordion:not(.styled) 
  .accordion 
  .title~.content:not(.ui), 
  .ui.accordion:not(.styled) 
  .title~.content:not(.ui) {
    padding: .2em 0 .2em 1.7em;
  }

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
