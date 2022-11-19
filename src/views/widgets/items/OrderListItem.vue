<template>
  <v-card style="user-select: none;border-radius: 16px"
          color="white"
          elevation="0">
    <v-list three-line>
      <template v-for="item in items">

        <v-list-item
            :key="item.title"
        >
            <v-avatar >
              <v-img :src="item.avatar"></v-img>
            </v-avatar>
            <v-icon v-if="!item.isSold" >mdi-arrow-right-bold-outline</v-icon>
            <v-icon v-else >mdi-arrow-left-bold-outline</v-icon>
            <v-avatar >
              <v-img :src="item.tradeAvatar"></v-img>
            </v-avatar>

          <v-list-item-content class="ml-3">
            <span class="grey--text text--lighten-1">{{item.timestamp}}</span>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <h2 class="my-2">{{item.price | priceDisplay}}</h2>


            <v-list-item-subtitle>
              <span class="text--primary">Desc&mdash;</span>
              <span v-html="item.subtitle"></span>
            </v-list-item-subtitle>
          </v-list-item-content>


          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "OrderListItem",
  mounted() {
    console.log(this.items)
  },
  props: {
    items: undefined
  }
}
</script>

<style scoped>

</style>