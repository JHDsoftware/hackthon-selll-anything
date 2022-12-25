<template>
  <div>
    <div>

      <div class="d-flex text-h6">

        <div class="font-weight-black">{{ t.takeoffCity }}</div>
        <div class="mx-1">飞往</div>
        <div class="font-weight-black">{{ t.landingCity }}</div>
        <v-spacer></v-spacer>
        <div>{{ takeoffDate }}</div>
      </div>
    </div>
    <div class="mt-4 text-body-2">
      <div>🗺️ 出发/到达城市： {{ t.leavingCity }}/{{t.arriveCity}}</div>
      <div>📑 文件： {{ t.filePrice | priceDisplay }}/份</div>
      <div>📦 小件物品： {{ t.smallPackagePrice | priceDisplay }}/kg</div>
      <div>
        <template v-if="t.canTakeLuxury">
          ✅ 可以携带奢饰品
        </template>
        <template v-else>
          ❌ 不能携带奢饰品
        </template>
        <template v-if="t.canTakeMedicine">
          ✅ 可以携带药品
        </template>
        <template v-else>
          ❌ 不能携带药品
        </template>

      </div>
      <div class="mt-2">
        <div v-if="t.authed">
          ✅ 已实名认证/机票已经审核
        </div>
        <div v-else>
          ⚠️ 正在等待审核
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import dayjs from "dayjs"

export default {
  name: "OrderGeneralDisplay",
  computed: {
    takeoffDate() {
      return dayjs(this.t.takeoffDate).format('MMMDo')
    }
  },
  props: {
    t: {}
  },
}
</script>

<style scoped>

</style>
