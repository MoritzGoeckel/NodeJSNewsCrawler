var express = require('express'),
    expressRest = require('express-rest');
 
var app = express();
var rest = expressRest(app);
 
var records = [
    {value: 'Apple'},
    {value: 'Banana'}
];
 
rest.get('/api/food', function(req, rest) {
    rest.ok(records);
});
 
rest.get('/api/food/:id', function(req, rest) {
    var record = records[req.params.id];
    if (record) rest.ok(record);
    else rest.notFound();
});
 
rest.put('/api/food/:id', function(req, rest) {
    records[req.params.id] = req.body;
    return rest.accepted('/api/food/' + encodeURI(req.params.id));
});
 
rest.post('/api/food', function(req, rest) {
    records.push(req.body);
    rest.created('/api/food/' + (records.length - 1));
});
 
rest.delete('/api/food/:id', function(req, rest) {
    delete records[req.params.id];
    rest.gone();
})
 
 
app.listen();