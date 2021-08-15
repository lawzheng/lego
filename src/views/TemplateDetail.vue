<template>
  <a-layout style="padding: 24px 0px; background: rgb(255, 255, 255)">
    <a-layout-content style="padding: 0 50px">
      <div class="work-detail-container">
        <a-row type="flex" justify="center">
          <a-col :span="8" class="cover-img">
            <img
              src="https://static.imooc-lego.com/upload-files/screenshot-977815.png"
              alt=""
            />
          </a-col>
          <a-col :span="8">
            <h2>1024 程序员日</h2>
            <p>1024 程序员日</p>
            <div class="author">
              <span class="ant-avatar ant-avatar-circle ant-avatar-image" >
                <img src="http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f79389d4737571e2e1dc7cb.png" />
              </span>
              该模版由 <b>Miss.Lu</b> 创作
            </div>
            <div class="bar-code-area">
              <span>扫一扫，手机预览</span>
              <div title="https://h5.imooc-lego.com/p/290-576a" >
                <canvas width="120" height="120" style="display: none"></canvas>
                <img
                  alt="Scan me!"
                  style="display: block"
                  src="data:image/png;base64,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"
                />
              </div>
            </div>
            <div class="use-button">
              <router-link to="/editor">
                <a-button type="primary" shape="round" size="large">使用模版</a-button>
              </router-link>
              <a-button shape="round" style="margin-left: 20px" size="large">下载图片海报</a-button>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: "TemplateDetail",
  setup() {
    const route = useRoute()
    return {
      route
    }
  }
})
</script>

<style scoped>
.work-detail-container {
    margin-top: 50px
}

.cover-img {
    margin-right: 30px
}

.cover-img img {
    width: 100%
}

.use-button {
    margin: 30px 0
}

.ant-avatar {
    margin-right: 10px
}

.bar-code-area {
    margin: 20px 0
}

.file-input[data-v-166ffce4] {
    display: none
}

.uploader-container[data-v-f7972c8e] {
    text-align: center;
    padding: 10px;
    width: 100%;
    border: 2px dotted #efefef;
    color: #ccc;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    transition: all .25s ease-in-out;
    cursor: pointer
}

.uploader-container[data-v-f7972c8e]:hover {
    border: 2px dotted #1890ff;
    color: #1890ff
}

.uploader-container h4[data-v-f7972c8e] {
    color: #999;
    transition: all .25s ease-in-out
}

.uploader-container:hover h4[data-v-f7972c8e] {
    color: #1890ff
}

.uploader-container img[data-v-f7972c8e] {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover
}

.setting-container .file-upload-container {
    display: flex;
    justify-content: center
}

.setting-container .uploader-container {
    width: 200px!important;
    height: 200px!important;
    border-radius: 200px
}

.setting-container .uploader-container img {
    border-radius: 200px
}
</style>