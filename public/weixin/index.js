global.appname = 'weixin';
global.path_root = __dirname + '/../../application/';
var app = require(global.path_root + '/lib/core/boot');
app.listen(3000);
console.log('Express started on port 3000');