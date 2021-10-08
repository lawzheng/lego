import { message } from 'ant-design-vue'
interface CheckCondition {
  format?: string[]
  size?: number
}
type ErrorType = 'size' | 'format' | null
interface BeforeUploadCheck {
  passed: boolean
  error: ErrorType
}
export function beforeUploadCheck (file: File, condition: CheckCondition): BeforeUploadCheck {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  } else if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}

export const commonUploadCheck = (file: File): boolean => {
  const result = beforeUploadCheck(file, { format: ['image/png', 'image/jpeg'], size: 1 })
  const { passed, error } = result
  if (error === 'format') {
    message.error('上传图片只能是JPEG/PNG 格式！')
  }
  if (error === 'size') {
    message.error('上传图片大小不能超过 1MB')
  }
  return passed
}

export const getImageDimensions = (url: string | File): Promise<{width: number; height: number;}> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = typeof url === 'string' ? url : URL.createObjectURL(url)
    img.addEventListener('load', () => {
      const { naturalWidth: width, naturalHeight: height } = img
      resolve({
        width,
        height
      })
    })
    img.addEventListener('error', () => {
      reject(new Error('there was some problem with the image.'))
    })
  })
}
