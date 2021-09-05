import { mount, VueWrapper } from '@vue/test-utils'
import { message } from 'ant-design-vue'
import UserProfile from '@/components/UserProfile.vue'
import store from '@/store/index'
let wrapper: VueWrapper<any>
jest.mock('ant-design-vue', () => ({
  message: {
    success: jest.fn()
  }
}))
const mockRouters: string[] = []
jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: (url: string) => mockRouters.push(url)
  })
}))
const mockComponents = {
  template: '<div><slot></slot></div>'
}
const mockComponents2 = {
  template: '<div><slot></slot><slot name="overlay"></slot></div>'
}
const globalComponents = {
  'a-button': mockComponents,
  'a-dropdown-button': mockComponents2,
  'a-menu': mockComponents,
  'a-menu-item': mockComponents,
  'router-link': mockComponents
}

describe('UserProfile component', () => {
  beforeAll(() => {
    jest.useFakeTimers()
    wrapper = mount(UserProfile, {
      props: {
        user: { isLogin: false }
      },
      global: {
        components: globalComponents,
        provide: {
          store
        }
      }
    })
  })
  it('should render login button when login is false', async () => {
    expect(wrapper.get('div').text()).toBe('登录')
    await wrapper.get('div').trigger('click')
    expect(message.success).toHaveBeenCalled()
    expect(store.state.user.user.userName).toBe('viking')
  })
  it('should render username when login is true', async () => {
    await wrapper.setProps({
      user: {
        isLogin: true,
        userName: 'viking'
      }
    })
    expect(wrapper.get('.user-profile-component').html()).toContain('viking')
    expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy()
  })
  it('should call logout and show message, call router.push after timeout', async () => {
    await wrapper.get('.user-profile-dropdown div').trigger('click')
    expect(store.state.user.user.isLogin).toBeFalsy()
    expect(message.success).toHaveBeenCalledTimes(1)
    jest.runAllTimers()
    expect(mockRouters).toEqual(['/'])
  })
  afterEach(() => {
    (message as jest.Mocked<typeof message>).success.mockReset()
  })
})
