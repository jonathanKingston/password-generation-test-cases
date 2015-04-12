var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 3000));

app.post('/tests/5/login-submit', httpLoginSubmit);
app.post('/tests/3/login-submit', httpLoginSubmit);
app.post('/tests/1/login-submit', httpLoginSubmit);

function httpLoginSubmit(req, res) {
  res.send('Form submitted. Username: ' + req.body.username + ' Password: ' + req.body.password );
}

app.post('/tests/4/register-submit', httpRegisterSubmit);
app.post('/tests/6/register-submit', httpRegisterSubmit);

function httpRegisterSubmit(req, res) {
  res.send('Form submitted. Name: ' + req.body.name + ' Username: ' + req.body.username + ' Password: ' + req.body.password + '<br /><a href="/tests/5">Login test</a>');
}

app.post('/tests/2/login-submit', function (req, res) {
  if (req.body.username === 'user' && req.body.password === 'password') {
    res.cookie('authdemo', '1qwe2qeqt4t23r23r', { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.status(200).send({loggedin: true}).end();
  } else {
    res.status(400).send({loggedin: false}).end();
  }
});

app.use(express.static('public'));

var server = app.listen(app.set('port'), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

});
