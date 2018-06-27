const pushdownMenuData = [
  {
    name: "相关资源",
    url: "http://www.ftchinese.com",
    selected: true
  },
  {
    name: "FTC首页",
    url: "http://www.ftchinese.com",
    selected: false
  },
  {
    name: "FT首页",
    url: "https://www.ft.com/",
    selected: false
  },
];

const signData = [
  {
    "url":"http://user.ftchinese.com/login",
    "word":"登录",
    "name":"signIn",
    "showTime":"before"
  },
 {
    "url":"http://user.ftchinese.com/register",
    "word":"免费注册",
    "name":"signUp",
    "showTime":"before"
  },
  {
    "url":"/users/mystories",
    "word":"我的FT",
    "name":"myFT",
    "showTime":"after"
  },
 {
    "url":"/users/cp",
    "word":"设置",
    "name":"setting",
    "showTime":"after"
  },
  {
    "url":"http://user.ftchinese.com/logout",
    "word":"登出",
    "name":"signOut",
    "showTime":"after"
  }
];

const channelData = [
  {
    "name": "订阅推广广告",
    "url": "#",
    "order":0,
    "subs":[
      {
        "name":"adForNews",
        "url":"/manage/ad-subscription/adfornews",
        "order":0
      },
      {
        "name":"adForRadio",
        "url":"/manage/ad-subscription/adforradio",
        "order":1
      },
      {
        "name":"adForNews300-250",
        "url":"/manage/ad-subscription/adfornews300_250",
        "order":2
      },
      {
        "name":"adForRadio300-250",
        "url":"/manage/ad-subscription/adforradio300_250",
        "order":3
      }
    ]  
  }
];

export {  pushdownMenuData, signData, channelData };
