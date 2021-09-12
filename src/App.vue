<template>
  <div class="app-container">
    <uploader action="xx" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Uploader from './components/Uploader.vue'
export default defineComponent({
  name: 'App',
  components: {
    Uploader
  }
})
</script>

<style>
</style>
