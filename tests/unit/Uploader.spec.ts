import { mount, shallowMount, VueWrapper } from '@vue/test-utils'
import Uploader from '@/components/Uploader.vue'
import axios from 'axios'
import flushPromises from 'flush-promises'
jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>
let wrapper: VueWrapper<any>
const testFile = new File(['lzx'], 'test.png', { type: 'image/png' })
const mockComponent = {
  template: '<div><slot></slot></div>'
}
const mockComponents = {
  DeleteOutlined: mockComponent,
  LoadingOutlined: mockComponent,
  FileOutlined: mockComponent
}
const setInputValue = (input: HTMLInputElement) => {
  const files = [testFile] as any
  Object.defineProperty(input, 'files', {
    value: files,
    writable: false
  })
}
describe('Uploader component', () => {
  beforeAll(() => {
    wrapper = shallowMount(Uploader, {
      props: {
        action: 'baidu.com',
        global: {
          stubs: mockComponents
        }
      }
    })
  })
  it('basic layout before uploading', async () => {
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.get('button').text()).toBe('点击上传')
    expect(wrapper.get('input').isVisible()).toBeFalsy()
  })
  it('upload process should works fine', async () => {
    mockAxios.post.mockResolvedValueOnce({ status: 'success' })
    const fileInput = wrapper.get('input').element as HTMLInputElement
    setInputValue(fileInput)
    await wrapper.get('input').trigger('change')
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(wrapper.get('button').text()).toBe('正在上传')
    // button disabled
    expect(wrapper.get('button').attributes()).toHaveProperty('disabled')
    // 列表长度修改，并且有正确的class
    expect(wrapper.findAll('li').length).toBe(1)
    const firstItem = wrapper.get('li:first-child')
    expect(firstItem.classes()).toContain('upload-loading')
    await flushPromises()
    expect(wrapper.get('button').text()).toBe('点击上传')
    expect(firstItem.classes()).toContain('upload-success')
    expect(firstItem.get('.filename').text()).toBe(testFile.name)
  })
  it('should return error text when post is rejected', async () => {
    mockAxios.post.mockRejectedValueOnce({ status: 'error' })
    await wrapper.get('input').trigger('change')
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(wrapper.get('button').text()).toBe('正在上传')
    await flushPromises()
    expect(wrapper.get('button').text()).toBe('点击上传')
    // 列表长度修改，并且有正确的class
    expect(wrapper.findAll('li').length).toBe(2)
    const lastItem = wrapper.get('li:last-child')
    expect(lastItem.classes()).toContain('upload-error')
    // 右侧删除按钮
    await lastItem.get('.delete-icon').trigger('click')
    expect(wrapper.findAll('li').length).toBe(1)
  })
  it('should show the correct interface when using custom slot', async () => {
    mockAxios.post.mockResolvedValueOnce({ data: { url: 'xx.url' } })
    mockAxios.post.mockResolvedValueOnce({ data: { url: 'yy.url' } })
    const wrapper = mount(Uploader, {
      props: {
        action: 'baidu.com'
      },
      slots: {
        default: '<button>Custom button</button>',
        loading: '<div class="loading">custom loading</div>',
        uploaded: `<template #uploaded="{ uploadedData }" >
          <div class="custom-loaded">{{uploadedData.url}}</div>
        </template>`
      },
      global: {
        stubs: mockComponents
      }
    })
    expect(wrapper.get('button').text()).toBe('Custom button')
    const fileInput = wrapper.get('input').element as HTMLInputElement
    setInputValue(fileInput)
    await wrapper.get('input').trigger('change')
    expect(wrapper.get('.loading').text()).toBe('custom loading')
    await flushPromises()
    expect(wrapper.get('.custom-loaded').text()).toBe('xx.url')
    await wrapper.get('input').trigger('change')
    expect(wrapper.get('.loading').text()).toBe('custom loading')
    await flushPromises()
    expect(wrapper.get('.custom-loaded').text()).toBe('yy.url')
  })
  it('before upload check', async () => {
    const callback = jest.fn()
    mockAxios.post.mockResolvedValueOnce({ data: { url: 'xx.url' } })
    const checkFileSize = (file: File) => {
      if (file.size > 2) {
        callback()
        return false
      }
      return true
    }
    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'baidu.com',
        beforeUpload: checkFileSize
      }
    })
    const fileInput = wrapper.get('input').element as HTMLInputElement
    setInputValue(fileInput)
    await wrapper.get('input').trigger('change')
    expect(mockAxios.post).not.toHaveBeenCalled()
    expect(wrapper.findAll('li').length).toBe(0)
  })
  it('before upload check using Promise', async () => {
    mockAxios.post.mockResolvedValueOnce({ data: { url: 'xx.url' } })
    const failedPromise = (file: File) => {
      return Promise.reject('wrong type')
    }
    const successPromise = (file: File) => {
      const newFile = new File(['lzxxxxx'], 'test1.png', { type: 'image/png' })
      return Promise.resolve(newFile)
    }
    const successPromiseWrongType = () => {
      return Promise.resolve('abch')
    }
    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'baidu.com',
        beforeUpload: failedPromise
      }
    })
    const fileInput = wrapper.get('input').element as HTMLInputElement
    setInputValue(fileInput)
    await wrapper.get('input').trigger('change')
    await flushPromises()
    expect(mockAxios.post).not.toHaveBeenCalled()
    expect(wrapper.findAll('li').length).toBe(0)
    // success promise with wrong type
    await wrapper.setProps({ beforeUpload: successPromiseWrongType })
    await wrapper.get('input').trigger('change')
    await flushPromises()
    expect(mockAxios.post).not.toHaveBeenCalled()
    expect(wrapper.findAll('li').length).toBe(0)
    // success promise with file
    await wrapper.setProps({ beforeUpload: successPromise })
    await wrapper.get('input').trigger('change')
    await flushPromises()
    expect(mockAxios.post).toHaveBeenCalled()
    const firstItem = wrapper.get('li:first-child')
    expect(firstItem.classes()).toContain('upload-success')
    expect(firstItem.get('.filename').text()).toBe('test1.png')
  })
  afterEach(() => {
    mockAxios.post.mockReset()
  })
})
