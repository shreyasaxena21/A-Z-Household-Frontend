const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './', // This ensures relative paths in production
  transpileDependencies: true
})
