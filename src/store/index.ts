import { createStore } from 'vuex'

export interface UserProps {
  isLogin: boolean;
  userName?: string;
}

export interface TemplateProps {
  id: number;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number;
}

export interface GlobalDataProps {
  user: UserProps;
  template: TemplateProps[];
}

const testData: TemplateProps[] = [
  {
    title: "前端架构师直播海报",
    author: "lz",
    copiedCount: 740,
    coverImg: "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
    id: 1
  },
  {
    title: "前端架构师直播海报",
    author: "lz",
    copiedCount: 740,
    coverImg: "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
    id: 2
  },
  {
    title: "前端架构师直播海报",
    author: "lz",
    copiedCount: 740,
    coverImg: "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
    id: 3
  },
  {
    title: "前端架构师直播海报",
    author: "lz",
    copiedCount: 740,
    coverImg: "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
    id: 4
  },
  {
    title: "前端架构师直播海报",
    author: "lz",
    copiedCount: 740,
    coverImg: "https://static.imooc-lego.com/upload-files/screenshot-889755.png",
    id: 5
  },
]

const store = createStore<GlobalDataProps>({
  state: {
    template: testData,
    user: { isLogin: false }
  }
})

export default store