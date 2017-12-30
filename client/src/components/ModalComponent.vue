<template>
  <div class="ui small modal">
    <i class="close icon"></i>
    <div class="header">
      Profile Picture
    </div>
    <div class="content">
      <div class="ui form">
        <div class="two fields">
          <div class="field">
            <label>Task</label>
            <input type="text" placeholder="task name" v-model="newTask.name">
          </div>
          <div class="field">
            <label>Tags</label>
            <input type="text" placeholder="tags" v-model="newTask.tags">
          </div>
        </div>
        <div class="field">
          <label>Description</label>
          <textarea rows="2" v-model="newTask.description"></textarea>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui black deny button">
        Cancel
      </div>
      <div class="ui positive button" @click="submitTask(newTask)">
        Submit
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'ModalComponent',
    data: function () {
      return {
        newTask: {
          name: null,
          tags: null,
          description: null
        }
      }
    },
    methods: {
      ...mapActions(['addNewTask']),
      submitTask: function (newTask) {
        this.addNewTask(newTask)
      }
    }
  }
</script>

<style>

</style>
