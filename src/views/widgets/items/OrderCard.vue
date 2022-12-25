<template>
  <v-card @click="$emit('click')" style="user-select: none;border-radius: 16px"
          color="white"
          elevation="0">
    <div class="pa-3 px-4">
      <order-general-display :t="t"/>
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
