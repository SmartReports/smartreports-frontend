<template>
    <!-- APP BAR with menu button -->
    <Appbar :account-id="currentAccount.value" :elevation="3" @onMobileClick="onMobileClick" @onNormalClick="onNormalClick"/>
    <v-navigation-drawer :elevation="3" v-model="drawer" :rail="rail">
        <!-- PAGES ICONS (BUTTONS) -->
        <v-list density="compact" nav>
            <v-list-item v-for="(menuitem, i) in items" :key="i"
                :prepend-icon="menuitem.icon"
                :title="menuitem.title"
                :value="menuitem.value"
                :to="menuitem.path"
                @click="rail=true"
                class="rounded-pill"
                color='primary'
              ></v-list-item>
        </v-list>

        <!-- SPLIT LINE BETWEEN PAGES ICONS AND ACCOUNT ICON -->
        <v-divider :elevation="3"></v-divider>

        <!-- ACCOUNT ICON AND DROPDOWN SELECTOR -->
        <v-list>
          <v-menu>
          <template v-slot:activator="{ props }">
              <v-list-item v-bind="props"
              :prepend-avatar="currentAccount.image"
              :title="currentAccount.name"
              :subtitle="currentAccount.employment"
              append-icon="mdi-arrow-down-drop-circle"
              @click="rail=!rail"
              >
            </v-list-item>
          </template>
                <v-list>
                  <v-list-item v-for="(account, index) in accounts"
                              :key="index"
                              :value="index"
                              :prepend-avatar="account.image"
                              @click="onAccountChange(index, currentAccount)"
                              :title="account.name"
                              :subtitle="account.employment"
                              >
                  </v-list-item>
                </v-list>
            </v-menu>
        </v-list>
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <template v-slot:append>
            <v-card class="pa-4">
            <v-list-item>
              <v-switch
                :model="darkMode"
                @change="toggleDarkMode"
                :label="`toggle ${switchLabel} mode`"
                hide-details inset
                color="orange">
              </v-switch>
            </v-list-item>
          </v-card>
        </template>
      </v-navigation-drawer>
</template>

<script lang="ts">
import Appbar from "./Appbar.vue";
import { useTheme } from "vuetify";
import { Account } from "../models"
import { PropType } from "vue";

  export default {
    setup() {
        const theme = useTheme();
        theme.global.name.value = 'light';
    },
    data() {
        return {
            darkMode: false,
            drawer: true,
            rail: true && (window.innerWidth < 600),
            items: [
                { title: 'Dashboard', path: "/Dashboard", value: "Home", icon: "mdi-view-dashboard" },
                { title: 'Customize Reports', path: "/Reports", value: "reports", icon: "mdi-table-settings" },
                { title: 'Archive', path: "/Archive", value: "archive", icon: "mdi-archive-outline" },
                { title: 'TemplateEditor', path: "/TemplateEditor", value: "templateeditor", icon: "mdi-archive-outline" },
            ],
            accounts: [
                { name: "Francesco", employment: "Production Engineer", value: "project_manager", image: "https://www.nahb.org/-/media/NAHB/education-and-events/images/designations/designations-cmp-500x500.jpg?h=500&w=500&la=en&hash=7FF6FBC0A5C3FA87869D099A0079E670" },
                { name: "Sandra", employment: "Parent", value: "parent", image: "https://www.scopeaust.org.au/uploads/main/Disability-Services/physiotherapy-small.jpg" },
                { name: "Rodolfo", employment: "Doctor", value: "doctor", image: "https://emis.health/wp-content/uploads/2023/07/Doctor-10.jpg" },
            ],
            currentAccount: { name: "Caterina", employment: "Machine Maintainer", value: "machine_maintainer", image: new URL(`../assets/Caterina.png`, import.meta.url).href } as Account,
            isMobile: false,
            notificationSetting: false,
        };
    },
    props: {
    },
    beforeDestroy() {
        if (typeof window === 'undefined')
            return;
        window.removeEventListener('resize', this.onResize);
    },
    mounted() {
        this.onResize();
        window.addEventListener('resize', this.onResize);
    },
    methods: {
        onAccountChange(value: number, currAcc: {
            name: string;
            employment: string;
            value: string;
            image: string;
        }) {
            if (this.rail == true) {
                this.rail = false;
            }
            this.currentAccount = this.accounts[value];
            this.accounts.splice(value, 1);
            this.accounts.push(currAcc);
            this.rail = true;
        },
        onResize() {
            this.isMobile = window.innerWidth < 600;
            this.rail = this.rail && this.isMobile;
        },
        onMobileClick() {
          this.drawer=!this.drawer;
          this.rail=false;
        },
        onNormalClick() {
          this.rail=!this.rail;
        },
        toggleDarkMode: function () {
            (this.$vuetify.theme as any).global.name = this.darkMode ? 'dark' : 'light';
            this.darkMode = !this.darkMode;
        }
    },
    computed: {
      switchLabel: function () {
        return !this.darkMode ? 'light' : 'dark';
      }
    },
    components: { Appbar }
}
</script>
