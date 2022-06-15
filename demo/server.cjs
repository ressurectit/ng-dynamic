var connect = require('connect'),
    gzipStatic = require('connect-gzip-static'),
    serveStatic = require('serve-static'),
    history = require('connect-history-api-fallback'),
    {createProxyMiddleware} = require('http-proxy-middleware'),
    argv = require('yargs').argv,
    path = require('path'),
    connectExtensions = require('nodejs-connect-extensions');

require('dotenv').config();

var app = connect();

connectExtensions.extendConnectUse(app);

const wwwroot = path.join(__dirname, "wwwroot");

//enable webpack only if run with --webpack param
if(!!argv.webpack)
{
    //WEBPACK 5 DEV SERVER
    app.use(createProxyMiddleware(['/dist'],
    {
        target: 'http://localhost:9000',
        ws: true
    }));
}

//custom rest api
require('./server.rest.cjs')(app);

//enable html5 routing
app.use(history());

//return static files
app.use(gzipStatic(wwwroot, 
                   {
                       maxAge: '7d',
                       setHeaders: function setCustomCacheControl (res, path) 
                       {
                           if (serveStatic.mime.lookup(path) === 'text/html') 
                           {
                               // Custom Cache-Control for HTML files
                               res.setHeader('Cache-Control', 'public, max-age=0');
                           }
                       }
                   }));

console.log("Listening on port 8888 => http://localhost:8888");
//create node.js http server and listen on port
app.listen(8888);