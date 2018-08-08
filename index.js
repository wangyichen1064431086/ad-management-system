const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');



const nunjucks = require('nunjucks');
const jetpack = require('fs-jetpack');
const app = new Koa();
//const nodeEnv = process.env.NODE_ENV || '';

function render(env, template, context) {
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
app.use(bodyParser());


if (process.env.NODE_ENV !== 'production') {
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
const apiRouter = new Router();
const postResultRouter = new Router();
//url参数可以为:adForNews

///management page router
manageRouter.get('/:name', async ctx => { //name为adForNews

  const env = new nunjucks.Environment( //也就是起到了'koa-views'的作用
    new nunjucks.FileSystemLoader(
      [
        path.resolve(__dirname, 'views/manage'),
        path.resolve(__dirname, 'views/manage/partials')

      ],
      {
        watch:false,
        noCache: true
      }
    ),
    {autoescape: false}
  );
  ctx.body = await render(env, 'app.html', {
    pageName: 'FTC Ad Management System',
    cssSource: `${ctx.params.name}_css.html`,
    jsSource: `${ctx.params.name}_js.html`
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
  const env = new nunjucks.Environment( //也就是起到了'koa-views'的作用
    new nunjucks.FileSystemLoader(
      [
        path.resolve(__dirname, 'views/result'),
        path.resolve(__dirname, 'views/result/partials')
      ],
      {
        watch:false,
        noCache: true
      }
    ),
    {autoescape: false}
  );

  env.addFilter('addSearchParam', (str, param) => {
    if(!str || !param) {
      return;
    }
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

  const name = ctx.params.name;
  const adData = jetpack.read(`./api/${name}.json`,'json');
  ctx.body = await render(env,`${name}.html`, 
    Object.assign(
      adData,
      {
        pageName: name,
        cssSource: `${name}_css.html`,
        jsSource: `${name}_js.html`
      }
    )
  );
  ctx.response.set('Cache-Control', 'public, max-age=60');

});
router.use('/result', resultRouter.routes()); //Nested routers 嵌套路由

//api router
apiRouter.post('/:name', async ctx => {
  const name = ctx.params.name;
  const data = ctx.request.body;
  const jsonToWrite = JSON.stringify(data);
  jetpack.writeAsync(`./api/${name}.json`, jsonToWrite);
  ctx.body = {
    'ok': true 
  }
  ctx.redirect(`/postresult/success/${name}`);
});


apiRouter.get('/:name', async ctx => {
  const name = ctx.params.name;
  ctx.body = await jetpack.readAsync(`./api/${name}.json`,'json');
});
router.use('/api', apiRouter.routes());

/*
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
*/
app.use(router.routes());

app.listen(5000, () => {
  console.log('Listening 5000');
});