# 概述
  这是一个简单的基于Node的web 静态服务器, 在所在的目录命令行输入`rtp(run-this-place)`即可将当前的文件夹做为一个web容器运行,
随后可在浏览器中输入`http://localhost`来访问.

# 前提条件

本地安装了npm & node环境

# 安装

```
$npm install run-this-place
```

# 命令行可选参数
```
--default=filename  the default filename to show
--path=x:/xx/xx     execute path , disc absolute path
--port=8080         the server port default is 8080
-h, --help          display this help and exit
-v, --version       output version information and exit
```
## Example
`$rtp --port=8080 --path=E://xx//yy --default=default.html`该命令将会将访问端口修改为8080, 指定路径`E://xx//yy`为web静态服务器的根路径, 如果url中没有指定访问的文件默认为指定文件夹下的`index.html`文件,也可以使用命令行参数`--default`指定,上述命令将默认访问文件修改为default.html
