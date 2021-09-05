import { Module } from 'vuex'
import { GlobalDataProps } from './index'

export interface TemplateProps {
  id: number;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number;
}

export const testData: TemplateProps[] = [
  {
    title: '前端架构师直播海报1',
    author: 'lz',
    copiedCount: 740,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    id: 1
  },
  {
    title: '前端架构师直播海报',
    author: 'lz',
    copiedCount: 740,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    id: 2
  },
  {
    title: '前端架构师直播海报',
    author: 'lz',
    copiedCount: 740,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    id: 3
  },
  {
    title: '前端架构师直播海报',
    author: 'lz',
    copiedCount: 740,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    id: 4
  },
  {
    title: '前端架构师直播海报',
    author: 'lz',
    copiedCount: 740,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    id: 5
  }
]

export interface TemplatesProps {
  data: TemplateProps[]
}

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: testData
  },
  getters: {
    getTemplateById: (state) => (id: number) => {
      return state.data.find(t => t.id === id)
    }
  }
}

export default templates
