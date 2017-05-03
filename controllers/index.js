var caiji = require(global.path_root + '/lib/caiji');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
exports.index = function(req, res) {
    var url_to = 'http://hq.sinajs.cn/list=sh600595';
    var caiji = require(global.path_root + '/lib/caiji');
    caiji.get(url_to, url_to, function(data) {
        data = iconv.decode(data, 'GBK');
        console.log(data);
    });
};