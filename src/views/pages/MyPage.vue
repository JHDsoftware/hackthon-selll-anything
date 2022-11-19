<template>
  <div class="pa-6
   d-flex align-center flex-column justify-center
   fill-height">
    <v-avatar size="80">
      <v-img :src="'https://api.multiavatar.com/'+userId+'.svg'"></v-img>
    </v-avatar>
    <div class="text-body-1  mt-8">
      {{ userName }}
      <v-icon x-small v-if="!user.isAnonymous">mdi-pencil</v-icon>
    </div>
    <div class="text-caption">
      {{ userId }}
    </div>
    <div class="mt-8"
         style="display: grid;grid-gap:8px;grid-template-columns: repeat(3,minmax(0,1fr))">
      <v-card class="pa-2" elevation="0" color="#f6f6f6">
        <v-responsive :aspect-ratio="1">
          <div style="width: 100%;height: 100%" class="d-flex flex-column justify-center align-center">
            <v-icon>mdi-wallet</v-icon>
            <div class="d-flex mt-1">
              <div class="text-caption">
                {{ 1000 | priceDisplay }}
              </div>
            </div>
          </div>
        </v-responsive>
      </v-card>
      <v-card class="pa-2" elevation="0" color="#f6f6f6">
        <v-responsive :aspect-ratio="1">
          <div style="width: 100%;height: 100%" class="d-flex flex-column justify-center align-center">
            <v-icon>mdi-teddy-bear</v-icon>
            <div class="d-flex mt-1">
              <div class="text-caption">
                Prizes
              </div>
            </div>
          </div>
        </v-responsive>
      </v-card>
      <v-card class="pa-2" elevation="0" color="#f6f6f6">
        <v-responsive :aspect-ratio="1">
          <div style="width: 100%;height: 100%" class="d-flex flex-column justify-center align-center">
            <v-icon>mdi-logout</v-icon>
            <div class="d-flex mt-1">
              <div class="text-caption">
                Logout
              </div>
            </div>
          </div>
        </v-responsive>
      </v-card>
    </div>

  </div>
</template>

<script>
import {getCurrentUser} from "@/dataLayer/service/firebase/user";
import {FireBaseAuth} from "@/plugins/google-fire-base";

export default {
  name: "MyPage",
  computed: {
    userId() {
      return this.user.uid
    },
    userName() {
      return this.user.isAnonymous ? 'Guest' : this.user.displayName
    }
  },
  data: function () {
    return {
      user: getCurrentUser()
    };
  },
  methods: {
    logout() {
      FireBaseAuth.signOut()
      this.$router.push('/login')
    },
    saveUserInfo() {
      this.$emit('close')
    },
  },
  mounted() {
    console.log(this.user)
  }
}
</script>

<style scoped>

</style>
