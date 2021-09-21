<template>
  <div class="file-upload">
    <button @click="triggerUpload" :disabled="isUploading">
      <span v-if="isUploading">正在上传</span>
      <span v-else>点击上传</span>
    </button>
    <input
      ref="fileInput"
      type="file"
      :style="{display: 'none'}"
      @change="handleFileChange"
    >
    <ul>
      <li :class="`upload-file upload-${file.status}`"
        v-for="file in uploadFiles"
        :key="file.uid"
      >
        <span class="filename">{{file.name}}</span>
        <button class="delete-icon" @click="removeFile(file.uid)">del</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { DeleteOutlined, LoadingOutlined, FileOutlined } from '@ant-design/icons-vue'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
export interface UploadFile {
  uid: string,
  size: number,
  name: string,
  status: UploadStatus,
  raw: File
}
export default defineComponent({
  name: 'Uploader',
  components: {
    DeleteOutlined,
    LoadingOutlined,
    FileOutlined
  },
  props: {
    action: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadFiles = ref<UploadFile[]>([])
    const isUploading = computed(() => {
      return uploadFiles.value.some(item => item.status === 'loading')
    })
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const removeFile = (uid: string) => {
      uploadFiles.value = uploadFiles.value.filter(file => file.uid !== uid)
    }

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadFile = files[0]
        const formData = new FormData()
        formData.append(uploadFile.name, uploadFile)
        const fileObj = reactive<UploadFile>({
          uid: uuidv4(),
          size: uploadFile.size,
          name: uploadFile.name,
          status: 'loading',
          raw: uploadFile
        })
        uploadFiles.value.push(fileObj)
        fileStatus.value = 'loading'
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(resp => {
          console.log(resp.data)
          fileObj.status = 'success'
        }).catch(() => {
          fileObj.status = 'error'
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }

    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
      isUploading,
      uploadFiles,
      removeFile
    }
  }
})
</script>

<style>
.upload-loading {
  color: yellow;
}
.upload-success {
  color: green;
}
.upload-error {
  color: red;
}
</style>
