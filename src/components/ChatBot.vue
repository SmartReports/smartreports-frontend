<template>
  <v-btn class="chat-btn d-none d-lg-block" icon="mdi-robot" size="x-large" @click="btnClick"></v-btn>
  <v-btn class="chat-btn d-none d-md-block d-lg-none" icon="mdi-robot" size="large" @click="btnClick"></v-btn>
  <v-btn class="chat-btn d-block d-md-none d-lg-none" icon="mdi-robot" @click="btnClick"></v-btn>
</template>

<script>
  export default {
      methods : {
          btnClick: function(event) {
              window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
          }
      }
  }
</script>

<style>
.chat-btn {
  position: fixed;
  right: 30px;
  bottom: 30px;
}
</style>
