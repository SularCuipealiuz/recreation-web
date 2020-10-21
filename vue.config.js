const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  chainWebpack: config => {
    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("unit-convert-loader")
      .loader("unit-convert-loader")
      .options({
        UIWidth: 375,
        unitPrecision: 3,
        targetUnit: "vw",
        minPixelValue: 1,
        rem: 16
      });
  },
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin({
        match(originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith("base-")) {
            return [
              camelTag,
              `import ${camelTag} from '@/components/${camelTag}.vue'`
            ];
          }
        }
      })
    ]
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "src/sass/_mixin.scss";
        `
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
