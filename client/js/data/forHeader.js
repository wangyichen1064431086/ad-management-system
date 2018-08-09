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
    "url":"",
    "word":"登录",
    "name":"signIn",
    "showTime":"before"
  },
  {
    "url":"/user/logout",
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
        "url":"/manage/adfornews",
        "order":0
      },
      {
        "name":"adForRadio",
        "url":"/manage/adforradio",
        "order":1
      },
      {
        "name":"adForNews300-250",
        "url":"/manage/adfornews300_250",
        "order":2
      },
      {
        "name":"adForRadio300-250",
        "url":"/manage/adforradio300_250",
        "order":3
      }
    ]  
  }
];

export {  pushdownMenuData, signData, channelData };
