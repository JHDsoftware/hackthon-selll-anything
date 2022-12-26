<template>
  <v-card  style="user-select: none;border-radius: 16px"
          elevation="0">
    <div @click="$emit('click')" class="py-4 px-3">
      <order-general-display :t="t"/>
      <div class="mt-4 d-flex align-center">
        <v-btn elevation="0" dark>
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




import OrderGeneralDisplay from "@/views/widgets/items/OrderGeneralDisplay.vue"

export default {
  name: "OrderCard",
  components: {OrderGeneralDisplay},
  props: {
    t: {}
  },
}
</script>

<style scoped>

</style>
