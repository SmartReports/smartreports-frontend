<template>
  <v-btn class="chat-btn d-none d-lg-block" icon="mdi-robot" size="x-large" @click="btnClick"></v-btn>
  <v-btn class="chat-btn d-none d-md-block d-lg-none" icon="mdi-robot" size="large" @click="btnClick"></v-btn>
  <v-btn class="chat-btn-mobile d-block d-md-none d-lg-none" icon="mdi-robot" @click="btnClick"></v-btn>
  <div :class="{'chatbot-container': !isMobile && !isSmall, 'chatbot-container-mobile': isMobile || isSmall}"
       id="chatbot-container">
    <v-icon
          class="chatbot-close"
          @click="closeChatbot"
          >
      mdi-close
    </v-icon>
    <ChatBot/>
<!--    <iframe id="chatbot-iframe" class="chatbot-iframe" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>-->
  </div>
</template>

<script lang="ts">
  import ChatBot from "@/components/ChatBot.vue";

  export default {
    components: {ChatBot},
      mounted() {
      },
    methods: {
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
    },
    computed: {
      isSmall() { return window.innerWidth < 600 },
      isMobile() { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); },
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
.chatbot-container-mobile {
  position: fixed;
  right: 30px;
  bottom: 55px;
  width: min(calc(100vw - 60px), 40em);
  aspect-ratio: 5/4;
  display: none;
}

.chatbot-close {
  position: absolute;
  top: 0.8em;
  right: 0.5em;
  width: 1em;
  height: 1em;
  z-index: 50;
  border: none;
}
</style>
