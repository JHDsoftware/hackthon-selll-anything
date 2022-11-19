<template>
  <v-btn elevation="0"
         @click="$emit('click')"
         height="52"
         :disabled="disabled"
         rounded
         color="primary lighten-4 black--text"
  >
    Next Step
    <v-icon right>mdi-arrow-right</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "NextStepButton",
  props: {
    disabled: {
      default: false
    }
  }
}
</script>

<style scoped>

</style>
