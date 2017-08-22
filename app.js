var express = require('express');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(session({
    store: new FileStore({
        reapInterval: 15,
        ttl: 15,
    }),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

// app.use(session());

app.get('/', function (req, res) {
  if (req.session.views) {
    req.session.views++;
    console.log('\n\nreq.session\n', req.session)
    console.log('\n\nreq.session.random\n', req.session.random)
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.end();
  } else {
    req.session.views = 1;
    req.session.random = Math.random().toFixed(3);
    res.redirect('/')
    // res.end('Welcome to the file session demo. Refresh page!');
  }
});

var server = app.listen(1337, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
