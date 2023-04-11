# 项目简介

采用uni-app（vue2）开发的社区交友类app，临摹对象为Facebook

`git add .`

`git commit -m "a"`

`git push 更新`

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

#### 3.1 引入按钮图片

iconfont自定义下载，大小81

放入static/tabbar目录下

#### 3.2 新建基础页面

page中新建5个页面：index、msg、news、user、menu

#### 3.3 pages.json全局注册

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

**注意：**list数组中的对象键值对要以逗号分隔且最后一组后面不可加逗号

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

<img src=".\md-demo1.png"  />

#### 1.6 注意事项

只需自定义组件安装在项目的 components目录下，并符合 **components/`组件名称`/`组件名称.vue`** 目录结构。就可以不用引用、注册，直接在页面中使用。

## 2.完善首页布局

#### 2.1 推荐内容-长列表

顶部为分享动态长条，由用户头像+提示文字+编辑图标组成，flex布局并绑定点击事件进入编辑页

采用了`scroll-view`包裹，性能不及预期

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

## 1.封装新建帖子页面

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

#### 3.1 顶部分类导航

首先用`scroll-view`包裹并设置横向滚动 `scroll-x`

里面嵌套`view`容器

#### 3.2 具体实现

`v-for` tabBars循环`view`组件，动态渲染分类名，并绑定点击事件changeTab传入index参数

data有2个参数：`tabIndex`（记录当前的下标）`scrollinto`（记录要滚动的位置）

#### 3.3 内容区与顶部导航匹配

在导航栏下面创建滑块视图容器`swiper`作为内容区，current动态绑定tabIndex

`v-for` tabBars循环`swiper-item`组件，作为每个分类对应的内容区

`swiper`绑定`@change`事件监听滚动，并调用changeTab同步改变顶部选项的状态

#### 3.4 swiper容器配置

结构：

##### 难点：计算滚动容器高度

最佳计算方法：

容器高度 = 可使用窗口高度 - 手机状态栏的高度（可选） - 自定义横幅导航高度（可选）

`this.scrollH = res.windowHeight - res.statusBarHeight - 30`

##### 注意：

`getSystemInfo` 获取到的 `windowHeight` 在模拟器中值不正确，真机预览是正确的

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

在全局配置文件中，对导航栏进行配置，打开返回按钮、标题居中、右边两个按钮：清除缓存和联系人，通过`onNavigationBarButtonTap`监听导航栏的按钮点击事件，弹出层插件`uni-popup`弹出二级菜单。

## 2.好友列表页面

#### 2.1 导航栏配置

一个搜索框 + 一个取消按钮

#### 2.2 页面开发

**总体结构：**左右滑动的长列表

上面导航栏有3个分类：互关、关注、粉丝；文字旁边是数字

下面是对应的长列表，采用swiper > swiper-item包裹，内容是scroll-view滚动区域，区域高度计算`this.scrollH = res.windowHeight - uni.upx2px(100);`

## 3.个人主页开发

#### 3.1 主要布局

从上到下依次为：背景墙、用户头像、2个按钮（发布动态、编辑资料）、个人信息、个人标签、近期动态长列表

#### 3.2 难点

没啥难点，大量使用flex布局，长列表按需加载

## 4.菜单页面开发

#### 4.1 导航栏配置

左：菜单文字，右：设置按钮+搜索按钮

#### 4.2 快速访问项目按钮组

flex布局，上下左右对齐，自动换行，没什么难度

按钮细节处理：加圆角、加阴影、加点击效果

#### 4.3 折叠区实现

首先自己尝试手写组件，采用伪元素+按需显示/隐藏+元素移动+过渡动画；发现效果和性能都很堪忧，无奈采用官方提供的组件

`uni-collapse > uni-collapse-item`

折叠2个内容：帮助与支持、设置与隐私，效果不错，加上过渡动画性能堪忧

最后是一个退出按钮，没什么技术含量

最最后是版权信息，标注了非商业用途

# day5

## 1.聊天页实现

#### 1.1 底部输入栏

固定定位，左：相机图标，中：输入框，右：发送按钮

输入框一个`flex:1`，再加圆角，其余给左右外边距

配置pages.json时要加`"softinputMode": "adjustResize",`这一项，以便自动悬浮在软键盘之上

#### 1.2 聊天窗口实现

采用`scroll-view`实现长列表，动态绑定`scroll-into-view`实现自动滚动到最下面的气泡， `scroll-with-animation`开启滚动动画

#### 1.3 独立封装气泡组件

聊天气泡有2种，我方和对方，v-if 动态切换显示，气泡要设置最大宽度

#### 1.4 完善业务逻辑

当输入完成点击发送后：

1. 判断内容不能为空
2. 清空输入框
3. 滚动到底部

**问题：**调用method里的“滚动到底部”方法不起作用

**分析：**页面未加载完成，无法操作元素

**解决：**采用$nextTick

#### 1.5 待解决的问题

当键盘弹起时，底部的输入栏正常随着键盘顶起，可是聊天列表无法跟着滚动到最下面

**尝试方法：**监听键盘高度变化，调用滚动到底部方法，失败

## 2.完善搜索页

#### 2.1 整理项目中的搜索页

首页：搜索帖子

动态：搜索帖子

菜单：全局搜索

好友列表：搜索用户

话题：搜索话题

#### 2.2 动态修改导航栏搜索框占位符

`navigateTo`跳转到新页面时，url路径后携带参数：`url: '../search/search?type=facelook',`

在搜索页通过 onLoad（e）生命周期`e.type`可以接收到传参

动态修改搜索页导航栏搜索框占位符：

```js
// #ifdef APP-PLUS
let currentWebview = this.$mp.page.$getAppWebview()
let tabNave = currentWebview.getStyle().titleNView
tabNave.searchInput.placeholder = pageTitle
currentWebview.setStyle({
	titleNView: tabNave
})
// #endif
```

# day6

## 1.帖子详情页

#### 1.1 配置pages.json

主要配置”更多“按钮，中间为facelook标志

#### 1.2 详情页传递数据

在帖子item中`navigateTo`的url中通过拼接动态传入数据

在帖子详情页`onLoad`里接收数据并存到本地data中

#### 1.3 底部输入栏

评论栏，固定定位，一个照片图标一个输入框

#### 1.4 评论区

v-if遍历渲染每一个评论item，包括头像、昵称、点赞、回复按钮、时间

## 2.编辑用户资料页

#### 2.1 主要布局

若干列表 + 确认修改按钮

列表采用`uni-list-item`组件 + 自定义插槽完成

#### 2.2 难点

修改头像：`uni.chooseImage`接口获取图片

修改用户名：input插槽，v-model绑定

修改性别/情感/职业：`uni.showActionSheet`接口弹出选择器，数组下标绑定对应字符串

修改生日：`uni-datetime-picker`日期选择器

修改家乡：`ming-picker`第三方插件实现3层嵌套地址选择器

## 3.登录页

#### 3.1 全局配置

导航栏只保留一个返回按钮

#### 3.2 主要布局

上：facelook的logo

中（两种）：账号密码输入框 或 手机号验证码输入框，以及登录按钮

下：更多登录方式：微博、微信、QQ、支付宝

#### 3.3 表单验证

当点击登录按钮，触发`regPhone.test()`方法，正则判断号码格式等，触发提示框

#### 3.4 获取验证码的节流倒计时

点击“获取验证码”按钮后，先判断倒计时是否为0，不是则return，再验证手机号格式，然后赋值倒计时=60，最后设置定时器，1秒让倒计时自减，并把倒计时动态渲染到按钮上

#### 3.5 退出登录功能

`showActionSheet`从底部弹出提示框，确定退出后`uni.removeStorageSync('token');`清除本地token缓存，并`location.reload()`刷新页面

## 4.清除缓存功能

#### 4.1 实现方法

利用`clearStorageSync`方法清理缓存，再用`uni.showToast`接口弹出提示清理了多少缓存`getStorageInfoSync().currentSize`

# day7

## 1.登录功能完善

提交后端，成功后`setStorage`把token存本地，并`uni.navigateBack`关闭当前页面

##### 问题：如何刷新页面？如何检测用户登录状态从而渲染对应内容？

尝试：onLoad钩子函数里检测本地token储存`getStorageSync`，异步还是同步？均失败

最终：onShow钩子函数

## 2.全局配置

#### 2.1 监听设备网络状态

`uni.getNetworkType(CALLBACK)`

`uni.onNetworkStatusChange(CALLBACK)`

#### 2.2 热更新

小程序：

```js
// #ifdef MP-WEIXIN
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function (res) {
		  // 请求完新版本信息的回调
		  console.log(res.hasUpdate);
		});
		updateManager.onUpdateReady(function (res) {
		  uni.showModal({
		    title: '更新提示',
		    content: '新版本已经准备好，是否重启应用？',
		    success(res) {
		      if (res.confirm) {
		        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
		        updateManager.applyUpdate();
		      }
		    }
		  });
		});
		updateManager.onUpdateFailed(function (res) {
		  // 新的版本下载失败
		});
		// #endif
```

App-Plus:

```js
// #ifdef APP-PLUS  
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			uni.request({
				url: 'http://www.example.com/update/',
				data: {
		 		version: widgetInfo.version,
					name: widgetInfo.name
				},
				success: (result) => {
					var data = result.data;
					if (data.update && data.wgtUrl) {
						uni.downloadFile({
							url: data.wgtUrl,
		 				success: (downloadResult) => {
								if (downloadResult.statusCode === 200) {
									plus.runtime.install(downloadResult.tempFilePath, {
										force: false
									}, function() {
										console.log('install success...');
										plus.runtime.restart();
									}, function(e) {
										console.error('install fail...');
									});
								}
							}
						});
					}
				}
			});
		});
// #endif
```

## 3.性能优化

#### 3.1 动画效果优化

给所有item页面加class：animated fast fadeIn 淡入效果

#### 3.2 隐藏滚动条

```css
::-webkit-scrollbar{
	display: none;
}
```

#### 3.3 其他优化

减少节点嵌套层级和监听，延迟渲染等

## 4.微信小程序适配工作

#### 4.1 自定义导航栏

首先全局配置文件中app-plus：`"titleNView": false, // 禁用App原生导航栏`

然后在微信配置节点mp-weixin：`"navigationStyle":"custom",// 禁用微信原生导航栏`

最后在页面中用`uni-nav-bar`来自定义导航栏

##### 遇到的问题：uni-nav-bar在App-plus和H5中正常显示，但微信小程序不显示

**解决：**官方引入的uni组件在App-plus和H5中无需import引入和components注册即可使用，但是在微信小程序中不行，必须按部就班的引入注册方可正常显示

#### 4.2 打包发布

1. manifest.json中配置appid
2. 配置安全域名
3. 删除无用的静态资源
4. 压缩代码
