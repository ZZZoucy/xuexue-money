/* eslint-disable */

const path = require("path");

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/xuexue-bookkeeping/" : "/",
    lintOnSave: false,
    chainWebpack: (config) => {
        const dir = path.resolve(__dirname, "src/assets/icons");
        // icons 全都来自于 dir
        config.module
            .rule("svg-sprite")
            .test(/\.svg$/)
            .include.add(dir)
            .end() // 只有在 icons 目录下，有这个规则
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({ extract: false }) // extract: false 不要解析文件
            .end();
        config.plugin("svg-sprite").use(require("svg-sprite-loader/plugin"), [{ plainSprite: true }]);
        config.module.rule("svg").exclude.add(dir); // 其他 svg loader 排除 icons 目录
    },
};
