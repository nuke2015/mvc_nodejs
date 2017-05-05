var express = require('express'),
    fs = require('fs');
module.exports = function(parent, options) {
    var verbose = options.verbose;
    var path_ctrl = global.path_root + '/' + global.appname + '/controllers/';
    fs.readdirSync(path_ctrl).forEach(function(name) {
        name = name.substring(0, name.length - 3);
        verbose && console.log('\n   Controller == %s:', name);
        var obj = require(path_ctrl + name + '.js'),
            name = obj.name || name,
            prefix = obj.prefix || '',
            app = express(),
            method, path;
        app.set('views', global.path_root + '/views/' + name);
        if (name == 'index') {
            path = '/';
            app.all(path, obj.index); //Ĭ��·��;
            path = '/' + name;
            app.all(path, obj.index); //Ĭ��·��;
        }
        //path = prefix + path;
        if (obj.before) {
            path = '/' + name;
            app.all(path, obj.before); //ȫ��ǰ��;
            verbose && console.log('     ALL %s -> before', path);
            for (var key in obj) {
                if (~['name', 'prefix', 'index', 'before'].indexOf(key)) continue;
                path = '/' + name + '/' + key;
                app.all(path, obj.before); //ȫ��ǰ��;
                verbose && console.log('     ALL %s -> before', path);
            }
        }
        // generate routes based
        // on the exported methods
        for (var key in obj) {
            // "reserved" exports
            if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
            if (key && name) {
                method = 'all';
                path = '/' + name + '/' + key;
                app[method](path, obj[key]);
            }
            if (key == 'index') {
                method = 'all';
                path = '/' + name;
                app[method](path, obj['index']); //Ĭ�Ϸ���;
                app[method](path + '/index', obj['index']); //Ĭ�Ϸ���;
            }
            verbose && console.log('     %s %s -> %s', method.toUpperCase(), path, key);
        }
        // mount the app
        parent.use(app);
    });
};