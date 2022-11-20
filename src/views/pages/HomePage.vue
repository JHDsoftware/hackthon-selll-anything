<template>
  <div>
    <v-app-bar app elevation="0" hide-on-scroll :dark="offsetTop > 0">
      <div>
        <logo-display/>
      </div>
      <v-spacer/>
      <v-card
          @click="showUserPanel = true"
          class="pa-1 d-flex align-center rounded-pill"
          elevation="0">
        <v-avatar size="30" class="mr-2">
          <v-img :src="'https://api.multiavatar.com/'+userId+'.svg'"></v-img>
        </v-avatar>
        <span class="text-body-2">
             {{ userName }}
        </span>

        <v-icon class="ml-2">mdi-chevron-down</v-icon>
      </v-card>
      <template #extension>
        <div class="d-flex align-center" style="width: 100vw">
          <v-btn light
                 @click="startSearch"
                 elevation="0"
                 class="mr-2"
                 small
                 color="primary black--text lighten-4"
          >
            <v-icon left small>mdi-tune</v-icon>
            Search
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              class="mr-2"
              elevation="0"
              @click="gotoSalePage"
              color="warning black--text lighten-4"
              small>
            <v-icon left small>mdi-clipboard-list</v-icon>
            My Offers
          </v-btn>
          <v-btn
              elevation="0"
              @click="toNewOffer"
              color="success black--text lighten-4"
              small>
            <v-icon left small>mdi-plus-circle</v-icon>
            new Offer
          </v-btn>
        </div>
      </template>
    </v-app-bar>
    <v-main v-scroll="onScroll" class="overflow-y-auto" style="background: #f0f0f0;min-height: calc(100vh)">
      <div class="px-6 pb-12">
        <div style="width: 100%" class="pa-6 py-10 mb-4 d-flex align-center justify-center flex-column">
          <div class="display-1 text-center">Explore, Trade and Share</div>
          <div class="text-body-1 font-weight-black">Things that you love😋</div>
        </div>
        <div style="display: grid;grid-template-columns: repeat(auto-fit,minmax(180px,1fr));grid-gap: 12px">
          <order-card
              @click="$router.push('/offerSubmit/'+t.item_id)"
              v-for="t in orderList"
              :key="t.order_id"
              :t="t"
          />
        </div>
        <div v-if="offsetTop>0" style="position: fixed; bottom: 36px;right: 36px;">
          <v-btn
              class="mx-2"
              fab
              dark
              large
              color="primary"
              @click="toTop()"
          >
            <v-icon dark>
              mdi-arrow-up
            </v-icon>
          </v-btn>
        </div>
      </div>
    </v-main>
    <v-navigation-drawer width="340" app right v-model="showMyOrders">
      <order-list-page :show="showMyOrders"
                       @close="showMyOrders=false"/>
    </v-navigation-drawer>
    <v-dialog fullscreen v-model="showSearchDialog">
      <v-card style="width: 100vw;height: 100vh">
        <div class="pa-6 d-flex align-center flex-column justify-center fill-height">
          <template v-if="!loading">
            <div class="text-h5">
              Search
            </div>
            <div class="mt-8" style="width: 300px">
              <v-text-field
                  v-model="searchTextModel"
                  rounded
                  hide-details
                  autofocus
                  filled
                  placeholder="e.g. A Cute Toaster......"
              />
            </div>
          </template>
          <template v-else>
            <div class="text-h5">
              Rescuring results from 🌋
            </div>
          </template>

          <div class="text-caption mt-2 text--secondary">
            {{ message }}
          </div>

          <div class="d-flex mt-6">
            <v-btn
                v-if="!loading"
                @click="showSearchDialog=false"
                class="mr-2"
                icon
                style="background: #f6f6f6"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn :loading="loading" @click="confirmSearch" elevation="0" rounded>
              <v-icon left>mdi-magnify</v-icon>
              Search
            </v-btn>
          </div>

        </div>
      </v-card>
    </v-dialog>
    <v-dialog fullscreen v-model="showUserPanel">
      <v-card style="width: 100vw;height: 100vh">
        <my-page @close="showUserPanel=false"></my-page>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import LogoDisplay from "@/views/widgets/LogoDisplay";
import MyPage from "@/views/pages/MyPage";
import {getCurrentUser, getCurrentUserId} from "@/dataLayer/service/firebase/user";
import OrderCard from "@/views/widgets/items/OrderCard";
import {getOrderByList} from "@/dataLayer/service/firebase/order";
import OrderListPage from "@/views/pages/OrderListPage";
import {collection, onSnapshot, query} from 'firebase/firestore'
import {GlobalDB} from "@/plugins/google-fire-base";

export default {
  name: "HomePage",
  components: {MyPage, OrderCard, LogoDisplay, OrderListPage},
  async mounted() {
    onSnapshot(query(collection(GlobalDB, "order")), (snapshot) => {
      const res = snapshot.docs.map(it => it.data())
      this.orderList = getOrderByList(res)
    });
  },
  computed: {
    userName() {
      return this.user.isAnonymous ? 'Guest' : this.user.displayName
    },
  },
  data: function () {
    return {
      showSearchDialog: false,
      searchText: '',
      searchTextModel: '',
      message: '',
      loading: false,
      offsetTop: 0,
      showUserPanel: false,
      user: getCurrentUser(),
      userId: getCurrentUserId(),
      orderList: [],
      showMyOrders: false,
      showChangeNumberDialog: false
    };
  },

  methods: {

    gotoSalePage() {
      this.showMyOrders = true
    },

    onScroll(e) {
      this.offsetTop = e.target.scrollingElement.scrollTop
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    toNewOffer() {
      this.$router.push('offerSubmit')
    },
    startSearch() {
      this.searchTextModel = ''
      this.message = ''
      this.showSearchDialog = true
    },
    confirmSearch() {
      if (this.searchTextModel) {
        this.searchText = this.searchTextModel
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.showSearchDialog = false
        }, 2000)
      } else {
        this.message = 'please input some text'
      }

    }
  }
}
</script>

<style scoped>

</style>
