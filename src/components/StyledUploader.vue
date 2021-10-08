<template>
  <uploader
    class="styled-uploader"
    action="ss"
    :showUploadList="false"
    :beforeUpload="commonUploadCheck"
    @success="(data) => {handleUploadSuccess(data.resp)}"
  >
    <div class="uploader-container">
      <FileOutlined />
      <h4>上传图片</h4>
    </div>
    <template #loading>
      <div class="uploader-container">
        <LoadingOutlined spin />
        <h4>上传中</h4>
      </div>
    </template>
    <template #uploaded>
      <div class="uploader-container">
        <FileImageOutlined />
        <h4>上传图片</h4>
      </div>
    </template>
  </uploader>
</template>

<script>
import Uploader from './Uploader.vue'
import { LoadingOutlined, FileOutlined, FileImageOutlined } from '@ant-design/icons-vue'
import { commonUploadCheck } from '../helper'
export default {
  name: 'StyledUploader',
  components: {
    Uploader,
    LoadingOutlined,
    FileOutlined,
    FileImageOutlined
  },
  emits: ['success'],
  setup (props, { emit }) {
    const handleUploadSuccess = (resp) => {
      emit('success', resp)
    }
    return {
      commonUploadCheck,
      handleUploadSuccess
    }
  }
}
</script>

<style lang="less">
.styled-uploader {
  .uploader-container {
    widows: 100px;
    height: 30px;
    color: #ffffff;
    background: #1890ff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .uploader-container:hover {
    background: #40a9ff;
  }
  .uploader-container h4 {
    color: #fff;
    margin-bottom: 0;
    margin-left: 10px;
  }
}
</style>
