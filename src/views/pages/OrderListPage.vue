<template>
  <div style="background: #f0f0f0;min-height: calc(100vh)">
    <v-app-bar app elevation="0">
      <div>
        <logo-display/>
      </div>

      <v-spacer/>
      <v-btn @click="goBackPage">Return</v-btn>
    </v-app-bar>

    <v-container>
      <div class="px-6">
        <div style="width: 100%" class="pa-6 my-10 mb-4 d-flex align-center justify-center flex-column">
          <div class="display-1">Transaction Overview</div>
          <div class="text-body-1 font-weight-black">See all your Transactions😋</div>
        </div>
      </div>
      <v-tabs
          class="ml-3"
          v-model="tab"
          background-color="transparent"
          glow>
        <v-tab v-for="item in items" :key="item">
          {{item}}
        </v-tab>
        <v-tab-item>
            <order-list-item
                :items="notFinishedData"
            />

        </v-tab-item>
        <v-tab-item>
            <order-list-item
                :items="finishedData"
            />

        </v-tab-item>
      </v-tabs>


      <version-display></version-display>
    </v-container>
  </div>
</template>

<script>
import VersionDisplay from "@/views/widgets/VersionDisplay";
import {getCurrentUserId} from "@/dataLayer/service/firebase/user";
import LogoDisplay from "@/views/widgets/LogoDisplay";
import OrderListItem from "@/views/widgets/items/OrderListItem";
import router from "@/router";

export default {
  components: {VersionDisplay, LogoDisplay, OrderListItem},
  name: "OrderListPage",
  computed:{
    finishedData() {
      return this.listItems.filter(this.filterFinished)
    },
    notFinishedData() {
      return this.listItems.filter(this.filterNotFinished)
    }
  },
  data: ()=> {
    return {
      tab: null,
      userId: getCurrentUserId(),
      items: ["In process", "Ordered"],
      listItems: [
        {
          avatar: 'https://api.multiavatar.com/'+getCurrentUserId()+'.svg',
          tradeAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          timestamp: '2022/11/19 13:43:23',
          isSold: true,
          isFinished: true,
          title: 'Real Thing with Long Name',
          price: 100,
          subtitle: `DescDescDescDescDescDesc`,
        },
        {
          avatar: 'https://api.multiavatar.com/'+getCurrentUserId()+'.svg',
          tradeAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          timestamp: '2022/11/19 13:43:23',
          isSold: true,
          isFinished: true,
          title: 'Real Thing with Long Name',
          price: 100,
          subtitle: `DescDescDescDescDescDesc`,
        },
        {
          avatar: 'https://api.multiavatar.com/'+getCurrentUserId()+'.svg',
          tradeAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          timestamp: '2022/11/19 13:43:23',
          isSold: false,
          isFinished: false,
          title: 'Summer BBQ',
          price: 120,
          subtitle: `DescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDesc`,
        },
      ],
    }
  },
  methods: {
    filterFinished(item) {
      return item.isFinished === true
    },
    filterNotFinished(item) {
      return item.isFinished === false
    },
    goBackPage () {
      router.back()
    }
  },
}
</script>

<style scoped>

</style>
