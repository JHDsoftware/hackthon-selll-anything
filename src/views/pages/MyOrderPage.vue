<template>
  <div class="pa-4">
    <page-title>
      我的订单
      <template #backButton>
        <v-btn outlined style="border-radius: 8px" icon @click="goBackPage">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
    </page-title>
    <div class="mt-12">
      <div class="pa-1 rounded"
           style="display: grid;grid-template-columns: repeat(2,minmax(0,1fr));
           background: #f0f0f0">
        <v-card
            @click="tab=0"
            :color="tab===0?'success black--text lighten-2':'transparent'"
            :elevation="tab===0?1:0"
            class="pa-2 d-flex align-center text-caption justify-center"
        >
          我提交的
        </v-card>
        <v-card
            @click="tab=1"
            :color="tab===1?'success black--text lighten-2':'transparent'"
            :elevation="tab===1?1:0"
            class="pa-2 d-flex align-center text-caption justify-center"
        >
          我购买的
        </v-card>
      </div>
      <template v-if="tab===0">
        <div class="py-2">
          <div :key="t.id" v-for="t in submittedOrders">
            <v-card @click="openDetail(t)" elevation="0" color="grey lighten-4"
                    class="pa-4 text-body-2 mb-2">
              <order-general-display :t="t"/>
              <div class="mt-4 d-flex align-center">
                <v-btn elevation="0" color="primary lighten-4 black--text">
                  <v-icon left>mdi-cancel</v-icon>
                  已经没有空间/撤下广告
                </v-btn>
                <v-spacer></v-spacer>
              </div>
            </v-card>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="py-2">
          <div :key="t.id" v-for="t in purchasedOrders">
            <v-card elevation="0" color="grey lighten-4" class="pa-4 text-body-2 mb-2">
              <div class="d-flex">
                <div>
                  <div>{{ t.takeoffDate }}</div>
                  <div class="d-flex text-h6">
                    <div class="font-weight-bold">{{ t.takeoffCity }}</div>
                    <div class="mx-1">飞往</div>
                    <div class="font-weight-bold">{{ t.landingCity }}</div>
                  </div>
                </div>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </div>
              <div class="mt-4 text-body-2">
                <div>📑 文件： {{ t.filePrice | priceDisplay }}/份</div>
                <div>📦 小件物品： {{ t.smallPackagePrice | priceDisplay }}/kg</div>
                <div>🛍️ 其他信息</div>
                <div class="pl-6">{{ t.appendInfo }}</div>
                <div>📞 联系信息</div>
                <div class="pl-6">{{ t.contactInfo }}</div>
                <div v-if="t.authed">
                  ✅ 已实名认证/机票已经审核
                </div>
                <div v-else>
                  ⚠️ 正在等待审核
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </template>

    </div>
    <v-dialog
        max-width="400px"
    >
      <v-card elevation="0" class="pa-4">
        <div v-if="loading" style="height: 400px;" class="d-flex align-center justify-center">
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {getCurrentUserId} from "@/dataLayer/service/firebase/user"
import PageTitle from "@/views/widgets/PageTitle"
import {getMyOrders, getMyPurchasedOrders} from "@/dataLayer/service/firebase/pickupOrder"
import OrderGeneralDisplay from "@/views/widgets/items/OrderGeneralDisplay.vue"

export default {
  components: {OrderGeneralDisplay, PageTitle},
  name: "OrderListPage",
  computed: {},
  data: () => {
    return {
      tab: 0,
      userId: getCurrentUserId(),
      submittedOrders: [],
      purchasedOrders: [],
      loading: false,
    }
  },
  props: {
    show: {}
  },
  watch: {
    show(val) {
      if (val) {
        this.refreshData()
      }
    }
  },
  async mounted() {
    await this.refreshData()
  },
  methods: {
    openDetail(t) {
      this.$emit('open', t)
    },
    async refreshData() {
      this.purchasedOrders = await getMyPurchasedOrders()
      console.log(this.purchasedOrders)
      this.submittedOrders = await getMyOrders()
    },
    goBackPage() {
      this.$emit('close')
    }
  },
}
</script>

<style scoped>

</style>
