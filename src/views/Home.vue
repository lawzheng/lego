<template>
  <template-list  :list="testData"/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'
import TemplateList from '../components/TemplateList.vue'
export default defineComponent({
  name: 'Home',
  components: {
    TemplateList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const testData = computed(() => store.state.templates.data)
    return {
      testData
    }
  }
})
</script>

<style>
.user-profile-dropdown {
    border-radius: 2px!important
}

.user-operation>* {
    margin-left: 30px!important
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center
}

.ant-layout-header {
    z-index: 50;
    box-shadow: 0 10px 15px rgba(0,0,0,.1)
}

.transparent-header {
    background-color: rgba(0,0,0,.5)
}

.home-layout {
    position: relative;
    /* top: -70px */
}

.editor-spinner {
    position: fixed;
    right: 50%;
    top: 10px;
    z-index: 100
}

.header .logo-img {
    height: 35px
}

.header .ant-input-search {
    width: 250px
}

.right-col> {
    margin-left: 30px!important
}

.banner {
    display: flex;
    position: relative;
    height: 192px;
    width: 100%;
    overflow: hidden;
    border-radius: 10px
}

.banner img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover
}

.banner-text {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box
}

.text-headline {
    text-shadow: 0 0 1px rgba(68,92,116,.02),0 2px 8px rgba(57,76,96,.15);
    font-size: 3rem
}

.text-link {
    color: #fff
}

.text-link:hover {
    color: #fff;
    text-decoration: underline
}

.poster-item {
    position: relative;
    margin-bottom: 20px
}

.list-inline {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    padding-top: 24px;
    border-top: 1px solid #4d4d4d
}

.list-inline li {
    margin-right: 20px
}

.extra-margin {
    margin-top: 70px
}

.ant-layout-footer {
    background: #333;
    color: #999
}

.footer-info {
    max-width: 1200px;
    margin: 0 auto
}

.footer-info .feature-item {
    text-align: left
}

.footer-info .feature-item h3 {
    color: #fff;
    font-size: 19px
}

.footer-info .feature-item ul {
    list-style-type: none;
    padding: 0;
    margin: 0
}

.footer-info .feature-item li {
    height: 35px;
    line-height: 35px
}

.footer-info .feature-item a {
    color: #999
}

.poster-item .ant-card {
    border-radius: 12px
}

.banner {
    display: flex;
    position: relative;
    height: 450px;
    width: 100%;
    overflow: hidden
}

.banner img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover
}

.banner-text {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box
}

.banner-text .ant-input-search {
    width: 40%;
    box-shadow: 0 12px 24px 0 rgba(30,29,32,.8)
}

.banner-text .ant-input {
    height: 40px;
    font-size: 17px;
    padding: 7px 15px;
    padding-right: 30px;
    border: 2px solid #3e7fff;
    border-right-width: 0
}

.banner-text .ant-input-search-button {
    height: 40px;
    border: 2px solid #3e7fff;
    border-left-width: 0;
    display: flex;
    align-items: center
}

.banner-text .ant-input-search-button svg {
    font-size: 25px
}

.text-headline {
    text-shadow: 0 0 1px rgba(68,92,116,.02),0 2px 8px rgba(57,76,96,.15);
    font-size: 2rem
}

.text-link {
    color: #fff
}

.text-link:hover {
    color: #fff;
    text-decoration: underline
}

.feature-item {
    text-align: center;
    padding: 20px 0
}

.feature-item .anticon {
    font-size: 60px
}

.feature-item p {
    color: #666
}

.feature-item h3 {
    margin: 5px 0;
    font-size: 19px;
    color: #333
}

.welcome-container {
    background: #f2f2f2
}

.welcome-container-inner {
    max-width: 1200px;
    margin: 0 auto
}

.hot-title {
    margin: 0 auto;
    padding: 20px 0
}

.hot-title p {
    text-align: center;
    font-size: 16px;
    color: #666
}

.hot-template {
    font-size: 22px;
    color: #333
}

.hot-template:after,.hot-template:before {
    content: "";
    display: inline-block;
    width: 57px;
    height: 1px;
    margin: 0 26px;
    background-color: #d8d8d8;
    vertical-align: middle
}

.content-container {
    background: #fff;
    padding: 0 24px 24px 30px;
    min-height: 85vh;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%
}

.poster-item {
    position: relative;
    margin-bottom: 20px
}

.content-title {
    min-height: 70px
}

.content-title h2 {
    margin-bottom: 0
}

.barcode-container {
    width: 80px;
    height: 80px
}

.overlay-dropdown {
    border-radius: 2px!important
}

.mywork-container .ant-input-search {
    width: 30%
}

.searchResult {
    display: flex;
    align-items: center
}

#main-chart {
    position: relative
}

.chart-loading {
    position: absolute;
    left: 50%;
    top: 50%
}

</style>
