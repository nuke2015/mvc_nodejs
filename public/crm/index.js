global.appname = 'crm';
global.path_root = __dirname + '/../../application/';
var app = require(global.path_root + '/lib/core/boot');
app.listen(8000);
console.log('Express started on port 8000');