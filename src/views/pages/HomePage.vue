<template>
  <div>
    <v-app-bar app elevation="0">
      <div>
        <logo-display/>
      </div>
      <v-spacer/>
      <v-btn icon class="mr-4">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-card class="pa-1 px-2 d-flex align-center" elevation="0" rounded>
        <v-avatar size="30" class="mr-4">
          <v-img :src="'https://api.multiavatar.com/'+userId+'.svg'"></v-img>
        </v-avatar>
        James Bond
        <v-icon class="ml-2">mdi-chevron-down</v-icon>
      </v-card>
    </v-app-bar>
    <v-main style="background: #f0f0f0;min-height: calc(100vh)">
      <div class="px-6">
        <div style="width: 100%" class="pa-6 py-10 mb-4 d-flex align-center justify-center flex-column">
          <div class="display-1">Explore, Trade and Share</div>
          <div class="text-body-1 font-weight-black">Things that you love😋</div>
        </div>
        <div style="display: grid;grid-template-columns: repeat(auto-fit,minmax(180px,1fr));grid-gap: 12px">
          <order-card
              v-for="t in 12"
              :key="t"
              :t="t"
          />
        </div>
        <version-display/>
      </div>
    </v-main>
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
      userId: getCurrentUserId()
    };
  }
}
</script>

<style scoped>

</style>
