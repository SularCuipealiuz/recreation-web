module.exports = {
  transpileDependencies: ["vuetify"],
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
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "src/sass/_mixin.scss";
          @import "src/sass/_reset.scss";
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
