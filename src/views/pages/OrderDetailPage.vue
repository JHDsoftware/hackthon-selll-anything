<template>
  <div>
    <div class="px-6 py-4 pb-2 white" style="position: sticky;top: 0;">
      <page-title>
        帮带详情
        <template #backButton>
          <v-btn outlined style="border-radius: 8px" icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
        <template #subtitle>
          <div @click="copy(orderInfo.id)">
            #{{ orderInfo.id }}
            <v-icon class="ml-2" small>mdi-content-copy</v-icon>
          </div>

        </template>
      </page-title>
    </div>
    <div class="px-6">
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
            最初出发城市:
          </template>
          <template #value>
            {{ orderInfo.leavingCity }}
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
        <info-line>
          <template #default>
            最终到达城市:
          </template>
          <template #value>
            {{ orderInfo.arriveCity }}
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
            📋携带规则：
          </template>
          <template #append>
            <div>

              <template v-if="orderInfo.canTakeLuxury">
                ✅ 可以携带奢饰品
              </template>
              <template v-else>
                ❌ 不能携带奢饰品
              </template>

              <template v-if="orderInfo.canTakeMedicine">
                ✅ 可以携带药品
              </template>
              <template v-else>
                ❌ 不能携带药品
              </template>


            </div>
          </template>
        </info-line>
        <info-line>
          <template #default>
            📖补充说明：
          </template>
          <template #append>
            {{ orderInfo.appendInfo }}
          </template>
        </info-line>
        <info-line-subheader>
          联系信息
        </info-line-subheader>
        <template v-if="unlocked||isMyOrder">
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
            解锁后才可以查看全部信息
          </template>
          <template #value>

            <v-chip @click="confirmDialog=true" class="my-1" small color="yellow lighten-4">
              现在解锁享有30%折扣
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
      </div>
      <div class="pa-2 pb-8 white elevation-3"
           style="position: fixed;bottom: 0px;left: 0;right: 0;width: 100%">
        <v-btn v-if="isMyOrder" block large color="green lighten-4 black--text" elevation="0">
          <v-icon left>mdi-shield-lock-outline</v-icon>
          本条信息由我发布
        </v-btn>
        <v-btn v-else-if="!unlocked" large color="primary lighten-4 black--text" elevation="0"
               block
               @click="confirmDialog=true">
          <v-icon left>mdi-lock</v-icon>
          支付<span
            class="text-caption text-decoration-line-through">5.00 €</span>{{ informationFeeAmount | priceDisplay }}马上解锁
        </v-btn>
        <v-btn v-else-if="haveInsurance" block large color="green lighten-4 black--text" elevation="0">
          <v-icon left>mdi-shield-lock-outline</v-icon>
          已经购买了被税险！
        </v-btn>

        <v-btn v-else large color="green lighten-4 black--text" elevation="0"
               block
               @click="confirmDialog=true">
          <v-icon left>mdi-lock-open</v-icon>
          已经解锁, 购买被税险
        </v-btn>
      </div>
    </div>

    <v-bottom-sheet v-model="confirmDialog">
      <v-card class="pa-4 py-6 text-body-2">
        <template v-if="unlocked">
          <div class="text-subtitle-1 my-2 font-weight-bold d-flex align-center">
            启用被税补偿
            <v-spacer></v-spacer>
          </div>
          <div>支付{{ insuranceFeeAmount | priceDisplay }}欧，在通过海关时被税被查后，凭相关单据，获得最高500€/3500元被税补偿，
            *补偿以海关单据实际金额为准，最高补偿500€/3500元
          </div>
        </template>
        <template v-else>
          <div class="text-subtitle-1 font-weight-bold">5欧信息服务费包含：</div>
          <div class="mt-2">☑️个人信息验证</div>
          <div>☑️ 机票信息核实</div>
          <div>☑️ 帮带信息人工审核</div>
          <div class="text-subtitle-1 my-2 mt-8 font-weight-bold">️注意事项：</div>
          <div>️解锁联系后未达成一致，信息服务费不退款</div>
          <div>️不负责帮带过程中的问题责任</div>
          <div class="text-subtitle-1 my-2 mt-8 font-weight-bold">️被税补偿：
          </div>
          <div>️在协商后，可以回到帮带详情页面支付{{ insuranceFeeAmount|priceDisplay }}获得最高500€/3500元被税补偿</div>
        </template>


        <div class="mt-8" ref="paypal-button"></div>
        <v-card @click="toWechat"
                elevation="0" class="mt-4 pa-4" dark color="green darken-4">
          <div>
            其他支付方式
          </div>
          <div class="text-caption">
            点击这里复制🗄️人工客服微信号联系客服, 请将帮带ID发送给客服。
          </div>
        </v-card>


      </v-card>
    </v-bottom-sheet>
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
import PageTitle from "@/views/widgets/PageTitle.vue"
import InfoLine from "@/views/widgets/items/InfoLine.vue"
import InfoLineSubheader from "@/views/widgets/items/InfoLineSubheader.vue"
import {addPayment, getMyPayments} from "@/dataLayer/service/firebase/payment"
import LottieWebVueEsm from "lottie-web-vue"
import {loadScript} from "@paypal/paypal-js"
import {getCurrentUserId} from "@/dataLayer/service/firebase/user"
import {Toast} from "@/plugins/vuetify"

export default {
  components: {
    InfoLineSubheader,
    InfoLine,
    PageTitle,
    LottieWebVueEsm,
  },
  props: {
    orderInfo: {}
  },
  computed: {
    isMyOrder() {
      return this.orderInfo.userId === getCurrentUserId()
    },
    unlocked() {
      return this.myOrders.some(it => it.pickupOrderId === this.orderInfo.id)
    },
    haveInsurance() {
      return this.unlocked && this.myOrders.find(it => it.pickupOrderId === this.orderInfo.id)?.withInsurance
    },
    finalAmount() {
      return (this.unlocked ? this.insuranceFeeAmount : this.informationFeeAmount)
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
      finished: false,
      confirmDialog: false,
      informationFeeAmount: 3.5,
      insuranceFeeAmount: 5,
      useInsurance: false,
      paypal: null,
    }
  },
  watch: {
    finalAmount() {
      if (this.confirmDialog) {
        this.renderButton()
      }
    },
    confirmDialog(val) {
      if (val) {
        this.useInsurance = false
        this.$nextTick(() => {
          this.renderButton()
        })
      }
    }
  },
  methods: {
    async toWechat() {
      await this.copy('bangdaikefu')
      window.open('weixin://dl/chat?bangdaikefu')
    },
    async copy(text) {
      await navigator.clipboard.writeText(text)
      await Toast.fire({
        icon: "success",
        text: text + "已经复制到剪贴板"
      })
    },
    async sendOrder() {
      await addPayment(this.orderInfo.id)
      this.finished = true
      this.confirmDialog = false
      await this.refreshData()
    },
    async refreshData() {
      this.myOrders = await getMyPayments()
    },
    paymentOk() {
      this.sendOrder()
    },
    async renderButton() {
      this.$refs["paypal-button"].innerHTML = ""
      await this.paypal.Buttons({
        style: {
          color: 'gold',
          layout: 'horizontal'
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.finalAmount.toString()
                }
              }
            ]
          })
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(() => {
            this.paymentOk()
          })

        }
      }).render(this.$refs["paypal-button"])
    }
  },
  async mounted() {
    await this.refreshData()
    this.paypal = await loadScript({
      currency: "EUR",
      "client-id":
          "AccC0QXJfXebFGT9SdaBr9InnHj2o6UdyPuPolH4ghXbN0bpTIGrCbrTlN9yFlQEZFLiEn5yBlHhVMSb"
    })

  },
  name: "CheckOutPage"
}
</script>

<style scoped>

</style>
