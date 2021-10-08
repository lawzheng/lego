<template>
  <img
    :style="styleProps"
    class="l-image-component"
    @click.prevent="handleClick"
    :src="src"
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LImage',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  setup () {
    const styleProps = {}
    const handleClick = () => {}
    return {
      styleProps,
      handleClick
    }
  }
})
</script>

<style>

</style>
