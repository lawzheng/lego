import { TextComponentProps } from './defaultProps'
export interface PropToForm {
  component: string;
  subComponent?: string;
  value?: string;
  extraProps?: { [key : string]: any },
  text?: string;
  options?: { text: string, value: any }[],
  initalTransform?: (v: any) => any;
  valueProp?: string;
}

export type PropsToForm = {
  [P in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropsToForm = {
  text: {
    text: '文本',
    component: 'a-textarea',
    extraProps: { rows: 3 }
  },
  fontSize: {
    text: '字号',
    component: 'a-input-number',
    initalTransform: (v: string) => parseInt(v)
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
    initalTransform: (v: string) => parseFloat(v)
  },
  textAlign: {
    text: '对齐',
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: '右' }
    ]
  },
  fontFamily: {
    text: '字体',
    component: 'a-select',
    subComponent: 'a-select-option',
    options: [
      { value: '', text: '无' },
      { value: '"SimSun", "STSong"', text: '宋体' },
      { value: '"SimHei", "STHeiti"', text: '黑体' },
      { value: '"KaiTi", "STKaiTi"', text: '楷体' },
      { value: '"FangSong", "STFangSong"', text: '仿宋' }
    ]
  }
}
