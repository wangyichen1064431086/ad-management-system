import React from 'react';
import ReactDOM from 'react-dom';

import Header from '@ftchinese/ftc-header-react-new';
import { pushdownMenuData, signData, channelData} from '../data/forHeader';

import Form from '../components/Form';
import TextInput from '../components/TextInput';

channelData[0].subs[1] = Object.assign(channelData[0].subs[1], {
  url:'#'
});

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
      navDefaultSubOrder={1}

      searchPostUrl={"/search"}
      searchPlaceHolder={"输入年月日‘xxxx-xx-xx’可搜索该日存档" }
    />
    
    <p className="gotoresult">
      前往<a href="/result/adforradio" target="_blank">对应h5作品</a>查看效果O(∩_∩)O
    </p>

    <Form actionUrl="/api/adforradio" reminderWord="请根据广告实际需要编辑数据:">
      <TextInput name="ccode" label="ccode编号" info="请输入广告的ccode" placeholder="例：2G186013" />
      <TextInput name="topTitle" label="顶部标题" info="请输入广告的顶部标题" placeholder="例：英语电台" />

      <TextInput name="headArticle[tag]" label="标签" info="请输入该文章的标签tag" placeholder="例：时尚" fieldSetName="头条文章"/>
      <TextInput name="headArticle[title]" label="标题" info="请输入该文章的标题" placeholder="例：The dark side of fast fashion" fieldSetName="头条文章" />
      <TextInput name="headArticle[url]" label="链接" info="请输入该文章的链接" placeholder="例：http://www.ftchinese.com/interactive/12026?adchannelID=5000&exclusive#adchannelID=1100" fieldSetName="头条文章" />
      <TextInput name="headArticle[pic]" label="图片" info="请输入该文章的图片地址" placeholder="例：http://i.ftimg.net/picture/3/000078213_piclink.jpg" fieldSetName="头条文章" />

      <TextInput name="articleList[0][tag]" label="标签" info="请输入该文章的标签tag" placeholder="例：海外生活" fieldSetName="列表文章1"/>
      <TextInput name="articleList[0][title]" label="标题" info="请输入该文章的标题" placeholder="例：Foreign postings help us become more self-aware" fieldSetName="列表文章1" />
      <TextInput name="articleList[0][url]" label="链接" info="请输入该文章的链接" placeholder="例：http://www.ftchinese.com/interactive/12028?adchannelID=5000&exclusive&ccode=2G186011&type=video#adchannelID=1100" fieldSetName="列表文章1" />
      <TextInput name="articleList[0][pic]" label="图片" info="请输入该文章的图片地址" placeholder="例：http://i.ftimg.net/picture/4/000078214_piclink.jpg" fieldSetName="列表文章1" />

      <TextInput name="articleList[1][tag]" label="标签" info="请输入该文章的标签tag" placeholder="例：健康" fieldSetName="列表文章2" />
      <TextInput name="articleList[1][title]" label="标题" info="请输入该文章的标题" placeholder="例：Death’s understudy: what sleep can teach medicine" fieldSetName="列表文章2" />
      <TextInput name="articleList[1][url]" label="链接" info="请输入该文章的链接" placeholder="例：http://www.ftchinese.com/interactive/11925?adchannelID=1100&exclusive#adchannelID=1100" fieldSetName="列表文章2" />
      <TextInput name="articleList[1][pic]" label="图片" info="请输入该文章的图片地址" placeholder="例：http://i.ftimg.net/picture/5/000078215_piclink.jpg" fieldSetName="列表文章2" />

      <TextInput name="articleList[2][tag]" label="标签" info="请输入该文章的标签tag" placeholder="例：单曲鉴赏" fieldSetName="列表文章2" />
      <TextInput name="articleList[2][title]" label="标题" info="请输入该文章的标题" placeholder="例：The Life of a Song：Hell Hound On My Trail" fieldSetName="列表文章2" />
      <TextInput name="articleList[2][url]" label="链接" info="请输入该文章的链接" placeholder="例：http://www.ftchinese.com/interactive/11934?adchannelID=1100&exclusive#adchannelID=1100" fieldSetName="列表文章2" />
      <TextInput name="articleList[2][pic]" label="图片" info="请输入该文章的图片地址" placeholder="例：http://i.ftimg.net/picture/9/000077559_piclink.jpg" fieldSetName="列表文章2" />
    </Form>

    
  </div>,
  document.getElementById('root')
);