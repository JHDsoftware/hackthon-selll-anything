<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img src="https://random.imagecdn.app/500/500"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-subtitle>
        <span class="text-caption mb-n1">
          Buy
        </span>
      </v-list-item-subtitle>
      <v-list-item-title class="mt-n1">
        Item Name
      </v-list-item-title>

      <v-list-item-subtitle>
        <strong class="success--text darken-2">&times; 50</strong>
        <span> @ {{ 15 | priceDisplay }}</span>
      </v-list-item-subtitle>

    </v-list-item-content>
    <slot></slot>
  </v-list-item>
</template>

<script>
export default {
  name: "OrderListItem",
  props: {
    item: {}
  }
}
</script>

<style scoped>

</style>
