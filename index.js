var app = require("./config/express")();
var http = require("http").Server(app);

var port = process.env.SERVER_PORT || 3000;
var server = http.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('App running on port 3000!');

});