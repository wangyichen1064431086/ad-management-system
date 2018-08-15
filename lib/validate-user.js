const md5 = require('md5');

function validateUser(userInfo,authorizedUsers) {
  const account = userInfo.account;
  const password = md5(userInfo.password);

  
  const conformedAccountUser = authorizedUsers.filter(item => item.account === account);
  if (conformedAccountUser.length === 0) {
    return false;
  }
  const conformedAccountUserItem = conformedAccountUser[0];
  console.log(conformedAccountUserItem.password);
  if(conformedAccountUserItem.password === password) {
    return conformedAccountUserItem.userid;
  } else {
    return '';
  }
}


module.exports = {
  validateUser
}