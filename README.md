# picgo-plugin-moon-txom

为 [PicGo](https://github.com/Molunerfinn/PicGo) 开发的一款插件，新增了moon-txom玄兔图床。
该上传插件将图片上传到用户的素材管理中心。填写`Cookie`即可，获取方式在下面。

## 目录
1. [安装](#安装)
2. [获取API和Cookie](#获取API和Cookie)
3. [图片样式](#图片样式)
4. [解决防盗链](#解决防盗链)

## 安装

- 在线安装

  打开 [PicGo](https://github.com/Molunerfinn/PicGo) 详细窗口，选择**插件设置**，搜索**picgo-plugin-moon-txom**安装，然后重启应用即可。

- 离线安装

  克隆该项目，复制项目到 以下目录：
    - Windows: `%APPDATA%\picgo\`
    - Linux: `$XDG_CONFIG_HOME/picgo/` or `~/.config/picgo/`
    - macOS: `~/Library/Application\ Support/picgo/`

  切换到新目录执行 `npm install ./picgo-plugin-moon-txom`，然后重启应用即可。


## 获取API和Cookie

1. [获取API和Cookie](https://zhuanlan.zhihu.com/p/597017126)

## 图片样式

例如原图： <a href="http://example.com/0" rel="noreferrer" target=”_blank“>http://example.com/0</a>

| Type  | Url     | 
| ------| --------|
| 原图压缩WebP  | baseURL/0  |
| 原有体积2倍？可能压缩宽高不大于640  | baseURL/640  |
| 原图压缩WebP？可能压缩宽高不大于640  | baseURL/641  |
| 原有体积2倍？可能压缩宽高不大于1000  | baseURL/1000  |


## 解决防盗链

>通常网站开启防盗链，利用的是HTTP的Referer属性做判断。

#### 站点页面使用

HTML的Head区中定义如下元信息。

```html
<meta name="referrer" content="no-referrer">
```

#### 新窗口打开使用

A标签中属性设置`rel="noreferrer"`。

```html
<a rel="noreferrer" target="_blank"></a> 
```


