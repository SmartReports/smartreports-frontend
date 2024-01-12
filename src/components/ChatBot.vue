<template>
  <v-btn class="chat-btn d-none d-lg-block" icon="mdi-robot" size="x-large" @click="btnClick"></v-btn>
  <v-btn class="chat-btn d-none d-md-block d-lg-none" icon="mdi-robot" size="large" @click="btnClick"></v-btn>
  <v-btn class="chat-btn-mobile d-block d-md-none d-lg-none" icon="mdi-robot" @click="btnClick"></v-btn>
  <div class="chatbot-container" id="chatbot-container">
    <v-btn
          text="Close"
          icon="mdi-close"
          color="error"
          class="chatbot-close"
          @click="closeChatbot"
          ></v-btn>
    <iframe id="chatbot-iframe" class="chatbot-iframe" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
</template>

<script lang="ts">
  export default {
      mounted() {
      },
      methods : {
          btnClick() {
              const chatbot = document.getElementById("chatbot-iframe");
              const chatbotContainer = document.getElementById("chatbot-container");
              if (chatbotContainer) {
                chatbotContainer.style.display = "block";
              }
              if (chatbot) {
                chatbot.setAttribute('src', "https://sa-prj2.vercel.app/")
              }
          },
          closeChatbot() {
              const chatbot = document.getElementById("chatbot-iframe");
              const chatbotContainer = document.getElementById("chatbot-container");
              if (chatbotContainer) {
                chatbotContainer.style.display = "none";
              }
              if (chatbot) {
                chatbot.setAttribute('src', "")
              }
          }
      }
  }
</script>

<style>
.chat-btn-mobile{
  position: fixed;
  right: 30px;
  bottom: 70px;
  background: rgb(var(--v-theme-secondary));
}

.chat-btn {
  position: fixed;
  right: 30px;
  bottom: 30px;
  background: rgb(var(--v-theme-secondary));
}

.chatbot-iframe {
  width: 100%;
  height: 100%;
}

.chatbot-container {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: min(calc(100vw - 60px), 40em);
  aspect-ratio: 5/4;
  display: none;
}

.chatbot-close {
  position: absolute;
  top: -1em;
  right: -1em;
  width: 1em;
  height: 1em;
}

</style>
