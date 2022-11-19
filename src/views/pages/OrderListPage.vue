<template>
  <div class="pa-4">
    <page-title>
      My Offers
      <template #backButton>
        <v-btn outlined style="border-radius: 8px" icon @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
    </page-title>
    <div class="mt-12">
      <div class="py-1"
           style="display: grid;grid-template-columns: repeat(3,minmax(0,1fr));background: #f0f0f0;border-radius: 24px">
        <v-card
            @click="tab=0"
            style="border-radius: 24px"
            :color="tab===0?'success black--text lighten-2':'transparent'"
            :elevation="tab===0?1:0"
            class="pa-2 d-flex align-center text-caption justify-center"
        >
          Active
        </v-card>
        <v-card
            @click="tab=1"
            style="border-radius: 24px"
            :color="tab===1?'success black--text lighten-2':'transparent'"
            :elevation="tab===1?1:0"
            class="pa-2 d-flex text-caption align-center justify-center"
        >
          Complete
        </v-card>
        <v-card
            @click="tab=2"
            style="border-radius: 24px"
            :color="tab===2?'success black--text lighten-2':'transparent'"
            :elevation="tab===2?1:0"
            class="pa-2 d-flex align-center text-caption justify-center"
        >
          Logs
        </v-card>
      </div>
      <template v-if="tab===0">
        <div class="py-2">
          <v-card elevation="0"
                  class="pa-4 mb-2 d-flex align-center">
            <v-img
                src="https://random.imagecdn.app/500/500"
                :aspect-ratio="1"
                style="border-radius: 12px"
                height="64"
                class="flex-grow-0 mr-4"
                width="64"/>
            <div class="d-flex flex-column">
              <div class="text-caption">Item Name</div>
              <v-chip small outlined class="text-body-2 d-flex align-center">
                <v-icon small color="success darken-2">mdi-import</v-icon>
                &times; 50
              </v-chip>

              <v-spacer></v-spacer>
              <div class="d-flex">
                <div class="text-caption font-weight-bold">@{{ 15 | priceDisplay }}</div>
              </div>
            </div>
            <div>
              <v-icon>mdi-dots-horiznotal</v-icon>
            </div>
          </v-card>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {getCurrentUserId} from "@/dataLayer/service/firebase/user";
import router from "@/router";
import PageTitle from "@/views/widgets/PageTitle";

export default {
  components: {PageTitle},
  name: "OrderListPage",
  computed: {
    finishedData() {
      return this.listItems.filter(this.filterFinished)
    },
    notFinishedData() {
      return this.listItems.filter(this.filterNotFinished)
    }
  },
  data: () => {
    return {
      tab: 0,
      userId: getCurrentUserId(),
      listItems: [
        {
          avatar: 'https://api.multiavatar.com/' + getCurrentUserId() + '.svg',
          tradeAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          timestamp: '2022/11/19 13:43:23',
          isSold: true,
          isFinished: true,
          title: 'Real Thing with Long Name',
          price: 100,
          subtitle: `DescDescDescDescDescDesc`,
        },
        {
          avatar: 'https://api.multiavatar.com/' + getCurrentUserId() + '.svg',
          tradeAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          timestamp: '2022/11/19 13:43:23',
          isSold: true,
          isFinished: true,
          title: 'Real Thing with Long Name',
          price: 100,
          subtitle: `DescDescDescDescDescDesc`,
        },
        {
          avatar: 'https://api.multiavatar.com/' + getCurrentUserId() + '.svg',
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
    goBackPage() {
      router.back()
    }
  },
}
</script>

<style scoped>

</style>
