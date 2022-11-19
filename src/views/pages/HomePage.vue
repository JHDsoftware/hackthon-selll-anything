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
          <v-card style="user-select: none;border-radius: 16px" v-for="t in 12" :key="t" color="white"
                  elevation="0">
            <v-img :aspect-ratio="1" src="https://random.imagecdn.app/500/500">
              <template #placeholder>
                <div style="width: 100%;height: 120px;"
                     class="d-flex align-center justify-center">
                  <v-progress-circular indeterminate/>
                </div>
              </template>
            </v-img>
            <div class="pa-2 px-4">
              <div class="text-caption">
                <span class="success--text text--darken-3 font-weight-medium">Sales</span>
                by
                <v-avatar size="14" class="ml-1">
                  <v-img :src="'https://api.multiavatar.com/'+t+'.svg'"></v-img>
                </v-avatar>
              </div>

              <div class="d-flex align-center">
                <div class="text-body-1">
                  Real Thing with long name
                </div>
              </div>
              <div class="mt-1 font-weight-medium">
                {{ 123 | priceDisplay }}
              </div>
              <div class="text-caption mt-n1 d-flex align-center">
                <div>
                  123 in stock
                </div>


                <v-spacer></v-spacer>

              </div>


            </div>
          </v-card>
        </div>
      </div>
    </v-main>
  </div>
</template>

<script>
import LogoDisplay from "@/views/widgets/LogoDisplay";
import VersionDisplay from "@/views/widgets/VersionDisplay";
import {getCurrentUserId} from "@/dataLayer/service/firebase/user";

export default {
  name: "HomePage",
  components: {VersionDisplay, LogoDisplay},
  data: function () {
    return {
      userId: getCurrentUserId()
    };
  }
}
</script>

<style scoped>

</style>
