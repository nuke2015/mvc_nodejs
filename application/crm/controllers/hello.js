exports.index = function(req, res) {
    res.send('hello/index');
};
exports.world = function(req, res) {
    res.send('hello/world');
};
exports.list = function(req, res) {
    var data = [{
        'title': 'fengfeng',
        'id': 1
    }, {
        'title': 'fengfeng 22',
        'id': 2
    }, {
        'title': 'fengfeng 3',
        'id': 3
    }]
    res.render('list', {'users':data});
};