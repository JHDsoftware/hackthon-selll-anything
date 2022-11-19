<template>
  <v-card style="user-select: none;border-radius: 16px"
          color="white"
          elevation="0">
    <v-img :aspect-ratio="1" src="https://random.imagecdn.app/500/500">
      <template #placeholder>
        <div style="width: 100%;height: 120px;"
             class="d-flex align-center justify-center">
          <v-progress-circular indeterminate/>
        </div>
      </template>
    </v-img>
    <div class="pa-2 px-4">
      <div class="text-caption">
        <span class="success--text text--darken-3 font-weight-medium">Sales</span>
        by
        <v-avatar size="16" class="ml-1">
          <v-img :src="'https://api.multiavatar.com/'+t+'.svg'"></v-img>
        </v-avatar>
      </div>
      <div class="mt-2">
        <div class="text-body-1">
          Real Thing with long name
        </div>
      </div>
      <div class="mt-1 font-weight-medium">
        {{ 123 | priceDisplay }}
      </div>
      <div class="text-caption mt-n1 d-flex align-center">
        <div>
          123 in stock
        </div>


        <v-spacer></v-spacer>
      </div>


    </div>
  </v-card>
</template>

<script>
export default {
  name: "OrderCard",
  props: {
    t: {}
  },
}
</script>

<style scoped>

</style>
