const path = require('path');
//const Koa = require('koa');
//const logger = require('koa-logger');
// const Router = require('koa-router');
// const bodyParser = require('koa-bodyparser');


const nunjucks = require('nunjucks');
const jetpack = require('fs-jetpack');
const { inlineSource } = require('inline-source');
console.log('execute');

//const app = new Koa();
const envIsProduction = process.env.NODE_ENV === 'production';


/*
app.use(async (ctx,next) => {
 ctx.state.isProduction = process.env.NODE_ENV === 'production';
 console.log(ctx.state);
  await next(); //NOTE: koa中间件必须这样使用async, await
});
*/
//app.use(logger());
//app.use(inline());
//app.use(bodyParser());


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

/**
 * 
 * @param {String} staticResource  static目录下的某一个文件名称,包含后缀，如'manage_adfornews.css'、'manage_adfornews.js'
 * @param {String} ext static目录下的文件名称后缀，可以是'css'或'js'
 * @param {String} viewDirectory views目录下的子目录，即为获取template文件的工作目录以及写入生成render结果的工作目录,可以是'manage'或'result'
 */
function renderOneView(staticResource, ext, viewDirectory) {
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(
      [
        path.resolve(__dirname, `views/${viewDirectory}/partials`),
      ],
      {
        watch:false,
        noCache: true
      }
    ),
    {autoescape: false}
  );
  return new Promise(
    async function (resolve, reject) {
      const destFileName = `${path.basename(staticResource, `.${ext}`).replace(`${viewDirectory}_`,'')}_${ext}`;
      const dataForRender = {
        isProduction: envIsProduction,
        source:  envIsProduction ? path.join(process.cwd(),'static',`${staticResource}`): `/static/${staticResource}`
      }
      const renderResult = await render(env,`template_${ext}.html`, dataForRender);
      const destFilePath =  `./views/${viewDirectory}/partials/${destFileName}.html`;
      await jetpack.writeAsync(destFilePath, renderResult);

      if(envIsProduction) {
        const inlineHtml = await inlineSource(destFilePath, {
          compress: true
        })
        await jetpack.writeAsync(destFilePath, inlineHtml)
      }
      resolve(destFilePath);
    }
  ).then(dest => {
    console.log('Success to get:', dest);
  }).catch(err => {
    console.log('Error:',err.message);
  })
}

/**
 * 
 * @param {String} viewDirectory views目录下的子目录，即为获取template文件的工作目录以及写入生成render结果的工作目录,可以是'manage'或'result'
 * @param {String} ext static目录下的文件名称后缀，可以是'css'或'js'
 */
async function renderViews(viewDirectory, ext) {
  console.log('getResult');
  const filesArr = jetpack.find('static', {
    matching:`${viewDirectory}_*.${ext}`,
    files:true,
    directories: false,
    recursive: false
  }).map(pathStr => path.basename(pathStr));
  console.log(filesArr);
 
  await Promise.all(filesArr.map(oneFile => 
    renderOneView(oneFile, ext, viewDirectory)
  )).then(resultArr => {
    console.log(`Rendered ${resultArr.length} ${viewDirectory} ${ext} source html partials.`)
  });
}
/*
async function getManageJsPartials() {
  console.log('getMange');
  const manageJsFilesArr = jetpack.find('static', {
    matching:'manage_*.js',
    files:true,
    directories: false,
    recursive: false
  }).map(pathStr => path.basename(pathStr));
  console.log(manageJsFilesArr);
 
  await Promise.all(manageJsFilesArr.map(oneResourceFile => 
    renderOneView(oneResourceFile, 'js', 'manage')
  )).then(resultArr => {
    console.log(`Rendered ${resultArr.length} manage js source html partials.`)
  });
}

async function getManageCssPartials() {
  console.log('getMange css');
  const manageCssFilesArr = jetpack.find('static', {
    matching:'manage_*.css',
    files:true,
    directories: false,
    recursive: false
  }).map(pathStr => path.basename(pathStr));
  console.log(manageCssFilesArr);
 
  await Promise.all(manageCssFilesArr.map(oneResourceFile => 
    renderOneView(oneResourceFile, 'css', 'manage')
  )).then(resultArr => {
    console.log(`Rendered ${resultArr.length} manage css source html partials.`)
  });
}

async function getResultJsPartials() {
  console.log('getResult');
  const filesArr = jetpack.find('static', {
    matching:'result_*.js',
    files:true,
    directories: false,
    recursive: false
  }).map(pathStr => path.basename(pathStr));
  console.log(filesArr);
 
  await Promise.all(filesArr.map(oneFile => 
    renderOneView(oneFile, 'js', 'result')
  )).then(resultArr => {
    console.log(`Rendered ${resultArr.length} manage js source html partials.`)
  });
}

async function getResultCssPartials() {
  console.log('getMange css');
  const manageCssFilesArr = jetpack.find('static', {
    matching:'manage_*.css',
    files:true,
    directories: false,
    recursive: false
  }).map(pathStr => path.basename(pathStr));
  console.log(manageCssFilesArr);
 
  await Promise.all(manageCssFilesArr.map(oneResourceFile => 
    renderOneView(oneResourceFile, 'css', 'manage')
  )).then(resultArr => {
    console.log(`Rendered ${resultArr.length} manage css source html partials.`)
  });
}
*/
//获取manage的partials
// getManageJsPartials();
// getManageCssPartials();

renderViews('manage','js');
renderViews('manage','css');
renderViews('result','js');
renderViews('result','css');