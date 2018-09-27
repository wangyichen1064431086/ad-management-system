# h5-management-system

The system for editing the content data of h5 ads and showing the different ad formats.

## 修改、发布过程
### 1.克隆代码到本地: 

```c
git clone https://github.com/wangyichen1064431086/h5-management-system
```
最好是Fork一份到你自己的仓库。

### 2. 安装所需依赖包
```c
npm install
```

### 3. 本地使用开发环境开发
```c
npm start
```
并打开浏览器 localhost:5000

### 4. 本地测试生成环境
```c
npm run build
```

### 5. 提交到github
首先保证此时的本地api数据和线上的一样，执行:
```c
npm run getapidata
```

再提交:
```c
git add .
git commit -m 'Modify something'
git push
```

### 6. 在服务器上pull
登录服务器, 进入项目h5-management-system。

> 注意:在pull之前一定要保证你的github仓库里的api目录下的json数据和线上的一致，即一定执行了5.中的npm run getapidata

pull下来最新的代码并忽略本地修改(服务器上能发送本地修改的就是api目录下的json数据，这是因为市场部提交了新的数据，但是由于github仓库中已经同步了市场部的数据，故强制忽略本地修改并没有任何影响):

```c
git reset --hard
git pull
```

> 注意：目前服务器上该目录下git账号是我的，所以如果新的开发人员想要使用自己的git账号及对应git仓库，需要重新配置一下本目录的git用户。


### 7. TODO
api数据处理部分目前还比较丑陋（如6.所述）。

目前仅仅是用几个json文件来保存数据。

如有精力，可以将这部分进行升级优化，例如使用数据库保存，或者使用一种更优雅的方式来更新这几个json文件。