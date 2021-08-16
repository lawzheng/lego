import { Module } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { GlobalDataProps } from './index'

interface ComponentData {
  props: { [key : string]: any };
  id: string;
  name: string;
}

export interface EditorProps {
  components: ComponentData[];
  currentElement: string
}

export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: 'l-text', props: { text: 'hello', fontSize: '20px', color: 'red' } },
  { id: uuidv4(), name: 'l-text', props: { text: 'hello2', fontSize: '10px' } },
  { id: uuidv4(), name: 'l-text', props: { text: 'hello3', fontSize: '15px', actionType: 'url', url: 'https://www.baidu.com' } }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: ''
  },
  mutations: {
    addComponent (state, props) {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: 'l-text',
        props
      }
      state.components.push(newComponent)
    }
  }
}

export default editor
