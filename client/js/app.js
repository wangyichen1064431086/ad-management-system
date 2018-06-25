import React from 'react';
import ReactDOM from 'react-dom';

import Header from '@ftchinese/ftc-header-react-new';
import { pushdownMenuData, signData, channelData} from './data/forHeader';

import Form from './components/Form';
import TextInput from './components/TextInput';
//import FormSection from './components/FormSection';

ReactDOM.render(
  <div>
    <Header 
      customHomeTitle="广告管理系统"

      pushdownMenuData={pushdownMenuData}

      signData={signData}
      signedFlagCookieName='USER_NAME'

      dynamicNav={false}
      navChannelData={channelData}
      navDefaultTopOrder={0}
      navDefaultSubOrder={0}

      searchPostUrl={"/search"}
      searchPlaceHolder={"输入年月日‘xxxx-xx-xx’可搜索该日存档" }
    />
    
    <p>请根据实际需要编辑数据</p>

    <Form actionUrl="/datapost/fornews">
      <TextInput name="ccode" label="ccode编号" info="请输入广告的ccode" placeholder="例：2G186012" />
      <TextInput name="topTitle" label="顶部标题" info="请输入广告的顶部标题" placeholder="例：付费热门文章" />

      {/* <FormSection sectionName="头条文章"> */}
        <TextInput name="headArticle[title]" label="标题" info="请输入该文章的标题" placeholder="例：A股停牌问题仍困扰国际投资者" fieldSetName="头条文章" />
        <TextInput name="headArticle[url]" label="链接" info="请输入该文章的链接" placeholder="例：http://www.ftchinese.com/story/001077926?exclusive" fieldSetName="头条文章" />
        <TextInput name="headArticle[pic]" label="图片" info="请输入该文章的图片地址" placeholder="例：http://i.ftimg.net/picture/8/000066228_piclink.jpg" fieldSetName="头条文章" />
      {/* </FormSection> */}

      {/* <FormSection sectionName="列表文章1"> */}
        <TextInput name="articleList[0][tag]" label="标签" info="请输入该文章的标签tag" placeholder="例：FT大视野" fieldSetName="列表文章1"/>
        <TextInput name="articleList[0][title]" label="标题" info="请输入该文章的标题" placeholder="例：A股入摩将重塑全球股市格局" fieldSetName="列表文章1" />
        <TextInput name="articleList[0][url]" label="链接" info="请输入该文章的链接" placeholder="例：http://www.ftchinese.com/story/001077926?exclusive" fieldSetName="列表文章1" />
      {/* </FormSection> */}

      {/* <FormSection sectionName="列表文章2"> */}
        <TextInput name="articleList[1][tag]" label="标签" info="请输入该文章的标签tag" placeholder="例：自由贸易" fieldSetName="列表文章2" />
        <TextInput name="articleList[1][title]" label="标题" info="请输入该文章的标题" placeholder="例：谁会成为全球贸易新霸主？" fieldSetName="列表文章2" />
        <TextInput name="articleList[1][url]" label="链接" info="请输入该文章的链接" placeholder="例：http://www.ftchinese.com/premium/001077906?exclusive" fieldSetName="列表文章2" />
      {/* </FormSection> */}

      {/* <FormSection sectionName="列表文章3"> */}
        <TextInput name="articleList[2][tag]" label="标签" info="请输入该文章的标签tag" placeholder="例：中国市场" fieldSetName="列表文章3" />
        <TextInput name="articleList[2][title]" label="标题" info="请输入该文章的标题" placeholder="例：在华外企日益沮丧" fieldSetName="列表文章3" />
        <TextInput name="articleList[2][url]" label="链接" info="请输入该文章的链接" placeholder="例：http://www.ftchinese.com/premium/001077859?exclusive" fieldSetName="列表文章3" />
      {/* </FormSection> */}
    </Form>

    
  </div>,
  document.getElementById('root')
);