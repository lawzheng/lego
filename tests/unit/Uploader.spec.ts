import { mount, VueWrapper } from '@vue/test-utils'
import Uploader from '@/components/Uploader.vue'
let wrapper: VueWrapper<any>

describe('UserProfile component', () => {
  beforeAll(() => {
    wrapper = mount(Uploader, {
      props: {
        action: 'xx'
      }
    })
  })
  it('should render the correct interface', async () => {
  })
})
