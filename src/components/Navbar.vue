<template>
  <!-- APP BAR with menu button -->
  <v-navigation-drawer v-if="!isMobile && !isLoading" :class="!isMedium? 'drawer': ''" floating :elevation="0" v-model="drawer" :rail="rail">
    <div class="d-flex align-center site-icn">
        <div
        class="rounded-circle d-flex justify-center align-center mr-3 pa-2 grad-bg">
        <v-icon class="" size="x-large" color="company_color">
          mdi-chart-timeline-variant-shimmer
        </v-icon>
      </div>
      <!-- SITE NAME -->
      <div class="px-1"></div>
      <svg :class="{ 'invert-color': invert }" version="1.0" xmlns="http://www.w3.org/2000/svg"
           width="90px" viewBox="0 0   1672.000000 794.000000"
           preserveAspectRatio="xMidYMid meet">

          <g transform="translate(0.000000,794.000000) scale(0.100000,-0.100000)"
          fill="#000000" stroke="none">
          <path d="M11410 6624 c0 -3 413 -616 918 -1361 504 -746 921 -1364 925 -1373
          7 -13 -209 -344 -953 -1460 -529 -793 -964 -1448 -967 -1456 -4 -12 72 -14
          500 -14 441 0 506 2 517 15 7 9 333 500 724 1091 391 592 715 1076 721 1077 5
          0 334 -490 730 -1089 l720 -1089 509 -3 c433 -2 507 0 503 12 -3 8 -438 662
          -966 1455 -529 792 -961 1444 -961 1447 0 6 1722 2557 1817 2692 l44 62 -513
          0 -513 -1 -681 -1012 c-374 -556 -684 -1012 -689 -1011 -5 1 -316 456 -690
          1012 l-680 1012 -507 0 c-280 0 -508 -3 -508 -6z m893 -241 c8 -10 345 -509
          749 -1108 403 -600 738 -1091 743 -1091 6 0 336 484 733 1075 398 592 735
          1091 748 1109 l25 32 220 0 c120 0 219 -3 219 -6 0 -3 -382 -571 -849 -1261
          l-849 -1255 889 -1334 c489 -734 889 -1336 889 -1339 0 -3 -101 -5 -224 -5
          l-223 0 -785 1186 c-431 653 -787 1187 -792 1188 -4 1 -361 -533 -793 -1186
          l-785 -1188 -225 0 c-177 0 -223 3 -217 13 4 6 404 606 888 1332 483 726 879
          1325 879 1331 0 5 -381 573 -846 1262 -466 688 -847 1253 -847 1256 0 4 98 6
          218 6 196 0 221 -2 235 -17z"/>
          <path d="M308 5544 c-5 -4 -8 -754 -8 -1666 l0 -1658 624 0 c677 0 758 5 945
          55 256 69 446 180 626 366 215 222 343 507 402 889 21 143 24 527 4 670 -93
          681 -438 1117 -1014 1284 -189 55 -240 58 -932 63 -352 3 -643 1 -647 -3z
          m1272 -364 c227 -30 415 -116 563 -259 271 -261 394 -657 366 -1178 -31 -561
          -298 -975 -719 -1112 -150 -49 -192 -52 -647 -58 l-433 -5 0 1311 0 1311 398
          0 c218 0 431 -5 472 -10z"/>
          <path d="M4409 5523 c-6 -16 -287 -757 -624 -1648 -338 -891 -617 -1628 -620
          -1638 -7 -16 5 -17 196 -15 l202 3 153 410 153 410 773 3 773 2 154 -415 155
          -415 202 0 202 0 -37 98 c-21 53 -305 802 -631 1665 l-593 1567 -224 0 -223 0
          -11 -27z m548 -1255 c166 -453 305 -831 308 -840 7 -17 -27 -18 -619 -18 -344
          0 -626 4 -626 8 0 6 474 1307 605 1660 2 6 10 12 18 12 9 0 119 -288 314 -822z"/>
          <path d="M6250 5370 l0 -180 535 0 535 0 0 -1485 0 -1485 200 0 200 0 0 1485
          0 1485 535 0 535 0 0 180 0 180 -1270 0 -1270 0 0 -180z"/>
          <path d="M10165 5533 c-7 -18 -1185 -3130 -1231 -3250 l-23 -63 202 0 202 0
          154 415 154 415 772 0 773 0 135 -362 c74 -200 143 -387 153 -415 l19 -53 202
          0 202 0 -13 38 c-15 41 -1170 3091 -1218 3215 l-29 77 -224 0 c-203 0 -223 -2
          -230 -17z m250 -460 c25 -64 605 -1653 605 -1657 0 -3 -281 -6 -625 -6 -344 0
          -625 2 -625 5 0 2 133 368 296 812 163 444 301 820 306 836 11 31 32 36 43 10z"/>
          </g>
          </svg>
      <!-- <img class='svg' :class="{ 'invert-color': invert }" src="../assets/logo.png" alt="logo" height="40px" /> -->
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
    v-if="!isLoading"
    :account-id="currentAccount.value"
    @onMediumClick="onMediumClick"
    @onNormalClick="onNormalClick"
    @onAccountChange="onAccountChange"
  />
  <v-bottom-navigation v-if="(isMobile || isSmall) && !isLoading" :elevation="8" grow>
      <v-btn
        v-for="(menuitem, i) in items"
        :key="menuitem.order"
        :prepend-icon="menuitem.icon"
        :title="menuitem.title"
        :value="menuitem.value"
        :to="menuitem.path"
        color="primary"
      >
      <span>{{ menuitem.title }}</span>
      </v-btn>
      <!-- <v-btn
        :prepend-icon="admin.icon"
        :title="admin.title"
        :value="admin.value"
        :href="admin.href"
        color="primary"
      >
      <span>{{ admin.title }}</span>
      </v-btn> -->
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
      rail: false,
      items: [
        {
          title: "Home",
          path: "/dashboard",
          value: "Home",
          icon: "mdi-view-dashboard",
          order: 2,
        },
        {
          title: "Dashes",
          path: "/dashes",
          value: "dashes",
          icon: "mdi-table-settings",
          order: 1,
        },
        {
          title: "Notifications",
          path: "/notification",
          value: "notification",
          icon: "mdi-bell",
          order: 3,
        },
        {
          title: "Archive",
          path: "/archive",
          value: "archive",
          icon: "mdi-archive-outline",
          order: 4,
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

    this.mainStore.getSuggestedReports(this.currentAccount.value);
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
      if (this.rail) {
        this.rail = false;
      }
      this.mainStore.accounts.push(this.currentAccount)
      this.currentAccount = this.mainStore.accounts[value];
      this.mainStore.accounts.splice(value, 1)
      this.rail = true;
      this.$emit("user_pass", this.currentAccount.value);

      this.mainStore.getSuggestedReports(this.currentAccount.value);
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
    isLoading() { return this.mainStore.activeRequests > 0; },
    isMobile() {
      this.drawer = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 600;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); },
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
