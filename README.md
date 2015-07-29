# 概述
  这是一个简单的基于Node的web 静态服务器, 在所在的目录命令行输入`airserver`即可将当前的文件夹做为一个web容器运行,
随后可在浏览器中输入`http://localhost`来访问.

# 前提条件

本地安装了npm & node环境

# 安装

git clone repo 至本地,进入对应的文件夹并执行以下命令,由于当前插件并没有发布到npm所以，将以clone到本地后放到一个相对固定的文件夹里
```
$npm install
$npm link
```

# 使用
```
--default=filename  the default filename to show
--path=x:/xx/xx     execute path , disc absolute path
--port=80           the server port default is 80
-h, --help          display this help and exit
-v, --version       output version information and exit
```
