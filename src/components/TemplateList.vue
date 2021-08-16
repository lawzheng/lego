<template>
  <div class="content-container">
    <div class="template-list-component">
      <a-row :gutter="16">
        <a-col :span="6" v-for="item in list" :key="item.id" class="poster-item">
          <!-- <router-link :to="`/template/${item.id}`"> -->
          <router-link :to="{ name: 'template', params: { id: item.id} }">
            <a-card hoverable>
              <template #cover>
                <img
                  :alt="item.title"
                  :src="item.coverImg"
                />
                <div class="hover-item">
                  <a-button size="large" type="primary">使用该模板创建</a-button>
                </div>
              </template>
              <a-card-meta :title="item.title">
                <template #description>
                  <div class="description-detail">
                    <span>作者：{{ item.author }}</span>
                    <span class="user-number">{{ item.copiedCount }}</span>
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </router-link>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TemplateProps } from '../store/templates'
export default defineComponent({
  name: 'TemplateList',
  props: {
    list: {
      type: Array as PropType<TemplateProps[]>,
      required: true
    }
  }
})
</script>

<style>
.tag-list {
    position: absolute;
    top: -4px;
    left: 6px
}

.poster-item .ant-card-cover {
    height: 390px
}

.poster-item .ant-card-cover>img {
    width: 100%
}

.poster-item .blur-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 15px
}

.blur-image>img {
    width: 70%;
    text-align: center;
    margin: 0 auto
}

.poster-item .ant-card-hoverable {
    box-shadow: 0 5px 10px 0 rgba(0,0,0,.1)
}

.poster-item .ant-card-body {
    padding: 0
}

.poster-item .ant-card-meta {
    margin: 0
}

.poster-item .ant-card-meta-title {
    color: #333;
    padding: 10px 12px;
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 0!important
}

.description-detail {
    display: flex;
    justify-content: space-between;
    padding: 13px 12px;
    color: #999
}

.user-number {
    font-weight: 700
}

.poster-title {
    height: 70px
}

.poster-title h2 {
    margin-bottom: 0
}

.poster-item .ant-card-cover {
    position: relative;
    overflow: hidden;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px
}

.poster-item .ant-card-cover img {
    transition: all .2s ease-in
}

.hover-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
    background: rgba(0,0,0,.8);
    align-items: center;
    justify-content: center;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px
}

.poster-item:hover .hover-item {
    display: flex
}

.poster-item:hover img {
    transform: scale(1.25)
}

.barcode-container img {
    border-radius: 0
}
</style>
