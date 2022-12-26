<template>
  <div>
    <div style="display: grid;grid-template-columns: repeat(2,minmax(0,1fr));grid-gap: 8px">
      <div class="text-body-2">
        <div class="text-caption">
          出发行程
        </div>
        <div class="font-weight-black">{{ t.leavingCity }}->{{ t.takeoffCity }}</div>
      </div>
      <div class="text-body-2">
        <div class="text-caption">
          落地后行程
        </div>
        <div class="font-weight-black">{{ t.landingCity }}->{{t.arriveCity}}</div>
      </div>
    </div>
    <div class="mt-4 text-body-2">
      <div>
        <div >
          🛫 起飞时间: {{ takeoffDate }}
        </div>
      </div>
      <div class="mt-2">📑 文件： {{ t.filePrice | priceDisplay }}/份</div>
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
