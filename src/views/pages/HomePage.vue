<template>
  <div>
    <v-app-bar hide-on-scroll app elevation="0">
      <div>
        <logo-display/>
      </div>
      <v-spacer/>
      <v-card
          class="pa-1 d-flex align-center rounded-pill"
          elevation="0">
        <v-avatar size="30" class="mr-4">
          <v-img :src="'https://api.multiavatar.com/'+userId+'.svg'"></v-img>
        </v-avatar>
        <span class="text-body-2">
              James Bond
        </span>

        <v-icon class="ml-2">mdi-chevron-down</v-icon>
      </v-card>
      <template #extension>
        <div class="d-flex align-center">
          <v-btn light
                 @click="showSearchDialog=true"
                 elevation="0"
                 class="mr-2"
                 small
                 color="primary black--text lighten-4"
          >
            <v-icon left small>mdi-tune</v-icon>
            Search
          </v-btn>
          <v-btn
              elevation="0"
              @click="showNewOfferDialog=true"
              color="success black--text lighten-4"
              small>
            <v-icon left small>mdi-plus-circle</v-icon>
            new Offer
          </v-btn>
        </div>
      </template>
    </v-app-bar>
    <v-main style="background: #f0f0f0;min-height: calc(100vh)">
      <div class="px-6">
        <div style="width: 100%" class="pa-6 py-10 mb-4 d-flex align-center justify-center flex-column">
          <div class="display-1">Explore, Trade and Share</div>
          <div class="text-body-1 font-weight-black">Things that you love😋</div>
        </div>
        <div style="display: grid;grid-template-columns: repeat(auto-fit,minmax(180px,1fr));grid-gap: 12px">
          <order-card
              v-for="t in 24"
              :key="t"
              :t="t"
          />
        </div>
        <version-display/>
        <div style="position: fixed; bottom: 36px;right: 36px;">
          <v-card dark class="pa-2">
            @QinCHAO<br>
            此处要有一个<br>
            回到最顶部按钮
          </v-card>
        </div>
      </div>
    </v-main>
    <v-dialog fullscreen v-model="showSearchDialog">
      <v-card class="pa-4"></v-card>
    </v-dialog>
  </div>
</template>

<script>
import LogoDisplay from "@/views/widgets/LogoDisplay";
import VersionDisplay from "@/views/widgets/VersionDisplay";
import {getCurrentUserId} from "@/dataLayer/service/firebase/user";
import OrderCard from "@/views/widgets/items/OrderCard";

export default {
  name: "HomePage",
  components: {OrderCard, VersionDisplay, LogoDisplay},
  data: function () {
    return {
      userId: getCurrentUserId(),
      showSearchDialog: false,
      showNewOfferDialog: false,
    };
  }
}
</script>

<style scoped>

</style>
