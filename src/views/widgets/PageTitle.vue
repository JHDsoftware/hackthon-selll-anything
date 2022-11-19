<template>
  <div>
    <div class="text-h5 font-weight-black">
      <slot></slot>
    </div>
    <div class="text-body-1">
      <slot name="subtitle"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "PageTitle"
}
</script>

<style scoped>

</style>
