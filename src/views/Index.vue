<template>
  <div class="homepage-container" v-if="withHeader">
    <a-layout>
      <a-layout-header class="header">
        <Header />
      </a-layout-header>
      <a-layout-content class="home-layout">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div> 
  <div class="homepage-container" v-else>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/Header.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Header
  },
  setup() {
    const route = useRoute()
    const withHeader = computed(() => route.meta.withHeader)
    return {
      withHeader
    }
  }
})
</script>

<style>
</style>
