<template>
  <div>
    <v-app-bar dark app elevation="0">
      <div>
        <logo-display/>
        <version-display class="mt-n1"></version-display>
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
      <div class="pa-6">
        <div style="display: grid;grid-template-columns: repeat(auto-fit,minmax(180px,1fr));grid-gap: 12px">
          <order-card v-for="t in 12" :key="t"></order-card>
        </div>
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
