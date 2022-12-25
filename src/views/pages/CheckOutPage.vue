<template>
  <div class="pa-6">
    <page-title>
      帮带详情
      <template #backButton>
        <v-btn outlined style="border-radius: 8px" icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <template #subtitle>
        付费后查看全部详情
      </template>
    </page-title>
    <div class="mt-8 pb-16">
      <div class="font-weight-bold text-body-1 text-decoration-underline mb-6">
        行程信息
      </div>
      <info-line>
        <template #default>
          起飞日期:
        </template>
        <template #value>
          {{ orderInfo.takeoffDate }}
        </template>
      </info-line>
      <info-line>
        <template #default>
          起飞城市:
        </template>
        <template #value>
          {{ orderInfo.takeoffCity }}
        </template>
      </info-line>
      <info-line>
        <template #default>
          降落城市:
        </template>
        <template #value>
          {{ orderInfo.landingCity }}
        </template>
      </info-line>
      <info-line-subheader>
        价格信息
      </info-line-subheader>
      <info-line>
        <template #default>
          📑文件：
        </template>
        <template #value>
          {{ orderInfo.filePrice | priceDisplay }}/份
        </template>
      </info-line>
      <info-line>
        <template #default>
          📦小件物品：
        </template>
        <template #append>
          不满 1Kg 按照 1Kg计算
        </template>
        <template #value>
          {{ orderInfo.smallPackagePrice | priceDisplay }}/KG
        </template>
      </info-line>
      <info-line>
        <template #default>
          📦补充说明：
        </template>
        <template #append>
          {{ orderInfo.appendInfo }}
        </template>
      </info-line>
      <info-line-subheader>
        联系信息
      </info-line-subheader>
      <template v-if="unlocked">
        <info-line>
          <template #default>
            联系信息
          </template>
          <template #value>
            ✅已经解锁
          </template>
          <template #append>
            {{ orderInfo.contactInfo }}
          </template>
        </info-line>
      </template>
      <info-line v-else>
        <template #default>
          🔒尚未解锁
        </template>
        <template #append>
          如果需要使用其他支付方式，请联系人工客服开通
        </template>
        <template #value>

          <v-chip class="my-1" small color="yellow lighten-4">
            支付3.00€解锁
          </v-chip>
        </template>
      </info-line>
      <info-line-subheader>
        平台说明
      </info-line-subheader>
      <info-line>
        <template #default>
          关于信息的真实性
        </template>
        <template #append>
          我们根据用户提供的机票和个人有效证件照片检查信息的真实性，将要提供的联系信息均真实有效。所有显示出来的信息均已通过我们的审核。
        </template>
      </info-line>
      <info-line>
        <template #default>
          售后服务
        </template>
        <template #append>
          如果有任何疑问，可以通过微信联系我们的人工客服 Wechat：juhaodong2
        </template>
      </info-line>

    </div>
    <paypal v-if="!unlocked" style="position: fixed;bottom: 16px; width: 90vw; left :5vw"
            @payment-authorized="()=>sendOrder(true)"
            @payment-complete="()=>sendOrder(true)"
            currency="EUR"
            amount="3"
            locale="zh_CN"
            :client="paypalCredentials"
            :button-style="buttonStyle"></paypal>
    <v-dialog v-model="finished" max-width="400px">
      <v-card v-if="finished">
        <lottie-web-vue-esm
            :speed="0.5"
            @complete="finished=false"
            :animation-data="require('@/assets/unlock.json')"
        />
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import VuePaypalCheckoutEsm from "vue-paypal-checkout"
import PageTitle from "@/views/widgets/PageTitle.vue"
import InfoLine from "@/views/widgets/items/InfoLine.vue"
import InfoLineSubheader from "@/views/widgets/items/InfoLineSubheader.vue"
import {addPayment, getMyPayments} from "@/dataLayer/service/firebase/payment"
import LottieWebVueEsm from "lottie-web-vue"

export default {
  components: {
    InfoLineSubheader,
    InfoLine,
    PageTitle,
    Paypal: VuePaypalCheckoutEsm,
    LottieWebVueEsm,
  },
  props: {
    orderInfo: {}
  },
  computed: {
    unlocked() {
      return this.myOrders.some(it => it.pickupOrderId === this.orderInfo.id)
    }
  },
  data: function () {
    return {
      paypalCredentials: {
        sandbox: 'AbBmj6XYaYu5X42wLdIrUMYmBUWTknOO3ikhMA_OihWFBJe-D4g-AGEG-kho6ASwvEv4bNIF57XC1TeR',
        production: "AaaptlTEZvoBibZua_vmL5ZMdpi2pwgY5xHd4FfYk80LIas_TN97ViZFBpz50V_z_miJk3dOXbLerkez"
      },
      buttonStyle: {
        size: 'responsive'
      },
      myOrders: [],
      finished: false

    }
  },
  methods: {
    async sendOrder() {
      await addPayment(this.orderInfo.id)
      this.finished = true
      await this.refreshData()
    },
    async refreshData() {
      this.myOrders = await getMyPayments()
    }
  },
  mounted() {
    this.refreshData()
  },
  name: "CheckOutPage"
}
</script>

<style scoped>

</style>
