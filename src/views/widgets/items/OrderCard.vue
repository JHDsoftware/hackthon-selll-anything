<template>
  <v-card @click="$emit('click')" style="user-select: none;border-radius: 16px"
          color="white"
          elevation="0">
    <div class="pa-3 px-4">
      <div class="d-flex">
        <div class="text-caption">
          {{ takeOffDate }} 起飞
        </div>
      </div>
      <div class="mt-4 pr-6" style="display: grid;grid-template-columns: repeat(2,minmax(0,1fr));grid-gap: 36px">
        <div class="d-flex align-center">
          <v-icon class="mr-2" size="20">mdi-airplane-takeoff</v-icon>
          <div class="text-body-1 font-weight-black">{{ t.takeoffCity }}</div>
        </div>
        <div class="d-flex align-center">
          <v-icon class="mr-2" size="20">mdi-airplane-landing</v-icon>
          <div class="text-body-1 font-weight-black">{{ t.landingCity }}</div>
        </div>
      </div>
      <div class="mt-4 text-body-2">
        <div>📑 文件： {{ t.filePrice | priceDisplay }}/份</div>
        <div>📦 小件物品： {{ t.smallPackagePrice | priceDisplay }}/kg</div>
        <div>🛍️ 其他信息</div>
        <div class="pl-6">{{ t.appendInfo }}</div>
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


export default {
  name: "OrderCard",
  watch: {
    t(val) {
      console.log(val)
    }
  },
  computed: {
    takeOffDate() {
      return this.t.takeoffDate
    }
  },
  props: {
    t: {}
  },
}
</script>

<style scoped>

</style>
