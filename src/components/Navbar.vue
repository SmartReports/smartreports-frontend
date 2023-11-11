<template>
  <!-- APP BAR with menu button -->
  <Appbar
    :account-id="currentAccount.value"
    :elevation="3"
    @onMobileClick="onMobileClick"
    @onNormalClick="onNormalClick"
  />
  <v-navigation-drawer floating :elevation="3" v-model="drawer" :rail="rail">
    <!-- PAGES ICONS (BUTTONS) -->
    <v-list density="compact" nav>
      <v-list-item
        v-for="(menuitem, i) in items"
        :key="i"
        :prepend-icon="menuitem.icon"
        :title="menuitem.title"
        :value="menuitem.value"
        :to="menuitem.path"
        @click="rail = true"
        class="rounded-pill"
        color="primary"
      ></v-list-item>
    </v-list>

    <!-- SPLIT LINE BETWEEN PAGES ICONS AND ACCOUNT ICON -->
    <v-divider :elevation="3"></v-divider>

    <!-- ACCOUNT ICON AND DROPDOWN SELECTOR -->
    <template v-slot:append>
      <v-list>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-avatar="currentAccount.image"
              :title="currentAccount.name"
              :subtitle="currentAccount.employment"
              append-icon="mdi-arrow-down-drop-circle"
              @click="rail = !rail"
            >
            </v-list-item>
          </template>
          <v-list>
            <v-list-item
              v-for="(account, index) in mainStore.accounts"
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
    </template>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Appbar from "./Appbar.vue";
import { useTheme } from "vuetify";
import { Account, Alarms, Kpi } from "../models";
import { useMainStore } from "../store/app";
import { mapStores } from "pinia";
export default {
  setup() {
    const theme = useTheme();
    theme.global.name.value = "light";
  },
  data() {
    return {
      drawer: true,
      rail: true && window.innerWidth < 600,
      items: [
        {
          title: "Dashboard",
          path: "/dashboard",
          value: "Home",
          icon: "mdi-view-dashboard",
        },
        {
          title: "Templates",
          path: "/templates",
          value: "templates",
          icon: "mdi-table-settings",
        },
        {
          title: "Archive",
          path: "/archive",
          value: "archive",
          icon: "mdi-archive-outline",
        },
        {
          title: "TemplateEditor",
          path: "/templateeditor",
          value: "templateeditor",
          icon: "mdi-archive-outline",
        },
        {
          title: "Settings",
          path: "/settings",
          value: "settings",
          icon: "mdi-cog",
        },
      ],
      isMobile: false,
      notificationSetting: false,
    };
  },
  beforeDestroy() {
    if (typeof window === "undefined") return;
    window.removeEventListener("resize", this.onResize);
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  created() {
    this.$emit("user_pass", this.currentAccount.value);
    this.mainStore.getAlarms(this.currentAccount.value);
    this.mainStore.getKpi(this.currentAccount.value);
  },
  methods: {
    onAccountChange(
      value: number,
      currAcc: {
        name: string;
        employment: string;
        value: string;
        image: string;
      }
    ) {
      if (this.rail == true) {
        this.rail = false;
      }
      this.mainStore.accounts.push(this.currentAccount)
      this.currentAccount = this.mainStore.accounts[value];
      this.mainStore.accounts.splice(value, 1)
      this.rail = true;
      this.$emit("user_pass", this.currentAccount.value);
      this.mainStore.getAlarms(this.currentAccount.value);
      this.mainStore.getKpi(this.currentAccount.value);
    },
    onResize() {
      this.isMobile = window.innerWidth < 600;
      this.rail = this.rail && this.isMobile;
    },
    onMobileClick() {
      this.drawer = !this.drawer;
      this.rail = false;
    },
    onNormalClick() {
      this.rail = !this.rail;
    },
  },
  computed: {
    ...mapStores(useMainStore),
    currentAccount: {
      get() {
        return this.mainStore.currentAccount;
      },
      set(value: Account) {
        this.mainStore.currentAccount = value;
      },
    },
  },
  components: { Appbar },
};
</script>
