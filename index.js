const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');



const nunjucks = require('nunjucks');
const jetpack = require('fs-jetpack');
const inline = require('./middlewares/inline');
const app = new Koa();
//const nodeEnv = process.env.NODE_ENV || '';

var env = new nunjucks.Environment( //也就是起到了'koa-views'的作用
  new nunjucks.FileSystemLoader(
    [
      path.resolve(__dirname, 'views'),
      path.resolve(__dirname, 'views/results'),
      path.resolve(__dirname, 'views/results/ad-subscription')
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
app.use(async (ctx,next) => {
  ctx.state.isProduction = process.env.NODE_ENV === 'production';
  console.log(ctx.state);
  await next(); //NOTE: koa中间件必须这样使用async, await
});
app.use(logger());
app.use(inline());
app.use(bodyParser());


if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const config = require('./webpack.config.dev');
  const webpackMiddleware = require('koa-webpack');
  const compiler = webpack(config);
  const webpackDevOptions = {
    noInfo: true,
    historyApiFallback: true,
    publicPath: config.output.publicPath,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
  app.use(webpackMiddleware({
    compiler: compiler,
    config: config,
    dev: webpackDevOptions,
    hot: compiler
  }));
}


const router = new Router();

const manageRouter = new Router();
const resultRouter = new Router();
const dataApiRouter = new Router();
const postResultRouter = new Router();
//url参数可以为:adForNews

///management page router
manageRouter.get('/:name', async ctx => { //name为adForNews

  const chunkName = `manage_${ctx.params.name}`;
  const cssSource =ctx.state.isProduction ? `/${chunkName}.css`: `/static/${chunkName}.css`; 
  const jsSource = ctx.state.isProduction ? `/${chunkName}.js`: `/static/${chunkName}.js`; 
  ctx.body = await render('app.html', {
    demoName: 'FTC Ad Management System',
    isProduction: ctx.state.isProduction,
    cssSource: cssSource,
    jsSource: jsSource
  });
  //ctx.response.set('Cache-Control', 'public', 'max-age=31536000');
  ctx.response.set('Cache-Control', 'public, max-age=86400');
});

router.use('/manage', manageRouter.routes());
router.get('/', ctx => {//默认重定向
  ctx.redirect('/manage/adfornews');
});

///ad result showing router
resultRouter.get('/:name', async ctx => {
  /*
  ctx.request.headers = {
    'Cache-Control':'max-age=60'
  }
  */
  const name = ctx.params.name;
  const chunkName = `result_${name}`;
  const cssSource = ctx.state.isProduction ? `/${chunkName}.css`: `/static/${chunkName}.css`; 
  const jsSource = ctx.state.isProduction ? `/${chunkName}.js`: `/static/${chunkName}.js`; 
  const adData = jetpack.read(`./server/data/ad-subscription/${name}.json`,'json');
 // console.log(adData);
  ctx.body = await render(`${name}.html`, Object.assign(
    adData,
    {
      isProduction: ctx.state.isProduction,
      cssSource:cssSource,
      jsSource:jsSource
    }
  ));
  ctx.response.set('Cache-Control', 'public, max-age=60');

});
router.use('/result', resultRouter.routes()); //Nested routers 嵌套路由

//ad post router
dataApiRouter.post('/:name',  ctx => {
  const name = ctx.params.name;
  const data = ctx.request.body;
  data.adTitle = name;
  data.styleName = name;
  const jsonToWrite = JSON.stringify(data);
  jetpack.writeAsync(`./server/data/ad-subscription/${name}.json`, jsonToWrite);
  ctx.body = {
    'ok': true 
  }
  ctx.redirect(`/postresult/success/${name}`);
});


dataApiRouter.get('/:name', async ctx => {
  const name = ctx.params.name;
  ctx.body = await jetpack.readAsync(`./server/data/ad-subscription/${name}.json`,'json');
});
router.use('/data', dataApiRouter.routes());


postResultRouter.get('/success/:name', async ctx => {
  //ctx.body = '提交成功!';
  const name = ctx.params.name;
  const chunkName = 'postresult'
  const cssSource = ctx.state.isProduction ? `/${chunkName}.css`: `/static/${chunkName}.css`; 
  ctx.body = await render('postresult.html', {
    pageName: 'Post Success Page',
    resultName: name,
    isProduction: ctx.state.isProduction,
    cssSource: cssSource,
  });
});
router.use('/postresult', postResultRouter.routes());

app.use(router.routes());

app.listen(5000, () => {
  console.log('Listening 5000');
});