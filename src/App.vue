<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: {
  }
})
</script>

<style lang="less">
.page-title {
  color: #fff;
}
// .file-upload .upload-area {
//   background: #efefef;
//   border: 1px dashed #ccc;
//   border-radius: 4px;
//   cursor: pointer;
//   padding: 20px;
//   width: 360px;
//   height: 180px;
//   text-align: center;
//   &:hover {
//     border: 1px dashed #1890ff;
//   }
//   &.is-dragover {
//     border: 2px dashed #1890ff;
//     background: rgba(#1890ff, .2);
//   }
// }
</style>
