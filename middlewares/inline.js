const path = require('path');
const {inlineSource} = require('inline-source');
// const minify = require('html-minifier').minify;

module.exports = function (assetsPath='static') {
  return async function (ctx, next) {
    await next();
    // if (process.env.NODE_ENV !== 'production') {
    //   return;
    // }

    if (!ctx.response.is('html')) {//NOTE:检查响应类型是否是所提供的类型之一。从这里开始以下几行代码起到削减除流之外的所有HTML响应(来自文档 https://koa.bootcss.com/#response response.js(types...))
      return;
    }

    let body = ctx.body;
    if (!body || body.pipe) {
      return;
    }

    if (Buffer.isBuffer(body)) {
      body = body.toString();
    }

    ctx.body = await inlineSource(body, {
      compress: true,
      rootpath: path.resolve(process.cwd(), assetsPath)
    });
    return;
  }
};
