import React from 'react';
import ReactDOM from 'react-dom';

import Header from '@ftchinese/ftc-header-react-new';
import Login from '@ftchinese/ftc-login-react';

import { pushdownMenuData, channelData} from '../data/forHeader';

import Form from '../components/Form';
import TextInput from '../components/TextInput';

import emitter from '../components/events';
import {getCookie, deleteCookie} from '../components/utils';

channelData[0].subs[3] = Object.assign(channelData[0].subs[3], {
  url:'#'
});


class App extends React.Component {
  constructor(props) {
    super(props);

    
    const useridValue = getCookie('userid');
    const loginfailed = getCookie('loginfailed');
    this.state = {
      hasSignedIn: useridValue && useridValue.length === 32,
      validateFailed: !!loginfailed,
      showLoginOverlay: !!loginfailed
    }
    this.clickToShowLoginOverlay = this.clickToShowLoginOverlay.bind(this);
    this.clickToCloseLoginOverlay = this.clickToCloseLoginOverlay.bind(this);
  } 
  componentDidMount() {
    this.handleLoginWindow = emitter.on('poploginwindow', () => {
      this.setState({
        showLoginOverlay: true
      })
    });

  }

  componentWillUnmount() {
    emitter.removeListener(this.handleLoginWindow);
  }


  clickToShowLoginOverlay() {
    console.log('click');
    this.setState({
      showLoginOverlay:true
    })
  }
  clickToCloseLoginOverlay(e) {
    if(e.target.className.includes('bgshadow') || e.target.className.includes('overlay-close')) {
      this.setState({
        showLoginOverlay: false
      });
      if(getCookie('loginfailed')) {
        deleteCookie('loginfailed');
        console.log('loginfailed cookie:', getCookie('loginfailed'));
      }
    }
  }

  render() {
    return (
      <div>
        <Header 
          customHomeTitle="H5数据管理系统"

          pushdownMenuData={pushdownMenuData}

          signData={[
            {
              word:"登录",
              name:"signIn",
              clickHandler: this.clickToShowLoginOverlay,
              showTime:"before"
            },
            {
              word:"登出",
              url:"/user/logout",
              name:"signOut",
              showTime:"after"
            }
          ]}
          hasSignedIn = {this.state.hasSignedIn}

          dynamicNav={false}
          navChannelData={channelData}
          navDefaultTopOrder={0}
          navDefaultSubOrder={3}

          searchPostUrl={"/search"}
          searchPlaceHolder={"输入年月日‘xxxx-xx-xx’可搜索该日存档" }
        />

        <Login postUrl={'/user/login'} accountType={'username'} findPasswordUrl={'/user/findpassword'} registerUrl={'/user/register'}
          closeFunc={this.clickToCloseLoginOverlay} 
          show={this.state.showLoginOverlay}
          validateFailed = {this.state.validateFailed}
        />

        <p className="gotoresult">
          前往<a href="/result/adforradio300_250" target="_blank">对应h5作品</a>查看效果O(∩_∩)O
        </p>

        <Form actionUrl="/api/adforradio300_250" reminderWord="请根据广告实际需要编辑数据:" hasSignedIn = {this.state.hasSignedIn}>
          <TextInput name="ccode" label="ccode编号" info="请输入广告的ccode" placeholder="例：2G186011" />
          <TextInput name="topTitle" label="顶部标题" info="请输入广告的顶部标题" placeholder="例：英语学习，付费会员专享 &gt; " />

          <TextInput name="headArticle[tag]" label="标签" info="请输入该文章的标签tag" placeholder="例：速读测试" fieldSetName="头条文章" />
          <TextInput name="headArticle[title]" label="标题" info="请输入该文章的标题" placeholder="例：遛狗也要“大众点评”" fieldSetName="头条文章" />
          <TextInput name="headArticle[url]" label="链接" info="请输入该文章的链接" placeholder="例：http://www.ftchinese.com/interactive/11980?adchannelID=1100" fieldSetName="头条文章" />
          <TextInput name="headArticle[pic]" label="图片" info="请输入该文章的图片地址" placeholder="例：http://i.ftimg.net/picture/2/000078212_piclink.jpg" fieldSetName="头条文章" />

          <TextInput name="articleList[0][tag]" label="标签" info="请输入该文章的标签tag" placeholder="例：英语电台" fieldSetName="列表文章1"/>
          <TextInput name="articleList[0][title]" label="标题" info="请输入该文章的标题" placeholder="例：海外漂泊教会了我们什么" fieldSetName="列表文章1" />
          <TextInput name="articleList[0][url]" label="链接" info="请输入该文章的链接" placeholder="例：http://www.ftchinese.com/interactive/12028?adchannelID=5000&exclusive#adchannelID=1100" fieldSetName="列表文章1" />
        

          <TextInput name="productDesc[buttonWord]" label="按钮文字" info="请输入跳转至该产品的按钮上的文字，不超过10个汉字（含标点）" placeholder="例：仅198元/年，即刻订阅" fieldSetName="产品说明" />
          <TextInput name="productDesc[buttonUrl]" label="产品链接" info="请输入该产品的链接" placeholder="例：http://www.ftchinese.com/premium/001077859?exclusive" fieldSetName="产品说明" />
        </Form>
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

/*
ReactDOM.render(
  <div>
    <Header 
      customHomeTitle="H5数据管理系统"

      pushdownMenuData={pushdownMenuData}

      signData={signData}
      signedFlagCookieName='MANAGE_USER_NAME'
      accountType = 'username'
      loginUrl = '/user/login'

      dynamicNav={false}
      navChannelData={channelData}
      navDefaultTopOrder={0}
      navDefaultSubOrder={3}

      searchPostUrl={"/search"}
      searchPlaceHolder={"输入年月日‘xxxx-xx-xx’可搜索该日存档" }
    />
    <p className="gotoresult">
      前往<a href="/result/adforradio300_250" target="_blank">对应h5作品</a>查看效果O(∩_∩)O
    </p>
    <Form actionUrl="/api/adforradio300_250" reminderWord="请根据广告实际需要编辑数据:">
      <TextInput name="ccode" label="ccode编号" info="请输入广告的ccode" placeholder="例：2G186011" />
      <TextInput name="topTitle" label="顶部标题" info="请输入广告的顶部标题" placeholder="例：英语学习，付费会员专享 &gt; " />

      <TextInput name="headArticle[tag]" label="标签" info="请输入该文章的标签tag" placeholder="例：速读测试" fieldSetName="头条文章" />
      <TextInput name="headArticle[title]" label="标题" info="请输入该文章的标题" placeholder="例：遛狗也要“大众点评”" fieldSetName="头条文章" />
      <TextInput name="headArticle[url]" label="链接" info="请输入该文章的链接" placeholder="例：http://www.ftchinese.com/interactive/11980?adchannelID=1100" fieldSetName="头条文章" />
      <TextInput name="headArticle[pic]" label="图片" info="请输入该文章的图片地址" placeholder="例：http://i.ftimg.net/picture/2/000078212_piclink.jpg" fieldSetName="头条文章" />

      <TextInput name="articleList[0][tag]" label="标签" info="请输入该文章的标签tag" placeholder="例：英语电台" fieldSetName="列表文章1"/>
      <TextInput name="articleList[0][title]" label="标题" info="请输入该文章的标题" placeholder="例：海外漂泊教会了我们什么" fieldSetName="列表文章1" />
      <TextInput name="articleList[0][url]" label="链接" info="请输入该文章的链接" placeholder="例：http://www.ftchinese.com/interactive/12028?adchannelID=5000&exclusive#adchannelID=1100" fieldSetName="列表文章1" />
    </Form>
  </div>,
  document.getElementById('root')
);
*/