const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  transpileDependencies: [
    "bootstrap", // add any other dependencies you need to transpile
  ],

  chainWebpack: (config) => {
    // Bootstrap 5 no longer requires Popper.js, so you can exclude it
    config.module.rule("js").exclude.add(/bootstrap-v4/);

    // Adjust other webpack configurations if needed
  },
});
