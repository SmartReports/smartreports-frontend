<template>
  <v-btn class="chat-btn d-none d-lg-block" icon="mdi-robot" size="x-large" @click="btnClick"></v-btn>
  <v-btn class="chat-btn d-none d-md-block d-lg-none" icon="mdi-robot" size="large" @click="btnClick"></v-btn>
  <v-btn class="chat-btn d-block d-md-none d-lg-none" icon="mdi-robot" @click="btnClick"></v-btn>
  <!-- open an iframe -->
  <iframe id="chatbot" class="chatbot" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</template>

<script lang="ts">
  export default {
      methods : {
          btnClick() {
              const chatbot = document.getElementById("chatbot");
              if (chatbot) {
                chatbot.style.display = "block";
                chatbot.setAttribute('src', "https://www.youtube.com/embed/dQw4w9WgXcQ?si=R6HpR5Bo7N2drZxI&autoplay=1")
              }
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

.chatbot {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 40em;
  aspect-ratio: 5/4;
  display: none;

}
</style>
