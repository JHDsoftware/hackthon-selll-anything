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
          <wallet-multi-button ref="wallet" :wallets="wallets" auto-connect/>
          <v-btn class="mt-4" elevation="0" @click="createNFT"
          >Redem Now
          </v-btn>
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
import {connection, metaplex, solana} from "@/plugins/Solana";
import {v4 as uuidv4} from 'uuid';
import {findReference} from "@solana/pay";
import 'solana-wallets-vue-2/styles.css'
import {WalletMultiButton} from "solana-wallets-vue-2/src/library";
import {
  CoinbaseWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";
import {bundlrStorage, keypairIdentity, Metaplex} from "@metaplex-foundation/js";

export default {
  components: {
    WalletMultiButton
  },
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
      wallets: [
        new CoinbaseWalletAdapter(),
        new PhantomWalletAdapter(),
        new GlowWalletAdapter(),
        new SlopeWalletAdapter(),
        new TorusWalletAdapter(),
      ],
      rechargeAmount: null,
      rechargeDialog: false,
      user: getCurrentUser(),
      nftList: [],
      success: true,
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

      const owner = store?.publicKey
      const metaplex = Metaplex.make(connection)
          .use(keypairIdentity(owner))
          .use(bundlrStorage());
      const {uri} = await metaplex.nfts().uploadMetadata({
        name: "TradeAny Coupon",
        description: "A very good Coupon which can save 0.005 SOL",
        image: "https://random.imagecdn.app/500/500",
      });
      const res = await metaplex.nfts().create({
        uri,
        name: "TAC#" + uuidv4(),
        tokenOwner: owner
      })
      console.log(res)
      this.refreshNftList()
    },
    async refreshNftList() {
      this.nftList = await metaplex.nfts().findAllByOwner({
        owner: this.$refs.wallet.walletStore?.publicKey
      });
    },
    async refreshQrCode() {
      this.$nextTick(async () => {
        if (this.$refs.solona) {
          this.$refs.solona.innerHTML = ''
          this.success = false
          const res = await solana(this.rechargeAmount ?? 0.001, this.$refs.solona)
          await findReference(connection, res, {finality: 'confirmed'})
          this.success = true

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
    localStorage.getItem("wallet") ? this.myWallet = parseFloat(localStorage.getItem("wallet")) : this.myWallet = 1000
  }
}
</script>

<style scoped>

</style>
