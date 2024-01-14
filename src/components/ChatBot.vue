<template>
    <vue-advanced-chat
      ref="chatWindow"
      :styles="JSON.stringify(styles)"
      :theme="theme"
      :current-user-id="currentUserId"
      :rooms="JSON.stringify(storage.rooms)"
      :loading-rooms="loadingRooms"
      :rooms-loaded="roomsLoaded"
      :messages="JSON.stringify(currentMessages)"
      :messages-loaded="messagesLoaded"
      :room-message="roomMessage"
      :room-actions="JSON.stringify(roomActions)"
      :menu-actions="JSON.stringify(menuActions)"
      :message-selection-actions="JSON.stringify(messageSelectionActions)"
      :text-messages="JSON.stringify(textMessages)"
      :show-audio="false"
      :show-emojis="false"
      :show-files="false"
      :show-search="false"
      :auto-scroll="JSON.stringify(autoScroll)"
      @fetch-messages="fetchMessages($event.detail[0])"
      @send-message="sendMessage($event.detail[0])"
      @add-room="addRoom()"
      @room-action-handler="menuActionHandler($event.detail[0])"
    >
      <div :slot="'message_' + typingIndicator">
          <div class="px-10">
            <div class="dot-elastic"/>
          </div>

      </div>
      <div slot="add-icon">
        <v-btn text="New Chat"
               color="primary"
               class="rounded-lg"/>
      </div>
      <div slot="room-header-info">
        <div style="max-width: 70%; position: absolute; bottom: 0; left: 50px; margin: auto" :class="{'no-mobile': !isMobile && !isSmall}">
          <v-card-title
            class="custom-title"
            v-if="dont_touch_this"
            ref="cardTitle"
            :contenteditable="editingRoomName"
            @click="editingRoomName=true"
            v-on:keydown.enter.prevent="onUpdateRoomName($event)"
            @focusout="onEditingFocusout">
            {{selectedRoomName}}
          </v-card-title>
        </div>
      </div>
    </vue-advanced-chat>
</template>


<script lang="ts">
import {register, Room} from "vue-advanced-chat";
import {useMainStore} from "@/store/app";
import {mapStores} from "pinia";
import {Account} from "@/models";
import axios from "axios";

const axiosBot = axios.create();
axiosBot.defaults.baseURL = "https://datax_chatbot.ianniciello.me/"

register()


export default {
  mounted() {
    const style = document.createElement('style');
    style.innerHTML = ''
    style.innerHTML += '.vac-rooms-container {min-width: 200px !important; max-width:1000px !important; }\n';
    style.innerHTML += '.vac-menu-options {min-width: 100px !important;}\n';
    style.innerHTML += '.vac-add-icon {margin-right: auto !important; margin-left: 0px !important;}\n';
    style.innerHTML += '.vac-format-message-wrapper {padding-bottom: 4px !important; padding-top: 2px !important;}\n';
    style.innerHTML += '.vac-message-box {max-width: 80% !important;}\n';
    style.innerHTML += '.vac-offset-current {margin-left: 20% !important;}\n';

    (this.$refs.chatWindow as any).shadowRoot.appendChild(style);
  },
  async created() {
      this.userMe.avatar = this.currentAccount.image;

      const simoRoom = (await axiosBot.get(`/chat?user_type=${this.mainStore.currentAccount.name}`)).data;
      console.log(simoRoom);

      if(simoRoom.length != 0) {
        for(let i=0; i < simoRoom.length; i++) {

          const lastMessage = (await axiosBot.get(`/chat/${simoRoom[i].id}?lastmessage`)).data;
          const lastUser = lastMessage[1] === 'USER' ? this.userMe : this.userBot;

          this.lastRoomId++;
          this.lastMessageId++;
          this.storage.rooms.push(
            {
              roomId: this.lastRoomId.toString(),
              roomName: simoRoom[i].name,
              users: [this.userMe, this.userBot],
              lastMessage: {
                _id: this.lastMessageId,
                content: lastMessage[0],
                senderId: lastUser._id,
                avatar: lastUser.avatar,
                seen: lastUser === this.userBot,
                disableActions: true,
                disableReactions: true,
              }
            });
          this.mapRoomIdToSimoID[this.lastRoomId] = simoRoom[i].id;
        }
      } else {
        this.storage.rooms = [
          {
            roomId: '0',
            roomName: 'New Chat',
            users: [this.userMe, this.userBot],
          },
        ]
        this.lastRoomId = 0;
      }

      this.roomsLoaded = true;
      this.loadingRooms = false;
  },
  data(){
    return {
      userMe: {
        _id: '0',
        username: 'Me',
        avatar: ''
      },
      userBot: {
        _id: '1',
        username: 'Bot',
        avatar: 'https://i.ibb.co/CWQHD6m/robot.png',
      },
      dont_touch_this: true,
      typingIndicator: '0',
      storage: {rooms: [], messages: {}} as any,
      currentMessages: [] as any,
      styles: { container: { borderRadius: '10px' } },
      currentUserId: '0',
      lastRoomId: -1,
      lastMessageId: 0,
      mapRoomIdToSimoID: {} as any,
      roomsLoaded: false,
      loadingRooms: true,
      loadingBotAnswer: false,
      selectedRoomId: '0',
      selectedRoomName: '',
      messagesPerPage: 20,
      messages: [] as any,
      messagesLoaded: false,
      editingRoomName: false,
      roomMessage: '',
      roomActions: [
        { name: 'deleteRoom', title: 'Delete' }
      ],
      menuActions: [],
      autoScroll: { send: { new: true, newAfterScrollUp: true }, receive: { new: true, newAfterScrollUp: true } },
      messageSelectionActions: [],
      textMessages: {
        MESSAGES_EMPTY: 'To get started, ask something to the chatbot',
        TYPE_MESSAGE: 'Write here your question',
        SEARCH: 'Rechercher',
      },
    }
  },
  methods: {
    async fetchMessages({ room, options = {} }: any){

      this.messagesLoaded = false;
      this.currentMessages = [];
      this.selectedRoomId = room.roomId;
      this.selectedRoomName = room.roomName;

      setTimeout(async () => {
        if(this.mapRoomIdToSimoID[room.roomId] != undefined && this.storage.messages[room.roomId] == undefined) {
          this.storage.messages[room.roomId] = [];

          let messages = (await axiosBot.get(`/chat/${this.mapRoomIdToSimoID[room.roomId]}`)).data.messages;
          for(let i=0; i < messages.length; i++) {
            this.lastMessageId++;

            let user = (messages[i][1] === 'USER') ? this.userMe : this.userBot;

            this.storage.messages[room.roomId].push({
              _id: this.lastMessageId,
              content: messages[i][0],
              senderId: user._id,
              avatar: user.avatar,
              seen: user === this.userBot,
              disableActions: true,
              disableReactions: true,
            });
          }
        } else if (this.storage.messages[room.roomId] == undefined) {
          this.storage.messages[room.roomId] = [];
        }
        else {
          await new Promise(r => setTimeout(r, 100));
        }

        this.currentMessages = this.storage.messages[room.roomId];
        this.messagesLoaded = true;
      })

    },

    addMessage(content: string, user: any, roomId: string) {
      this.lastMessageId++;

      let newMessage = {
        _id: this.lastMessageId,
        content: content,
        senderId: user._id,
        avatar: user.avatar,
        seen: user === this.userBot,
        disableActions: true,
        disableReactions: true,
      }
      this.storage.messages[roomId].push(newMessage);
      this.messages = this.storage.messages[roomId];

      return newMessage;
    },

    async addMessageProgressively(content: string, user: any, roomId: string){
      this.lastMessageId++;

      let newMessage = this.addMessage('', user, roomId);

      const words = content.split(" ")
      for(let i=0; i < words.length; i++) {
        this.storage.messages[roomId].at(-1).content += words[i] + " ";
        await new Promise(r => setTimeout(r, 150));
        this.messages = this.storage.messages[roomId];
      }

      return newMessage;
    },

    async addThreeDots(roomId: string) {
      await new Promise(r => setTimeout(r, 300));
      this.storage.messages[roomId].push(
        {
          _id: this.typingIndicator,
          senderId: this.userBot._id,
          avatar: this.userBot.avatar,
          seen: true,
        });
      this.messages = this.storage.messages[roomId];
    },
    removeThreeDots(roomId: string) {
      this.storage.messages[roomId].pop();
      this.messages = this.storage.messages[roomId];
    },

    async sendMessage(message: any) {
      if(this.mapRoomIdToSimoID[message.roomId] == undefined){
        this.mapRoomIdToSimoID[message.roomId] = (await axiosBot.post(`/chat`, {
          user_type: this.mainStore.currentAccount.name,
          name: this.selectedRoomName
        })).data.id;
      }

      if(this.loadingBotAnswer) {
        return;
      }

      this.loadingBotAnswer = true;
      const roomId = message.roomId;

      try{
        const botAnswerPromise = this.sendRequest(message.content, this.mapRoomIdToSimoID[roomId]);

        this.addMessage(message.content, this.userMe, roomId);

        await this.addThreeDots(roomId);
        const botAnswer = (await botAnswerPromise as any)[0];
        this.removeThreeDots(roomId);

        this.storage.rooms.filter((room: any) => room.roomId === roomId)[0].lastMessage = await this.addMessageProgressively(botAnswer as string, this.userBot, roomId);
        this.storage.rooms = [...this.storage.rooms];
      } catch (e) {
        console.log(e);
      }

      this.loadingBotAnswer = false;
    },

    async sendRequest(message: string, simoId: string) {
      return new Promise(async (resolve, reject) => {
        try {
          await axiosBot.post('/message', {
            id: simoId,
            value: message
          });

          let ready = false;
          while (!ready) {
            await new Promise(r => setTimeout(r, 1000));
            ready = (await axiosBot.get(`/chat/${simoId}?ready`)).data;
          }

          const answer = (await axiosBot.get(`/chat/${simoId}?lastmessage`)).data;
          resolve(answer);
        } catch (error) {
          reject(error);
        }
      });
    },

    addRoom(){
      this.lastRoomId++;
      this.storage.rooms = [{
        roomId: (this.lastRoomId).toString(),
        roomName: 'New Chat ' + (this.lastRoomId + 1).toString(),
        users: [this.userMe, this.userBot],
        typingUsers: []
      }, ...this.storage.rooms];
    },
    async menuActionHandler({ action, roomId }: any) {
      if(action.name === 'deleteRoom') {
        if(this.mapRoomIdToSimoID[roomId] != undefined) {
          await axiosBot.delete(`/chat/${this.mapRoomIdToSimoID[roomId]}`)
        }
        this.storage.rooms = this.storage.rooms.filter((room: Room) => !(room.roomId == roomId));
      }
    },

    async onUpdateRoomName(e: any) {
      this.editingRoomName = false;
      this.selectedRoomName = e.target.innerText;
      this.storage.rooms.filter((room: any) => room.roomId === this.selectedRoomId)[0].roomName = this.selectedRoomName;
      this.storage.rooms = [...this.storage.rooms];

      await axiosBot.put(`/chat/${this.mapRoomIdToSimoID[this.selectedRoomId]}`, {name: this.selectedRoomName});
    },

    async onEditingFocusout() {
      this.dont_touch_this = false;

      await new Promise(r => setTimeout(r, 10));
      // element.remove();
      this.editingRoomName = false;
      this.dont_touch_this = true;
    },
  },
  computed: {
    ...mapStores(useMainStore),
    theme() { return (this.$vuetify.theme as any).global.name; },

    currentAccount: {
      get() {
        return this.mainStore.currentAccount;
      },
      set(value: Account) {},
    },
    isSmall() { return window.innerWidth < 600 },
    isMobile() { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); },
  }
}
</script>


<style scoped lang="scss">
@use 'three-dots';

.custom-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
}

.no-mobile{
  bottom: 10px !important;
}
</style>
