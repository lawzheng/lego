import store from '@/store'
import { testData } from '@/store/templates'
import { testComponents } from '@/store/editor'
import { TextComponentProps } from '@/defaultProps'
import { clone, last } from 'lodash'

const cloneComponents = clone(testComponents)

describe('test vuex store', () => {
  it('should have three modules', () => {
    expect(store.state).toHaveProperty('user')
    expect(store.state).toHaveProperty('templates')
    expect(store.state).toHaveProperty('editor')
  })
  describe('test user module', () => {
    it('test login mutation', () => {
      store.commit('login')
      expect(store.state.user.user.isLogin).toBeTruthy()
    })
    it('test logout mutation', () => {
      store.commit('logout')
      expect(store.state.user.user.isLogin).toBeFalsy()
    })
  })
  describe('test template module', () => {
    it('should have default templates', () => {
      expect(store.state.templates.data).toHaveLength(testData.length)
    })
    it('should get correct template by Id', () => {
      const selectTemplate = store.getters.getTemplateById(1)
      expect(selectTemplate.title).toBe('前端架构师直播海报1')
    })
  })
  describe('test editor module', () => {
    it('should have default components', () => {
      expect(store.state.editor.components).toHaveLength(testComponents.length)
    })
    it('should get current component when set active one component', () => {
      store.commit('setActive', testComponents[0].id)
      expect(store.state.editor.currentElement).toBe(testComponents[0].id)
      expect(store.getters.getCurrentElement.id).toBe(testComponents[0].id)
    })
    it('add component should work fine', () => {
      const component: Partial<TextComponentProps> = {
        text: 'haha'
      }
      store.commit('addComponent', component)
      expect(store.state.editor.components).toHaveLength(cloneComponents.length + 1)
      const lastItem = last(store.state.editor.components)
      expect(lastItem?.props.text).toBe('haha')
    })
    it('update component should work fine', () => {
      const newProps = {
        key: 'text',
        value: 'update'
      }
      store.commit('updateComponent', newProps)
      expect(store.getters.getCurrentElement?.props.text).toBe('update')
    })
  })
})
