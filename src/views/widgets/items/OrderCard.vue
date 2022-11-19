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
        is
        <span v-if="t.side === 'buy'" class="success--text text--darken-3 font-weight-medium">Needed</span>
        <span v-else class="error--text text--darken-3 font-weight-medium">Provided</span>
        by
        <v-avatar size="16" class="ml-1">
          <v-img :src="'https://api.multiavatar.com/'+t.user_id+'.svg'"></v-img>
        </v-avatar>
      </div>
      <div class="mt-2">
        <div class="text-body-1">
          {{orderInfo.item_name}}
        </div>
      </div>
      <div class="mt-1 font-weight-medium">
        {{ t.price | priceDisplay }}
      </div>
      <div class="text-caption mt-n1 d-flex align-center">
        <div>
          {{t.quantity}} in stock
        </div>


        <v-spacer></v-spacer>
      </div>


    </div>
  </v-card>
</template>

<script>
import {getOneItem} from "@/dataLayer/service/firebase/item";

export default {
  name: "OrderCard",
  data: ()=> {
    return {
      orderInfo: ''
    }
  },
  props: {
    t: {}
  },
  async mounted() {
    this.orderInfo = await getOneItem(this.t.item_id)
    console.log(this.t, "t")
    console.log(this.orderInfo, "t")
  }
}
</script>

<style scoped>

</style>
