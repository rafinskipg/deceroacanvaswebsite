var plugin;

document.addEventListener("DOMContentLoaded", function(event) {
  plugin = new AttentionSeeker({
    //Presets of colors : blue, red, green
    color: 'blue',
    //Instead of a preset use custom values
    colorOptions: {
      background: '#72A9DF',
      color: 'white',
      hoverBg: 'rgb(96, 14, 144)',
      hoverColor: '#7278DF',
      wave : 'white'
    },

    scrollOffset : 100,
    //Opacity
    opacity: 0.8,

    //Positions: Allows use of right, left, top, bottom
    position : {
      top: '200px',
      right : '100px'
    },

    //Enable scroll follow
    scroll: true,

    //Enable the movement of the phone icon 
    ding: false,

    //Pop up and down the container
    pop: false,

    //Show waves
    wave: false,

    //Enter with an animation
    enterAnimate: true,

    //Container where it will be appended
    el: '#container'
  });

  plugin.on('mouseover', function() {
    plugin.ding(true);
    plugin.setOpacity(1.0);
  });

  plugin.on('click', function() {
    window.location.href = 'http://leanpub.com/deceroacanvas';
  });

  plugin.on('mouseout', function() {
    plugin.ding(false);
    plugin.setOpacity(0.5);
  });

});


setTimeout(function() {
  plugin.ding(false);
  plugin.setPosition({
    'right': '100px'
  });

}, 1000);

//Let the magic begin
setTimeout(function() {
  plugin.wave(true);
  plugin.ding(false);
  plugin.pop(true);
  plugin.setOpacity(0.5);
  plugin.setPosition({
    'right': '50px'
  });

}, 2000);



/** API Methods

plugin.ding(false);
plugin.pop(true);
plugin.wave(true);
plugin.scroll(false);
plugin.setOpacity(0.5);
plugin.setPosition({
    left : '50px'
});
plugin.setColors({
    background : 'rgb(38, 219, 74)'
});

plugin.on('mouseout', function() {
    plugin.ding(false);
    plugin.wave(true);
});

plugin.off('mouseout');

**/