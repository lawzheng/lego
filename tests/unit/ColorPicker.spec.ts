import { mount, VueWrapper } from '@vue/test-utils'
import rgbHex from 'rgb-hex'
import ColorPicker from '@/components/ColorPicker.vue'
const defaultColors: string[] = ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', '']
let wrapper: VueWrapper<any>

describe('UserProfile component', () => {
  beforeAll(() => {
    wrapper = mount(ColorPicker, {
      props: {
        value: '#ffffff'
      }
    })
  })
  it('should render the correct interface', async () => {
    expect(wrapper.find('input').exists()).toBeTruthy()
    const input = wrapper.get('input').element
    expect(input.type).toBe('color')
    expect(input.value).toBe('#ffffff')

    expect(wrapper.findAll('.picker-color-list li').length).toBe(defaultColors.length)

    const firstItem = wrapper.get('li:first-child div').element as HTMLElement
    expect('#' + rgbHex(firstItem.style.backgroundColor)).toBe(defaultColors[0])

    const lastItem = wrapper.get('li:last-child div').element as HTMLElement
    expect(lastItem.classList.contains('transparent-back')).toBeTruthy()
  })
  it('should send the correct event when change input', async () => {
    const blackHex = '#000000'
    const input = wrapper.get('input')
    await input.setValue(blackHex)
    expect(wrapper.emitted()).toHaveProperty('change')
    const events = wrapper.emitted('change') || []
    expect(events[0]).toEqual([blackHex])
  })
  it('should send the correct event when clicking the color list', () => {
    const firstItem = wrapper.get('li:first-child div')
    firstItem.trigger('click')
    const events = wrapper.emitted('change') || []
    expect(events[1]).toEqual([defaultColors[0]])
  })
})
