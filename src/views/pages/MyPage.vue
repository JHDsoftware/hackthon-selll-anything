<template>
  <div class="pa-6
   d-flex align-center flex-column justify-center
   fill-height">
    <v-avatar size="80">
      <v-img :src="'https://api.multiavatar.com/'+userId+'.svg'"></v-img>
    </v-avatar>
    <div class="text-body-1 font-weight-bold mt-8">
      {{ userName }}
      <v-icon x-small v-if="!user.isAnonymous">mdi-pencil</v-icon>
    </div>
    <div class="text-caption">
      {{ userId }}
    </div>
    <div class="mt-8"
         style="display: grid;grid-gap:8px;grid-template-columns: repeat(3,minmax(0,1fr))">
      <v-card
          width="80" @click="rechargeDialog = true"
          class="pa-2" elevation="0" color="#f6f6f6">
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
      <v-card
          width="80"
          class="pa-2" elevation="0" color="#f6f6f6">
        <v-responsive :aspect-ratio="1">
          <div style="width: 100%;height: 100%" class="d-flex flex-column justify-center align-center">
            <v-icon>mdi-trophy</v-icon>
            <div class="d-flex mt-1">
              <div class="text-caption">
                Prize
              </div>
            </div>
          </div>
        </v-responsive>
      </v-card>
      <v-card @click="logout" class="pa-2" elevation="0" color="#f6f6f6">
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
    <div class="mt-12">
      <v-btn outlined icon @click="saveUserInfo">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-dialog transition="dialog-bottom-transition"
              max-width="350" min-height="450"  v-model="rechargeDialog">
      <v-card class="px-5 py-3" >
          <span class="text-body-1 mt-12 font-weight-medium">
            Recharge Amount
          </span>
          <v-spacer></v-spacer>

        <div class="mt-4 d-flex">
          <v-text-field
              v-model="rechargeAmount"
              placeholder="recharge price, e.g. 123.5"
              type="number" step="0.01" min="0"
              rounded filled>
            <template #append>
              <v-icon size="20">mdi-currency-eur</v-icon>
            </template>
          </v-text-field>
        </div>
        <v-spacer></v-spacer>
          <v-btn :disabled="payRule" block width="100%" color="primary" @click="rechargeDialog=false">
            <v-img max-width="70px" max-length="110px" src="@/assets/paypal_name.png"></v-img>
          </v-btn>
          <v-btn :disabled="payRule" class="mt-3" block width="100%" color="orange" @click="rechargeDialog=false">
            <v-img class="mx-1" max-width="20px" max-length="30px" src="@/assets/kreditkarte.png"></v-img>
            Master Card
          </v-btn>
        <v-btn class="mt-3"  block width="100%" @click="rechargeDialog=false">
          Cancel
        </v-btn>
      </v-card>
    </v-dialog>
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
    },
    payRule() {
      return this.rechargeAmount === 0 || this.rechargeAmount === null || this.rechargeAmount === "" || this.rechargeAmount === "0"
    }
  },
  data: function () {
    return {
      rechargeAmount: null,
      rechargeDialog: false,
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
