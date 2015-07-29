// ================================
// 日志记录，整合log4js & morgan 
// ================================

var grunt = require('grunt'),
    _ = require('underscore'),
    log4js = require('log4js'),
    morgan = require('morgan');

// workDir 为当前工作目录
var httpLog,
    errLog,
    outLog,
    morganType,
    httpMorganLog,
    workDir = process.cwd(),
    configJson = grunt.file.readJSON(__dirname + '/log4js.json');

// 检测当前工作目录是否存在对应的日志文件不存在则创建
_.each(configJson.appenders, function(v, k){
    var filePath = workDir + '/' + v.filename;

    // 如果文件不存在则创建
    if(!grunt.file.exists(filePath)){
        try{
            grunt.file.write(filePath, '## start record ' + v.category + ' log!\n');
        }catch(e){
            console.log('create file error > ' + e.message);
        }
    }


    
});

// bind config file
log4js.configure(__dirname + '/log4js.json');
// 助手方法
var fn = {
    empty: function(){}
};

errLog = log4js.getLogger('err'),
outLog = log4js.getLogger('out'),
httpLog = log4js.getLogger('http');

// 创建morgan http log日志记录对象
if(configJson.morgan){
    morganType = configJson.morgan.type;
}
httpMorganLog = morgan(morganType,
                            {
                                stream: {
                                    write:function(str){httpLog.info(str);}
                                }
                        });

// 到导出对应的方法
// must return a function , otherwise the log4js report a error
module.exports.trace = function(str){outLog.trace(str)};
module.exports.debug = function(str){outLog.debug(str)};
module.exports.info = function(str){outLog.info(str)};
module.exports.warn = function(str){outLog.warn(str)};
module.exports.error = function(str){errLog.error(str)};
module.exports.fatal = function(str){errLog.fatal(str)};
module.exports.http = function(req, res){httpMorganLog(req, res, fn.empty);};