<template>
  <v-card style="user-select: none;border-radius: 16px"
          color="white"
          elevation="0">
    <v-img :aspect-ratio="1" :src="orderInfo.imageUrl">
      <template #placeholder>
        <div style="width: 100%;height: 120px;"
             class="d-flex align-center justify-center">
          <v-progress-circular indeterminate/>
        </div>
      </template>
    </v-img>
    <div class="pa-2 px-4">
      <div class="text-caption">
        <span v-if="isBuy" class="success--text text--darken-3 font-weight-medium">Needed</span>
        <span v-else class="error--text text--darken-3 font-weight-medium">Provided</span>
        by
        <v-avatar size="16" class="ml-1">
          <v-img :src="'https://api.multiavatar.com/'+t.user_id+'.svg'"></v-img>
        </v-avatar>
      </div>
      <div class="mt-0">
        <div class="text-body-1 text-capitalize">
          {{ orderInfo.item_name }}
        </div>
      </div>
      <div class="d-flex align-center mt-2">
        <div class="mt-0 text-body-2 font-weight-medium">
          {{ t.price | priceDisplay }}
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex text-body-2 align-center">
          &times;
          {{ t.quantity }}
        </div>
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
