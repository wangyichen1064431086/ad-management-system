const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');



const nunjucks = require('nunjucks');
const jetpack = require('fs-jetpack');

const {validateUser} = require('./lib/validate-user');
const authorizedUsers = require('./lib/database-authorizedusers');

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
const userRouter = new Router();
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
        noCache: false
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
        noCache: false
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
  //const userid = ctx.cookies.get('userid');
  
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

//post data result router
postResultRouter.get('/success/:name', async ctx => {
  const env = new nunjucks.Environment( //也就是起到了'koa-views'的作用
    new nunjucks.FileSystemLoader(
      [
        path.resolve(__dirname, 'views/postresult'),
        path.resolve(__dirname, 'views/postresult/partials')

      ],
      {
        watch:false,
        noCache: false
      }
    ),
    {autoescape: false}
  );
const name = ctx.params.name;
  
  ctx.body = await render(env, 'app.html', {
    pageName: 'Post Success Page',
    cssSource: 'app_css.html',
    relatedPageName: name
  });
});
router.use('/postresult', postResultRouter.routes());

// user router
userRouter.post('/login', async ctx => {
  const data = ctx.request.body;
  console.log(data);
  const userid = validateUser(data, authorizedUsers);
  if(userid) {
    if (data.saveme) {
      const maxAgeValue = 1000*3600*24*7;//保持登录状态时长7天
      ctx.cookies.set('userid', userid, {
        httpOnly:false,//默认为true，表示只有服务器能访问，浏览器本地document.cookie无法获取
        //todo:根据data的saveme添加max-age
        maxAge: maxAgeValue
      });
    } else {
      ctx.cookies.set('userid', userid, {
        httpOnly:false
      });
    }
    if(ctx.cookies.get('loginfailed')) {
      console.log('there is loginfailed')
      ctx.cookies.set('loginfailed','');
    }
    ctx.body = {
      'ok': true 
    }
    
  } else {
    ctx.cookies.set('loginfailed', '1', {
      httpOnly:false
    });
    ctx.body = {
      'ok': false 
    }
  }

  ctx.redirect('back','/');

});

userRouter.get('/logout', async ctx => {
  if(ctx.cookies.get('userid')) {
    ctx.cookies.set('userid','');
  }
  ctx.redirect('back','/');
});
router.use('/user', userRouter.routes());

app.use(router.routes());

app.listen(5000, () => {
  console.log('Listening 5000');
});