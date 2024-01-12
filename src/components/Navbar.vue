<template>

  <!-- APP BAR with menu button -->
  <v-navigation-drawer v-if="!isMobile" :class="!isMedium? 'drawer': ''" floating :elevation="0" v-model="drawer" :rail="rail">
    <div class="d-flex align-center site-icn">
        <div
        class="rounded-circle d-flex justify-center align-center mr-3 pa-2 grad-bg">
        <v-icon class="" size="x-large" color="company_color">
          mdi-chart-timeline-variant-shimmer
        </v-icon>
      </div>
      <!-- SITE NAME -->
      <div class="px-1"></div>
      <img class='svg' :class="{ 'invert-color': invert }" src="../assets/logo.svg" alt="logo" height="40px" />
  </div>
    <div class="pt-8"></div>
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
      <v-list-item
        :prepend-icon="admin.icon"
        :title="admin.title"
        :value="admin.value"
        :href="admin.href"
        @click="rail = true"
        class="rounded-pill"
        color="primary"
      ></v-list-item>
    </v-list>
    <!-- SPLIT LINE BETWEEN PAGES ICONS AND ACCOUNT ICON -->
    <!-- <v-divider :elevation="3"></v-divider> -->
  </v-navigation-drawer>
  <Appbar
    :account-id="currentAccount.value"
    @onMobileClick="onMediumClick"
    @onNormalClick="onNormalClick"
    @onAccountChange="onAccountChange"
  />
  <v-bottom-navigation v-if="isMobile || isSmall" :elevation="0" mode="shift">
      <v-btn
        v-for="(menuitem, i) in items"
        :key="i"
        :prepend-icon="menuitem.icon"
        :title="menuitem.title"
        :value="menuitem.value"
        :to="menuitem.path"
        color="primary"
      ></v-btn>
      <v-btn
        :prepend-icon="admin.icon"
        :title="admin.title"
        :value="admin.value"
        :href="admin.href"
        color="primary"
      ></v-btn>
</v-bottom-navigation>
</template>

<script lang="ts">
import Appbar from "./Appbar.vue";
import { useTheme } from "vuetify";
import { Account, Alarms, Kpi } from "../models";
import { useMainStore } from "../store/app";
import { mapStores } from "pinia";
import { tr } from "date-fns/locale";


export default {
  emits: ['user_pass'],
  setup() {
    const theme = useTheme();
    theme.global.name.value = "light";
  },
  data() {
    return {
      drawer: true,
      rail: false && window.innerWidth < 1400 && window.innerWidth > 600,
      items: [
        {
          title: "Home",
          path: "/dashboard",
          value: "Home",
          icon: "mdi-view-dashboard",
        },
        {
          title: "Dashes",
          path: "/dashes",
          value: "dashes",
          icon: "mdi-table-settings",
        },
        {
          title: "Notifications",
          path: "/notification",
          value: "notification",
          icon: "mdi-bell",
        },
        {
          title: "Archive",
          path: "/archive",
          value: "archive",
          icon: "mdi-archive-outline",
        },
      ],
      admin: {
          title: "Admin",
          href: "https://smart-apps.cloud",
          value: "admin",
          icon: "mdi-dns",
        },
      isMedium: false,
      isSmall: false,
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
    this.mainStore.getSuggestedReports(this.currentAccount.value)
    this.mainStore.getReports(this.currentAccount.value);
    this.mainStore.getAlarms(this.currentAccount.value);
    this.mainStore.getKpi(this.currentAccount.value);
    this.mainStore.getArchivedReports(this.currentAccount.value);
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
      this.mainStore.getSuggestedReports(this.currentAccount.value)
      this.mainStore.getReports(this.currentAccount.value);
      this.mainStore.getAlarms(this.currentAccount.value);
      this.mainStore.getKpi(this.currentAccount.value);
      this.mainStore.getArchivedReports(this.currentAccount.value);

    },
    onResize() {
      this.isMedium = window.innerWidth < 1400 && window.innerWidth > 600;
      this.isSmall = window.innerWidth < 600;
      this.rail = this.rail && this.isMedium;
    },
    onMediumClick() {
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
    invert() {
      return (this.$vuetify.theme as any).global.name == 'dark'
    },
    isMobile() { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); },
  },
  components: { Appbar },
};
</script>

<style>
.invert-color {
  filter: invert(1); /* Invert the color */
}
.site-icn{
  position: relative;
  margin-left: 5px;
  margin-right: 0px;
  margin-top: 10px;
}

.drawer{
  margin-left: 5px;
  margin-right: 5px
}

svg{
    fill: #fff;
    stroke: #fff;
}
</style>
