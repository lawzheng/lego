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
  <user-profile :user="user" />
</template>

<script lang="ts">
import UserProfile from './UserProfile.vue'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'

export default defineComponent({
  name: 'Header',
  components: {
    UserProfile
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user.user)
    return {
      user
    }
  }
})
</script>

<style>
</style>
