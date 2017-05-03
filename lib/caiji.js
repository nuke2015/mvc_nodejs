var http = require("http");
var url = require("url");
// 采集
// caiji.get(URL_INTERFACELIFE, function(req, res, body) {
//         console.log(req, res, body);
//     });
exports.get = function dataRequest(dataUrl, referUrl, cb) {
    var obj_url = url.parse(dataUrl);
    if (!referUrl) referUrl = dataUrl;
    var req = http.request({
        'host': obj_url.host,
        'path': obj_url.pathname,
        'method': 'GET',
        'headers': {
            'Referer': referUrl,
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36'
        }
    }, function(res) {
        res.on('data', function(data) {
            cb(data);
        });
    });
    req.end();
}
