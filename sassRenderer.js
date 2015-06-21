var sass = require('node-sass');
var fs = require('fs');
var autoprefixer = require('autoprefixer-core');
var postcss      = require('postcss');
 

function render(compressed) {
  var options = {
    file: './sass/main.scss',
    outFile: './dist/css/main.css',
  };

  if (compressed) {
    options.outputStyle = 'compressed';
  }

  sass.render(options,
    function(err, result) {
      if (err) {
        console.error('Error generating css', err);
      } else {
        prefix(result.css, options.outFile);
      }
    });
}

function prefix(css, out){
  postcss([ autoprefixer({ browsers : ['last 5 versions']}) ]).process(css).then(function (result) {
      result.warnings().forEach(function (warn) {
          console.warn(warn.toString());
      });
      console.log(Object.keys(result))
      fs.writeFileSync(out, result.css, 'utf8');
      console.log('Success, Dimitri');

  });
  
}

module.exports = render;