import { Module } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { GlobalDataProps } from './index'
import { TextComponentProps, ImageComponentProps } from '../defaultProps'

export interface ComponentData {
  props: Partial<TextComponentProps & ImageComponentProps>;
  id: string;
  name: string;
}

export interface EditorProps {
  components: ComponentData[];
  currentElement: string
}

export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: 'l-text', props: { text: 'hello', fontSize: '20px', color: '#000000' } },
  { id: uuidv4(), name: 'l-text', props: { text: 'hello2', fontSize: '10px' } },
  { id: uuidv4(), name: 'l-text', props: { text: 'hello3', fontSize: '15px', actionType: 'url', url: 'https://www.baidu.com' } }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: ''
  },
  mutations: {
    addComponent (state, component: ComponentData) {
      state.components.push(component)
    },
    deleteComponent (state, id: string) {
      state.components = state.components.filter(component => component.id !== id)
    },
    setActive (state, currentId: string) {
      state.currentElement = currentId
    },
    updateComponent (state, { key, value }) {
      const updateComponent = state.components.find(component => component.id === state.currentElement)
      if (updateComponent) {
        updateComponent.props[key as keyof TextComponentProps] = value
      }
    }
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find((component) => component.id === state.currentElement)
    }
  }
}

export default editor
