<template>
  <div class="file-upload">
    <div class="upload-area"
      :class="{ 'is-dragover': drag && isDragOver }"
      v-on="events"
    >
      <slot v-if="isUploading" name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot v-else-if="lastFileData && lastFileData.loaded" name="uploaded" :uploadedData="lastFileData.data">
        <button>点击上传</button>
      </slot>
      <slot v-else name="default">
        <button>点击上传</button>
      </slot>
    </div>
    <input
      ref="fileInput"
      type="file"
      :style="{display: 'none'}"
      @change="handleFileChange"
    >
    <ul>
      <li :class="`upload-file upload-${file.status}`"
        v-for="file in fileList"
        :key="file.uid"
      >
        <span class="filename">{{file.name}}</span>
        <button class="delete-icon" @click="removeFile(file.uid)">del</button>
        <DeleteOutlined />
        <LoadingOutlined />
        <FileOutlined />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from 'vue'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { DeleteOutlined, LoadingOutlined, FileOutlined } from '@ant-design/icons-vue'
import { last } from 'lodash-es'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckUplaod = (file: File) => boolean | Promise<File>
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
  resp?: any;
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
    },
    beforeUpload: {
      type: Function as PropType<CheckUplaod>
    },
    drag: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const fileList = ref<UploadFile[]>([])
    const isDragOver = ref<boolean>(false)
    const isUploading = computed(() => {
      return fileList.value.some(item => item.status === 'loading')
    })
    const lastFileData = computed(() => {
      const lastFile = last(fileList.value)
      if (lastFile) {
        return {
          loaded: lastFile.status === 'success',
          data: lastFile.resp
        }
      }
      return false
    })
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const removeFile = (uid: string) => {
      fileList.value = fileList.value.filter(file => file.uid !== uid)
    }

    const postFile = (readyFile: UploadFile) => {
      const formData = new FormData()
      formData.append(readyFile.name, readyFile.raw)
      readyFile.status = 'loading'
      axios.post(props.action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(resp => {
        console.log(resp.data)
        readyFile.status = 'success'
        readyFile.resp = resp.data
      }).catch(() => {
        readyFile.status = 'error'
      }).finally(() => {
        if (fileInput.value) {
          fileInput.value.value = ''
        }
      })
    }

    const addFileToList = (uploadFile: File) => {
      const fileObj = reactive<UploadFile>({
        uid: uuidv4(),
        size: uploadFile.size,
        name: uploadFile.name,
        status: 'ready',
        raw: uploadFile
      })
      fileList.value.push(fileObj)
      if (props.autoUpload) {
        postFile(fileObj)
      }
    }

    const beforeUploadCheck = (files: FileList | null) => {
      if (files) {
        const uploadFile = files[0]
        if (props.beforeUpload) {
          const result = props.beforeUpload(uploadFile)
          if (result && result instanceof Promise) {
            result.then(processedFile => {
              if (processedFile instanceof File) {
                addFileToList(processedFile)
              } else {
                throw new Error('beforeUpload Promise should return File object')
              }
            }).catch(e => {
              console.error(e)
            })
          } else if (result === true) {
            addFileToList(uploadFile)
          }
        } else {
          addFileToList(uploadFile)
        }
      }
    }

    const uploadFiles = () => {
      fileList.value.filter(file => file.status === 'ready').forEach(readyFile => postFile(readyFile))
    }

    let events: { [key: string]: (e: any) => void } = {
      click: triggerUpload
    }

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      beforeUploadCheck(target.files)
    }

    const handleDrag = (e: DragEvent, over: boolean) => {
      e.preventDefault()
      isDragOver.value = over
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      isDragOver.value = false
      if (e.dataTransfer) {
        beforeUploadCheck(e.dataTransfer.files)
      }
    }

    if (props.drag) {
      events = {
        ...events,
        dragover: (e: DragEvent) => { handleDrag(e, true) },
        dragleave: (e: DragEvent) => { handleDrag(e, false) },
        drop: handleDrop
      }
    }

    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
      isUploading,
      fileList,
      removeFile,
      lastFileData,
      isDragOver,
      events,
      uploadFiles
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
