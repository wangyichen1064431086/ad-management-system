function validateUser(userInfo,authorizedUsers) {
  const account = userInfo.account;
  const password = userInfo.password;
  const conformedAccountUser = authorizedUsers.filter(item => item.account === account);
  if (conformedAccountUser.length === 0) {
    return false;
  }
  const conformedAccountUserItem = conformedAccountUser[0];
  if(conformedAccountUserItem.password === password) {
    return true;
  } else {
    return false;
  }
}

function produceRandomStr(num) {
  const chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const len = chars.length;//62
  let str = '';
  for (let i=0; i<num; i++) {
    const index = getRandomInt(0, len);//生成0~61的的整数
    str += chars[index];
  }
  return str;
}
/**
   * @dest 生成min~max之间的随机整数，如果min和max都为整数，那么生成区间包含min,不包含max
   * @param {Number} min the min value of the range min~max
   * @param {Number} max the max value of the range min~max
   * @return {Int} the random int between min~max, witch containing min ,not containg max
   */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min)) + min
}

module.exports = {
  validateUser,
  produceRandomStr
}