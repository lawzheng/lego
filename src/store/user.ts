import { Module } from 'vuex'
import { GlobalDataProps } from './index'
export interface UserProps {
  isLogin: boolean;
  userName?: string;
}

export interface UserStateProps {
  user: UserProps
}

const user: Module<UserStateProps, GlobalDataProps> = {
  state: {
    user: { isLogin: false }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, userName: 'viking' }
    },
    logout (state) {
      state.user = { isLogin: false }
    }
  }
}

export default user
