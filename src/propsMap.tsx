import { VNode } from 'vue'
import { TextComponentProps } from './defaultProps'
export interface PropToForm {
  component: string;
  subComponent?: string;
  extraProps?: { [key : string]: any },
  text?: string;
  options?: { text: string | VNode, value: any }[],
  initalTransform?: (v: any) => any;
  afterTransform?: (v: any) => any;
  valueProp?: string;
  eventName?: string;
}

export type PropsToForm = {
  [P in keyof TextComponentProps]?: PropToForm
}

const fontFamilyArr = [
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiTi"' },
  { text: '仿宋', value: '"FangSong","STFangSong"' }
]
const fontFamilyOptions = fontFamilyArr.map(font => {
  return {
    value: font.value,
    // text: h('span', { style: { fontFamily: font.value } }, font.text)
    text: <span style={ { fontFamily: font.value } } >{font.text}</span> as VNode
  }
})

export const mapPropsToForms: PropsToForm = {
  text: {
    text: '文本',
    component: 'a-textarea',
    extraProps: { rows: 3 },
    afterTransform: (e: any) => e.target.value
  },
  fontSize: {
    text: '字号',
    component: 'a-input-number',
    initalTransform: (v: string) => parseInt(v),
    afterTransform: (e: number) => e ? `${e}px` : ''
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
    initalTransform: (v: string) => parseFloat(v),
    afterTransform: (e: number) => e.toString()
  },
  textAlign: {
    text: '对齐',
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: '右' }
    ],
    afterTransform: (e: any) => e.target.value
  },
  fontFamily: {
    text: '字体',
    component: 'a-select',
    subComponent: 'a-select-option',
    options: [
      { value: '', text: '无' },
      ...fontFamilyOptions
    ]
  }
}
