<template>
  <div class="pa-6
   d-flex align-center flex-column justify-center
   fill-height">
    <v-avatar size="80">
      <v-img :src="'https://api.multiavatar.com/'+userId+'.svg'"></v-img>
    </v-avatar>
    <div class="text-body-1 font-weight-bold mt-8">
      {{ userName || 'Guest' }}
    </div>
    <div class="text-caption">
      {{ userId }}
    </div>
    <div class="mt-8"
         style="display: grid;grid-gap:8px;grid-template-columns: repeat(3,minmax(0,1fr))">
      <v-card
          width="80" @click="showSolana"
          class="pa-2" elevation="0" color="#f6f6f6">
        <v-responsive :aspect-ratio="1">
          <div style="width: 100%;height: 100%" class="d-flex flex-column justify-center align-center">
            <v-icon>mdi-wallet</v-icon>
            <div class="d-flex mt-1">
              <div class="text-caption">
                {{ myWallet | priceDisplay }}
              </div>
            </div>
          </div>
        </v-responsive>
      </v-card>
      <v-card
          width="80"
          class="pa-2" elevation="0" color="#f6f6f6">
        <v-responsive :aspect-ratio="1">
          <div style="width: 100%;height: 100%"
               class="d-flex
               flex-column
                justify-center
                 align-center">
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
              max-width="400" min-height="450" v-model="rechargeDialog">
      <v-card class="px-5 py-12 d-flex align-center justify-center flex-column">
        <template v-if="success">
          <div class="text-body-1">
            Payment Success
          </div>
          <div class="text-body-2 mb-4">
            Redem your voucher NFT now!
          </div>
          <ambition-button contractaddress="6Ahjs5AkAHR11eQcd64xBRmX6CaSmXPaoB4uDxtxGKxq"></ambition-button>

        </template>
        <template v-else>
          <div style="width: 100%" class="d-flex align-center flex-column justify-center">
            <template v-if="success">
              <v-icon size="64">mdi-check</v-icon>
            </template>
            <template v-else>
              <div ref="solona"></div>
            </template>

          </div>

          <div class="mt-4 d-flex">

            <v-text-field
                v-model="rechargeAmount"
                placeholder="recharge price, e.g. 123.5"
                type="number" step="0.01" min="0"
                rounded filled>
              <template #append>
                <div class="mt-1">
                  Sol
                </div>
              </template>
            </v-text-field>
          </div>
          <v-btn icon elevation="0" class="mt-3" @click="rechargeDialog=false; rechargeAmount=''">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {getCurrentUser} from "@/dataLayer/service/firebase/user";
import {FireBaseAuth} from "@/plugins/google-fire-base";
import {connection, solana} from "@/plugins/Solana";
import {findReference} from "@solana/pay";
import 'solana-wallets-vue-2/styles.css'

export default {
  name: "MyPage",
  computed: {
    userId() {
      return this.user.uid
    },
    userName() {
      return this.user.isAnonymous ? 'Guest' : this.user.displayName
    },
    walletReady() {
      return this.$refs?.wallet?.walletStore?.connected
    }
  },
  watch: {
    rechargeAmount() {
      this.refreshQrCode()
    },
  },
  data: function () {
    return {
      myWallet: 1000,
      initialed: false,
      rechargeAmount: null,
      rechargeDialog: false,
      user: getCurrentUser(),
      nftList: [],
      success: false,
      store: null,
    };
  },
  methods: {
    async createNFT() {
      const store = this.$refs.wallet.walletStore
      if (!store.connected) {
        await store.connect()
      }
      this.store = store

    },
    async refreshNftList() {
      this.nftList = []
    },
    async refreshQrCode() {
      this.$nextTick(async () => {
        if (this.$refs.solona) {
          this.$refs.solona.innerHTML = ''
          this.success = false
          const res = await solana(this.rechargeAmount ?? 0.001, this.$refs.solona)
          let success = false
          let count = 0
          while (count < 5) {

            await new Promise(r => setTimeout(r, 5000))
            count++
            try {
              await findReference(connection, res, {finality: 'confirmed'})
              success = true
            } catch (e) {
              console.log(e)
            }

          }
          if (success) {
            this.success = true
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://cdn.jsdelivr.net/gh/ambition-so/embed-prod-build@main/bundle.v1.1.3.js";

            const script2 = document.createElement("script");
            script2.type = "text/javascript";
            script2.src = "https://cdn.tailwindcss.com";

            document.head.append(script);
            document.head.append(script2);
          } else {
            return
          }


        }


      })
    },
    async showSolana() {
      this.rechargeDialog = true
      this.refreshQrCode()

    },
    updateMyWallet() {
      this.myWallet += parseFloat(this.rechargeAmount)
      localStorage.setItem("wallet", this.myWallet)
      this.rechargeAmount = ''
      this.rechargeDialog = false
    },
    logout() {
      FireBaseAuth.signOut()
      this.$router.push('/login')
    },
    saveUserInfo() {
      this.$emit('close')
    },
  },
  mounted() {
    localStorage.getItem("wallet") ?
        this.myWallet = parseFloat(localStorage.getItem("wallet")) : this.myWallet = 1000

  }
}
</script>

<style scoped>

</style>
