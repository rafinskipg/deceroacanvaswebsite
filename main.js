var sassRenderer = require('./sassRenderer');
var watch = require('node-watch');
var server = require('node-http-server');

var scssDir = './sass';
var jsDir = './scripts';

watch(scssDir, function(filename) {
  console.log('fIle changed', filename);
  sassRenderer();
});

server.deploy({
  port: 8000,
  root: './'
});