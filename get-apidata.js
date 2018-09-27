const jetpack = require('fs-jetpack');
const got = require('got');
// const apiDataStr1 = 'http://pro.ftchinese.com/api/adfornews';
// const apiDataStr2 = 'http://pro.ftchinese.com/api/adforradio';
// const apiDataStr3 = 'http://pro.ftchinese.com/api/adfornews300_250';
// const apiDataStr4 = 'http://pro.ftchinese.com/api/adforradio300_250';

const nameArr = ['adfornews', 'adforradio', 'adfornews300_250', 'adforradio300_250'];

async function  getOneApiData (name) {
  const apiUrl = `http://pro.ftchinese.com/api/${name}`;
  
  try {
    const response = await got(apiUrl);
    const data = response.body;
    console.log(data);

    return jetpack.writeAsync(`./api/${name}.json`,data)
  } catch (err) {
    console.log(err.response.body);
  }
 
  //jetpack.writeAsync(`./api/${name}.json`,data)
}

nameArr.forEach(name => {
  getOneApiData(name);
});