var UglifyJS = require("uglify-js");
var fs = require('fs');
var fsExtra = require('fs-extra');
var sassRenderer = require('./sassRenderer');
var server = require('node-http-server');

sassRenderer(true);
fsExtra.copySync('./images', './dist/images');

var minified = UglifyJS.minify(["./scripts/AttentionSeeker.js", "./scripts/main.js"]);
fs.writeFileSync("./dist/scripts/main.js", minified.code, 'utf8');

server.deploy({
  port: 8000,
  root: './dist'
});