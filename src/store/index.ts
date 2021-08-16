import { createStore } from 'vuex'
import templates, { TemplatesProps } from './templates'
import user, { UserStateProps } from './user'
import editor, { EditorProps } from './editor'

export interface GlobalDataProps {
  user: UserStateProps;
  templates: TemplatesProps;
  editor: EditorProps;
}

const store = createStore<GlobalDataProps>({
  modules: {
    user,
    templates,
    editor
  }
})

export default store
