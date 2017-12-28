<template>
  <div class="ui mini modal">
    <i class="close icon"></i>
    <div class="content">
      <button class="fluid ui facebook button">
        <i class="facebook icon"></i>
        Login With Facebook
      </button>
      <div class="ui horizontal divider">
        Or
      </div>
      <form class="ui form">
        <div class="field">
          <!-- <label>Username</label> -->
          <input type="text" name="first-name" placeholder="Username">
        </div>
        <div class="field">
          <!-- <label>Password</label> -->
          <input type="text" name="last-name" placeholder="Password">
        </div>
        <button class="fluid ui button" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
