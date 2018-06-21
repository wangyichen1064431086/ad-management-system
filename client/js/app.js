import Header from '@ftchinese/ftc-header-react-new';
import React from 'react';
import ReactDOM from 'react-dom';

import { pushdownMenuData, signData, channelData} from './dataForHeader';

ReactDOM.render(
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
  />,
  document.getElementById('root')
);