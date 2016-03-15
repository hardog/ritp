// =================================
// 控制台参数处理
// =================================
var fs = require('fs');

var consoleArgvs = {};

var args = (process.ARGV || process.argv).slice(1);

var usage = "Usage: rtp filename [options] \n" +
    "Options:\n\n" +
    "   --default=filename   the default filename to show\n" +
    "   --path=x:/xx/xx      execute path , disc absolute path\n" +
    "   --port=8080          the server port default is 8080\n" +
    "   -h, --help           display this help and exit\n" +
    "   -v, --version        output version information and exit";

args.forEach(function(arg) {
    if (arg.slice(0, 10) === "--default=") {
        consoleArgvs['default'] = arg.slice(10);
    } else if (arg.slice(0, 7) === '--path=') {
        consoleArgvs['path'] = arg.slice(7);
    }else if (arg.slice(0, 7) === '--port=') {
        consoleArgvs['port'] = arg.slice(7);
    } else if (arg === '-h' || arg === '--help') {
        console.log(usage);
        process.exit(0);
    } else if (arg === '-v' || arg === '--version') {
        var content = fs.readFileSync(__dirname + '/package.json', 'utf8'),
            pkg = JSON.parse(content);
        console.log(pkg.version);
        process.exit(0);
    }
});

if (!consoleArgvs['default']) {
    consoleArgvs['default'] = 'index.html';
}

if(!consoleArgvs['port']){
    consoleArgvs['port'] = 8080;
}

if(!consoleArgvs['path']){
    consoleArgvs['path'] = process.cwd();
}

if(!/\/$/.test(consoleArgvs['path'])){
    consoleArgvs['path'] += '/';
}

module.exports.getDefault = function() {
    return consoleArgvs['default'];
};

module.exports.getPath = function(){
    return consoleArgvs['path'];
};

module.exports.getPort = function(){
    return consoleArgvs['port'];
};