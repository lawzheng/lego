module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: ['/node_modules/(?!(bootstrap-vue)|(rgb-hex)|(lodash-es)/)'],
  transform: {
    '^.+\\.vue$': 'vue-jest'
  }
}
