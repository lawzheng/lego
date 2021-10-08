<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <l-text
        v-bind="item"
      />
    </div>
    <styled-uploader @success="onImageUploaded"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { message } from 'ant-design-vue'
import { ComponentData } from '../store/editor'
import { imageDefaultProps, TextComponentProps } from '../defaultProps'
import { UploadResp } from '../extraType'
import LText from './LText.vue'
import StyledUploader from '../components/StyledUploader.vue'
import { getImageDimensions } from '../helper'
export default defineComponent({
  name: 'components-list',
  components: {
    LText,
    StyledUploader
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  emits: ['on-item-click'],
  setup (props, context) {
    const onItemClick = (props: TextComponentProps) => {
      const componentData: ComponentData = {
        id: uuidv4(),
        name: 'l-text',
        props
      }
      context.emit('on-item-click', componentData)
    }
    const onImageUploaded = (resp: UploadResp) => {
      const componentData: ComponentData = {
        id: uuidv4(),
        name: 'l-image',
        props: {
          ...imageDefaultProps
        }
      }
      message.success('上传成功')
      componentData.props.src = resp.data.url
      getImageDimensions(resp.data.url).then(({ width }) => {
        console.log(width)
        const maxWidth = 373
        componentData.props.width = String((width > maxWidth) ? maxWidth : width)
        context.emit('on-item-click', componentData)
      })
    }
    return {
      onItemClick,
      onImageUploaded
    }
  }
})
</script>

<style>
.component-item {
  margin-bottom: 10px;
}
</style>
