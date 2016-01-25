#!/usr/bin/env node

//------------------------------------------------ 
// 将当前文件夹作为一个web服务供访问，简单的基于node 
// 的静态web服务器
//------------------------------------------------ 

//开始服务启动计时器 
console.time('[Airserver][Start]');

//请求模块 
var http = require('http'),
    url = require('url'),
    fs = require("fs"),
    mime = require('mime'),
    grunt = require('grunt'),
    path = require("path"),
    argvs = require('./argvs'),
    logger = require('./log');

//Web服务器主函数,解析请求,返回Web内容 
var main = function(req, res) {
        var reqUrl = req.url; 
        //记录请求信息
        logger.http(req, res);
        
        //使用url解析模块获取url中的路径名 
        var pathName = url.parse(reqUrl).pathname;

        //补全文件路径
        if (path.extname(pathName) == "") {

            if(!/\/$/.test(pathName)){
                pathName += '/';
            }

            pathName += argvs.getDefault();
        }

        //使用路径解析模块,组装实际文件路径 
        var filePath = path.join(argvs.getPath(), pathName);

        //判断文件是否存在 
        fs.exists(filePath, function(exists) {
            try{
                if (exists) {
                    //在返回头中写入内容类型 
                    res.writeHead(200, {
                        "Content-Type": mime.lookup(filePath)
                    });

                    //创建只读流用于返回 
                    var stream = fs.createReadStream(filePath, {
                        flags: "r",
                        encoding: null
                    });

                    //指定如果流读取错误,返回404错误 
                    stream.on("error", function() {
                        res.writeHead(404);
                        res.end('<h1>500 the file [path=' + filePath +'] Read Error!</h1>');
                    });
                    //连接文件流和http返回流的管道,用于返回实际Web内容 
                    stream.pipe(res);
                } else {
                    //返回404错误 
                    res.writeHead(404, {
                        "Content-Type": "text/html"
                    });
                    res.end('<h1>404 Not Found file [path=' + filePath + ']</h1>');
                }
            }catch(e){
                logger.error('read file from [' + filePath + '] error!');
            }
        });
    }

//创建一个http服务器 
var server = http.createServer(main);

//指定服务器错误事件响应 
server.on("error", function(error) {
    logger.error(error);
});

//开始侦听8124端口 
server.listen(argvs.getPort(), function() {
    //向控制台输出服务启动的信息 
    console.log('[Airserver][Start] running at http://localhost:'+ argvs.getPort() + '/');
    //结束服务启动计时器并输出 
    console.timeEnd('[Airserver][Start]');
});