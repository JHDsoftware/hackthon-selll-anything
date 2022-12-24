<template>
  <v-card @click="$emit('click')" style="user-select: none;border-radius: 16px"
          color="white"
          elevation="0">
    <div class="pa-3 px-4">
      <div class="d-flex">
        <div class="text-caption">
          起飞日期: 2022/12/24
        </div>
      </div>
      <div class="mt-4 pr-6" style="display: grid;grid-template-columns: repeat(2,minmax(0,1fr));grid-gap: 36px">
        <div class="d-flex align-center">
          <v-icon class="mr-2" size="20">mdi-airplane-takeoff</v-icon>
          <div class="text-body-1 font-weight-black">上海</div>
        </div>
        <div class="d-flex align-center">
          <v-icon class="mr-2" size="20">mdi-airplane-landing</v-icon>
          <div class="text-body-1 font-weight-black">法兰克福</div>
        </div>
      </div>
      <div class="mt-4 text-body-2">
        <div>📑 文件： 10欧/份</div>
        <div>📦 小件物品： 25欧/kg</div>
        <div>🛍️ 奢饰品: 另议</div>
        <div>
          ✅ 已实名认证/机票已经审核
        </div>
      </div>
      <div class="mt-4 d-flex align-center">
        <v-btn elevation="0" color="primary lighten-4 black--text">
          <v-icon left>mdi-phone</v-icon>
          一键付费联系
        </v-btn>
        <v-spacer></v-spacer>
        <v-icon color="grey lighten-2">mdi-information-outline</v-icon>
      </div>

    </div>

  </v-card>
</template>

<script>
import {getOneItem} from "@/dataLayer/service/firebase/item";

export default {
  name: "OrderCard",
  data: () => {
    return {
      orderInfo: ''
    }
  },
  computed: {
    isBuy() {
      return this.t.side === 'buy'
    }
  },
  props: {
    t: {}
  },
  async mounted() {
    this.orderInfo = await getOneItem(this.t.item_id)
  }
}
</script>

<style scoped>

</style>
