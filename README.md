# demo-show

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 安装 axios

```
npm install axios
```

### 安装 mockjs

```
npm install mockjs
```

### 安装 echarts

```
npm install echarts --save
```

### 安装 dat.gui

```
npm install --save dat.gui
```

### 服务器安装 code-server

- 手动下载 tar.gz 包

```
https://github.com/coder/code-server/releases/tag/v4.10.0
```

- 解压 tar.gz 包

```
tar -xvzf code-server-4.10.0-linux-amd64.tar.gz
```

- 改名

```
mv code-server-4.10.0-linux-amd64.tar.gz code-server
```

- 创建一个 screen

```
yum install screen
screen -S mycodeserevr
```

- 找到/usr/local/vscode/code-server/bin 目录下的 code-server 并运行

```
./code-server
```

- 修改 code-server 配置项

```
vi ~/.config/code-server/config.yaml

bind-addr: 0.0.0.0:8888
auth: password
password: 123qwe
cert: false
```
