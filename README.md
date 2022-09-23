# 项目简介

采用uni-app（vue2）开发的社区交友类app，临摹对象为Facebook

# day1

## 1.配置开发环境

#### 1.1 HBuilderX配置

安装必要插件：App真机运行、es6编译、less编译、uni-app编译等

#### 1.2 模拟器调试

##### 1.2.1 安卓模拟器

单独启动Android Studio模拟器：

```cmd
> cd D:/IDEA/Sdk/emulator
> .\emulator.exe -list-avds  // 查看模拟器型号列表
Nexus_4_API_24
> .\emulator.exe -avd Nexus_4_API_24 // 启动对应模拟器
```

##### 1.2.2 微信小程序开发者工具

申请/获取应用Appid：[小程序 (qq.com)](https://mp.weixin.qq.com/wxamp/wadevelopcode/sandbox?token=1864288479&lang=zh_CN)，打开小程序开发者工具并创建临时应用，安全设置里打开服务端口

将开发者工具安装路径配置到HBuilderX中并运行>运行到小程序模拟器>微信小程序开发者工具

填入appid绑定

##### 1.2.3 支付宝小程序开发者工具

登录[支付宝开放平台](https://auth.alipay.com/login/ant_sso_index.htm?goto=https%3A%2F%2Fopen.alipay.com%2Fplatform%2FdeveloperIndex.htm)，创建应用

将开发者工具安装路径配置到HBuilderX中并运行>运行到小程序模拟器>支付宝小程序开发者工具

打开小程序开发者工具，打开项目，目录填写HBuilderX控制台提示的url，绑定之前创建的应用。

## 2.项目初始化

#### 2.1 创建项目并导入公共CSS

HBuilderX新建uni-app(vue2)项目，选则空模板

另建demo项目，从中复制`common/uni.css`和`static/uni.ttf`两个文件至原项目中

App.vue中`@import './common/uni.css';`导入公共CSS

#### 2.2 引入自定义字体图标库

解决uni-app引入iconfont矢量图标库报 文件查找失败：'./iconfont.eot?的错误

修改iconfont.css 文件内@font-face下的URL路径，在前面加上`~@/static/icon/`

然后App.vue中全局引入`@import './static/icon/iconfont.css';`

使用：

```html
<text class="iconfont icon-Name">字体</text>
```

#### 2.3 引入CSS动画库

直接App.vue中全局引入链接：（易出错！）

```js
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css);
```

或者下载animate.min.css后修改`:root`为`page`再引入：（稳妥）

```js
@import './common/animate.min.css';
```

使用方式1：class：一次性动画（任何元素）

```html
<h1 class="animate__animated animate__Name">动画</h1>
```

使用方式2：hover-class：点击动画（仅限view）按住动画（其他元素）

```html
<view class="animate__animated" hover-class="animate__headShake">动画</view>
```

#### 2.4 配置全局属性globalStyle

```json
"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "facelook",
		"navigationBarBackgroundColor": "#fff",
		"backgroundColor": "#fff"
	},
```

## 3.配置底部导航栏

#### 3.1 引入8个按钮图片

iconfont自定义下载，大小81

放入static/tabbar

#### 3.2 新建基础页面

page中新建4个页面：index、msg、news、user

#### 3.3 pages.json注册

```json
"tabBar": {
		"color": "#2b2b2b",
		"selectedColor": "#050505",
		"borderStyle": "#e5e5e5",
		"blurEffect": "light",
		"list": [{
				"pagePath": "pages/index/index",
				"text": "首页",
				"iconPath": "static/tabbar/home.png",
				"selectedIconPath": "static/tabbar/homeed.png"
			},...]
},
```

注意：list数组中的对象键值对要以逗号分隔且最后一组后面不可加逗号

## 4.配置基础页

#### 4.1 配置pages节点

给首页、个人主页、动态、通知、菜单五个基础页注册

#### 4.2 配置首页style节点

用于设置每个页面的状态栏、导航条、标题、窗口背景色等

#### 4.3 配置首页导航栏titleNView节点

按钮使用iconfont需要引入ttf文件，unicode码也要把前三位替换成\u，且分号省略

# day2

## 1.封装page-item组件

#### 1.1 页面结构

大量使用Flex布局

- flex（flex(头像/昵称)关注）

- 标题

- 图片image

- 按钮组


#### 1.2 动态绑定数据

v-bind绑定属性； {{}}绑定内容

#### 1.3 给按钮绑定事件

头像：打开个人空间

关注：关注动画

标题/图片：打开文章详情页

顶踩评论分享等

#### 1.4 关注功能

首先绑定follow点击回调，输出一个自定义事件，参数e为点击列表的index

v-if判断item.isFollow，动态切换“关注”和“已关注”的按钮样式

首页组件中@接收自定义事件并绑定onfollow回调，在该回调中判断`this.list[e].isFollow`真假并作出修改，调用`uni.showToast`原生API弹出“关注成功”提示框。

#### 1.5 顶踩业务逻辑（难点）

<img src=".\static\bgimg\image-20220920094007638.png"  />

#### 1.6 注意事项

只需自定义组件安装在项目的 components目录下，并符合 **components/`组件名称`/`组件名称.vue`** 目录结构。就可以不用引用、注册，直接在页面中使用。

## 2.完善首页布局

#### 2.1 内容区推荐列表

顶部为分享动态长条，由用户头像+提示文字+编辑图标组成，flex布局并绑定点击事件进入编辑页

下方`v-for`循环page-item组件，中间插入分割线

#### 2.2 上拉加载组件

最底部给段文字view，有2个状态：

- 默认状态显示：“上拉加载更多”
- 加载状态显示：“正在加载”

当文章列表滑到最底部，触发`scrolltolower`事件：

**节流操作：**首先判断状态是不是“加载中”，是则return，不是则继续：

1. 修改状态并进行文章加载
2. 定时器恢复状态

#### 2.3 空白组件

封装空白组件，用于没数据时展示

`view`嵌套一个`image`和`text`，并注册为全局组件

## 3.搜索组件的封装

#### 3.1 页面结构

- 搜索历史标签 `v-if="searchRes.length===0"`
- 搜索结果展示 `v-else`

#### 3.2 搜索历史标签

利用flex布局，并设置`flex-wrap`自动换行，`v-for`动态渲染历史标签，并用`template`包裹

#### 3.3 搜索结果列表展示

`template`包裹block包裹news-item公共组件

搜索框文本变化生命周期：`onNavigationBarSearchInputChanged`

点击搜索按钮生命周期：`onNavigationBarSearchInputConfirmed`

#### 3.4 搜索业务逻辑

触发搜索回调，接收搜索文本为参数：

1. 收起键盘 `uni.hideKeyboard()`
2. 参数放入历史记录栈（去重）
3. 开启loading加载动画 `uni.showLoading(）`
4. 请求数据，返回Promis，成功关闭loading加载动画并将结果赋值到本地data缓存，失败则弹出错误提示框

# day3

## 1.封装创建帖子页面

#### 1.1 自定义导航栏

采用官方提供的uni-nav-bar 自定义导航栏组件

左边：返回按钮，中间：创建帖子，右边：发帖按钮

#### 1.2 编辑区域

用textarea作为编辑文字的区域

调用第三方组件`uni-file-picker` 用来选择并展示图片

#### 1.3 底部操作条

由 图片、标签、表情、位置、键盘5个按钮组成

全局配置文件设置：`"softinputMode": "adjustResize"` 可使底部操作条跟随键盘高度浮动

图片按钮：调用uni-file-picker组件内部的选图片方法

## 2.保存草稿功能开发

#### 2.1 触发逻辑

将触发点绑定到返回按钮的点击事件里

当点击返回，判断是否有输入内容，如果没有执行返回；如果有则跳出弹窗，询问是否要保存草稿

当进入创帖页面时，在`onLoad()`钩子中检查本地缓存有无草稿，有则还原

#### 2.2 保存草稿的方法

触发保存草稿，即通过`uni.setStorage`接口将文本和图片路径作为对象，并用`JSON.stringify`方法转成json格式保存。

触发还原草稿，即通过`uni.getStorage`接口获取本地缓存，若有则将其`JSON.parse`转成对象并依次给data赋值

## 3.动态页开发

采用顶部分类导航滚动展示长列表的布局

## 4.顶部分类导航

#### 4.1 主要布局和内置组件的使用

首先用`scroll-view`包裹并设置横向滚动 `scroll-x`

里面嵌套`view`容器

#### 4.2 具体实现

`v-for` tabBars循环`view`组件，动态渲染分类名，并绑定点击事件changeTab传入index参数

data有2个参数：`tabIndex`（记录当前的下标）`scrollinto`（记录要滚动的位置）

#### 4.3 内容区与顶部导航匹配

在导航栏下面创建滑块视图容器`swiper`作为内容区，current动态绑定tabIndex

`v-for` tabBars循环`swiper-item`组件，作为每个分类对应的内容区

`swiper`绑定`@change`事件监听滚动，并调用changeTab同步改变顶部选项的状态

#### 4.4 swiper容器配置

结构：

# day4

## 1.消息页面开发

#### 1.1 消息列表item组件的封装

flex布局，由头像，用户昵称，最近消息，时间4个部分组成

接收2个参数：item对象和index下标，动态渲染内容

用到的第三方组件：

- `uni-badge`角标
- `time.js`时间库

消息预览部分需要限制最大宽度，超出隐藏并展示省略号

#### 1.2 下拉刷新

全局配置文件中，`"enablePullDownRefresh": true,`打开页面的下拉刷新，通过`onPullDownRefresh()` 监听下拉刷新

#### 1.3 导航栏配置

在全局配置文件中，对导航栏进行配置，打开返回按钮、标题居中、右边两个按钮：清除缓存和联系人，通过`onNavigationBarButtonTap`监听导航栏的按钮点击事件，弹出层插件`uni-popup`弹出二级菜单

## 2.我的好友页面



