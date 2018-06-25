const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const webpack = require('webpack');
const config = require('./webpack.config.dev');
const webpackMiddleware = require('koa-webpack');
const nunjucks = require('nunjucks');
const jetpack = require('fs-jetpack');

const app = new Koa();
const compiler = webpack(config);


const webpackDevOptions = {
  noInfo: true,
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};

var env = new nunjucks.Environment( //也就是起到了'koa-views'的作用
  new nunjucks.FileSystemLoader(
    [
      path.resolve(__dirname, 'views'),
      path.resolve(__dirname, 'views/ad-subscription')
    ],
    {
      watch:false,
      noCache: true
    }
  ),
  {autoescape: false}
);
env.addFilter('addSearchParam', (str, param) => {
  const hashIndex = str.indexOf('#');
  const hashStr = hashIndex > 0 ? str.substr(hashIndex) : '';
  const strWithOutHashStr = hashIndex > 0 ? str.substring(0, hashIndex) : str;
  
  if (strWithOutHashStr.includes('?')) {
    //去掉原有ccode
    const strWithOutHashStrWithOutCcode = strWithOutHashStr.replace(/ccode=[a-zA-Z0-9]+&?/,'');
    return `${strWithOutHashStrWithOutCcode}&${param}${hashStr}`;
  } 
  return `${strWithOutHashStr}?${param}${hashStr}`;
});

function render(template, context) {
  return new Promise(function(resolve, reject) {
    env.render(template, context, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

app.use(logger());

app.use(bodyParser());

app.use(webpackMiddleware({
  compiler: compiler,
  config: config,
  dev: webpackDevOptions,
  hot: compiler
}));

const router = new Router();
const adResultRouter = new Router();
const dataPostRouter = new Router();

///management page router
router.get('/adfornews', async ctx => {
  console.log('get!!!!')
  ctx.body = await render('app.html', {
    demoName: 'FTC Ad Management System',
    defaultCcode: '12345'
  })
});

///ad showing router
adResultRouter.get('/fornews', async ctx => {
  const adData = jetpack.read('./server/data/ad-subscription/adForNews.json','json');
  console.log(adData);
  ctx.body = await render('adForNews.html', adData);
});
router.use('/ad', adResultRouter.routes()); //Nested routers 嵌套路由

//ad poster router
dataPostRouter.post('/fornews',  ctx => {
  const data = ctx.request.body;
  data.adTitle = "adForNews";
  data.styleName = "adForNews";
  const jsonToWrite = JSON.stringify(data);
  jetpack.writeAsync('./server/data/ad-subscription/adForNews.json', jsonToWrite);
  ctx.redirect('back');
  /** NOTE: ctx.redirect:
   * 同response.redirect, 执行 [302] 重定向到 url.
   * 字符串 “back” 是特别提供Referrer支持的，当Referrer不存在时，使用 alt 或“/”
   * 如果删去这句话，那么就直接得到/post路由，这个路由只是处理表单，却没有返回任何内容，所以会显示Not Found页面
   。
  */
});
dataPostRouter.get('/fornews', ctx => {
  ctx.body = jetpack.read('./server/data/ad-subscription/adForNews.json','json');
});

router.use('/datapost', dataPostRouter.routes());


app.use(router.routes());

app.listen(8000, () => { //NOTE: 'listening'事件，Node的原生事件，在调用server.listen()后触发
  console.log('Listening 8000');
});
