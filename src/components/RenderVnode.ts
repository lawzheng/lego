import { defineComponent } from 'vue'

const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [Object, String],
      requried: true
    }
  },
  render () {
    return this.vNode
  }
})

export default RenderVnode
