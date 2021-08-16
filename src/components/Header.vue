<template>
  <div class="page-title">
    <router-link to="/">
      <img
        alt="Vue logo"
        src="https://oss.imooc-lego.com/editor/img/logo2.cae6ad43.png"
        class="logo-img"
      />
    </router-link>
  </div>
  <user-profile/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserProfile from './UserProfile.vue'
export default defineComponent({
  name: 'Header',
  components: {
    UserProfile
  }
})
</script>

<style>
</style>
