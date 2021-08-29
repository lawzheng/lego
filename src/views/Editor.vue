<template>
  <a-layout class="editor" id="editor-layout-main">
    <a-layout-header class="header">
      <Header />
    </a-layout-header>
  </a-layout>
  <a-layout>
    <a-layout-sider width="300" style="background: yellow">
      <div class="sidebar-container">
        <component-list :list="defaultTextTemplates" @on-item-click="addItem"/>
      </div>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-layout-content class="preview-container">
        <p>画布区域</p>
        <div class="preview-list" id="canvas-area">
          <editor-wrapper
            v-for="component in components"
            :key="component.id"
            :id="component.id"
            :active="component.id === (currentElement && currentElement.id)"
            @set-active="setActive"
          >
            <component
              :is="component.name"
              v-bind="component.props"
            />
            <span class="component-delete" @click="deleteItem(component.id)">x</span>
          </editor-wrapper>
        </div>
      </a-layout-content>
    </a-layout>
    <a-layout-sider width="300" style="background: #fff">
      <div class="sidebar-container">
        组件属性
        <props-table
          v-if="currentElement && currentElement.props"
          :props="currentElement.props"
          @change="handleChange"
        >

        </props-table>
      </div>
    </a-layout-sider>
  </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'
import Header from '../components/Header.vue'
import LText from '../components/LText.vue'
import ComponentList from '../components/ComponentList.vue'
import EditorWrapper from '../components/EditorWrapper.vue'
import PropsTable from '../components/PropsTable.vue'
import { defaultTextTemplates } from '../defaultTemplates'
import { ComponentData } from '../store/editor'
export default defineComponent({
  name: 'Home',
  components: {
    Header,
    LText,
    ComponentList,
    EditorWrapper,
    PropsTable
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const components = computed(() => store.state.editor.components)
    const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement)
    const addItem = (props: any) => {
      store.commit('addComponent', props)
    }
    const deleteItem = (id: string) => {
      store.commit('deleteComponent', id)
    }
    const setActive = (id: string) => {
      store.commit('setActive', id)
    }
    const handleChange = (e: any) => {
      store.commit('updateComponent', e)
    }
    return {
      components,
      defaultTextTemplates,
      addItem,
      deleteItem,
      setActive,
      currentElement,
      handleChange
    }
  }
})
</script>

<style scoped>
.publish-form-container .file-upload-container {
  height: 130px;
}

.publish-form-container .ant-form-item-label {
  text-align: left;
}

#preview-barcode-container {
  border: 2px dotted #efefef;
  padding: 10px;
}

.left-col img {
  width: 80%;
}

.right-col img {
  width: 80px;
}

.left-gap {
  padding-left: 5px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.delete-area {
  position: absolute;
  top: 10px;
  right: 20px;
}

.channel-item {
  padding: 10px 0;
  border-bottom: 1px solid #efefef;
}

.barcode-container {
  height: 80px;
  width: 80px;
}

.template-submit {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.history-area {
  position: absolute;
  right: 0;
}

.operation-list {
  display: flex;
}

.shortcut-list {
  list-style-type: none;
  padding: 0;
  width: 300px;
  margin: 0 auto;
}

.shortcut-list-item {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.shortcut-list .text {
  color: rgba(0, 0, 0, 0.45);
}

.operation-list button {
  margin-left: 10px;
}

.history-area .bold {
  font-weight: 700;
}

.shortcut-list .bold {
  color: #1890ff;
}

.component-wrapper {
  width: 100px;
  position: relative;
  display: flex;
  align-items: center;
}

.tip-text {
  position: absolute;
  text-align: center;
  top: 50%;
  width: 100%;
  margin-top: -10px;
}

.inside-component {
  width: 100px !important;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  width: 220px;
  margin: 20px auto;
}

.image-list img {
  max-height: 150px;
  -o-object-fit: contain;
  object-fit: contain;
}

.item-image {
  margin-right: 10px;
}

.component-item {
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
}

.create-component-list .uploader-container {
  padding: 10px;
  color: #fff;
  background: #1890ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.create-component-list .uploader-container:hover {
  background: #40a9ff;
}

.create-component-list .uploader-container h4 {
  color: #fff;
  margin-bottom: 0;
  margin-left: 10px;
}

.create-component-list .ant-tabs-tab {
  margin: 0;
}

.menu-container {
  display: none;
  position: absolute;
  background: #fff;
  z-index: 2000;
}

.menu-container .ant-menu-item {
  display: flex;
  justify-content: space-between;
}

.menu-container .ant-menu-item:hover {
  background: #efefef;
}

.ant-menu-item .item-shortcut {
  color: #ccc;
}

.lego-color-picker {
  display: flex;
}

.native-color-container {
  width: 40%;
}

.native-color-container input[type="color"] {
  width: 100%;
  cursor: pointer;
  height: 50px;
  border: 0;
  padding: 0;
  background-color: transparent;
}

.picked-color-list {
  padding: 0 0 0 5px;
  margin: 0;
  width: 60%;
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
  justify-content: space-between;
}

.picked-color-list li {
  flex: 1;
  width: 20%;
  min-width: 20%;
  max-width: 20%;
}

.color-item {
  padding: 3px;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
  border: 1px solid #ccc;
}

/* .transparnet-back {
    background: url(../img/transparent.f810f416.png) no-repeat
} */

.shadow-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.shadow-item span {
  width: 28%;
}

.shadow-component {
  width: 70%;
}

.image-processer {
  display: flex;
  justify-content: space-between;
}

.image-preview {
  width: 150px;
  height: 84px;
  border: 1px dashed #e6ebed;
  background: no-repeat 50% / contain;
}

.image-preview.extraHeight {
  height: 110px;
}

.image-cropper img {
  display: block;
  max-width: 100%;
}

.image-process {
  padding: 5px 0;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.delete-uploaded {
  margin-top: 10px;
  display: block;
}

.hide-item {
  display: none;
}

.prop-item.no-text {
  display: inline-block;
  margin: 0 10px 0 0;
}

#item-fontWeight {
  margin-left: 28%;
}

.component-a-select .ant-select {
  width: 150px;
}

.prop-component.component-background-processer,
.prop-component.component-image-processer,
.prop-component.component-shadow-picker {
  width: 100%;
}

#item-backgroundImage {
  width: 100%;
  cursor: pointer;
  margin-bottom: 15px;
}

#item-backgroundImage .styled-upload-component .uploader-container {
  min-height: 200px;
}

.inline-edit {
  cursor: pointer;
}

.input-error {
  border: 1px solid #f5222d;
}

.input-error:focus {
  border-color: #f5222d;
}

.input-error::-moz-placeholder {
  color: #f5222d;
}

.input-error:-ms-input-placeholder {
  color: #f5222d;
}

.input-error::placeholder {
  color: #f5222d;
}

.ant-list-item {
  padding: 10px 15px;
  transition: all 0.5s ease-out;
  cursor: pointer;
  justify-content: normal;
  border: 1px solid #fff;
  border-bottom-color: #f0f0f0;
}

.ant-list-item .handle {
  cursor: move;
  margin-left: auto;
}

.ant-list-item.active {
  border: 1px solid #1890ff;
}

.ant-list-item:hover {
  background: #e6f7ff;
}

.ant-list-item > {
  margin-right: 10px;
}

.ant-list-item button {
  font-size: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.header .logo-img {
  margin-right: 20px;
  height: 40px;
}

.page-title {
  display: flex;
}

.header h4 {
  color: #fff;
}

.editor-spinner {
  position: fixed;
  right: 50%;
  top: 10px;
}

.preview-container {
  padding: 24px;
  margin: 0;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}

.preview-list.active {
  border: 1px solid #1890ff;
}

.preview-list.canvas-fix .l-image-component,
.preview-list.canvas-fix .l-shape-component,
.preview-list.canvas-fix .l-text-component {
  box-shadow: none !important;
}

.preview-list.canvas-fix {
  position: absolute;
  max-height: none;
}

.sidebar-container {
  padding: 20px;
}

.body-container {
  width: 100%;
  height: 100%;
  background-size: cover;
}

.page-settings {
  padding: 16px;
}

.settings-panel .ant-tabs-top-content {
  max-height: calc(100vh - 124px);
  overflow-y: auto;
}

.final-preview {
  position: absolute;
  width: calc(100% - 400px);
  height: 100%;
  background: transparent;
  top: 0;
  left: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .final-preview-inner {
    width: 430px;
    height: 870px;
    padding: 60px 28px;
    position: relative;
    background: url(../img/phone-back.4dd9c4dd.png) no-repeat;
    background-size: cover
} */

.final-preview-inner .preview-title {
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-weight: 700;
}

.iframe-container {
  width: 100%;
  height: 706px;
  overflow-y: auto;
  overflow-x: hidden;
}

/* .iframe-placeholder {
    background: url(../img/loading.f560480a.svg) 50% 50% no-repeat;
    background-size: 50px
} */

.settings-panel .ant-collapse,
.settings-panel .ant-list-bordered {
  border-radius: 0;
}

.ant-collapse-header,
.ant-collapse-item,
.settings-panel .ant-tabs-tab {
  border-radius: 0 !important;
}
</style>
