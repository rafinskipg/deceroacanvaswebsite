/**
  Attention Seeker - June - 2015 - Rafael Pedrola
**/
var AttentionSeeker = (function(global) {

  var template = '';

  /*************************************
    Utils
  *************************************/
  function loadTemplate() {
    template = document.querySelector('template#atskrTemplate').content;
  }

  function defaults(destiny, source) {
    if (!source) {
      return destiny;
    }

    Object.keys(source).forEach(function(key) {
      if (typeof(destiny[key]) !== 'undefined') {
        destiny[key] = source[key];
      }
    });

    return destiny;
  }

  function clone(obj) {
    if (null === obj || 'object' !== typeof obj) {
      return obj;
    }
    var copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = obj[attr];
      }
    }
    return copy;
  };


  var scrollHandler = function(instance) {
    var now = Date.now();
    var then = Date.now();
    var prevPos;
    return function(e) {
      now = Date.now();

      var nowPos = window.scrollY;

      if ( prevPos !== nowPos) {
        instance.setPosition({
          'top': window.scrollY + instance.options.scrollOffset + 'px'
        });

        then = now;
        prevPos = nowPos;
      }
    }
  }

  /*************************************
    AttentionSeeker
  *************************************/
  var CONTAINER = '.atskr-container';
  var ELEMENT = '.atskr';
  var ICON_CONTAINER = '.atskr .atskr-icon-container';
  var ICON_ELEMENT = '.atskr .atskr-icon';
  var CIRCLES = '.atskr .atskr-circle';
  var AtSkr = function(options) {
    if (!options) {
      throw new Error('You must specify some options');
      return false;
    }

    this._init(options);
  };

  AtSkr.prototype._init = function(options) {
    this._setOptions(options);
    this._appendTemplate();

    this.events = {
      'mouseover': [],
      'mouseleave': []
    };

    this.scrollHandler = scrollHandler(this);

    this.setColors(this.options.colorOptions);
    this.setPosition(this.options.position);
    this.setOpacity(this.options.opacity);

    if (this.options.ding) {
      this.ding(true);
    }

    if (this.options.wave) {
      this.wave(true);
    }

    if (this.options.pop) {
      this.pop(true);
    }

    if (this.options.enterAnimate) {
      this._enterAnimate();
    }
    if (this.options.scroll) {
      this.scroll(this.options.scroll);
    }
  };

  AtSkr.prototype._setOptions = function(options) {
    this.options = this.options ? this.options : {};
    this.options.color = options.color || 'red';
    this.options.el = options.el || 'body';
    this.options.colorOptions = this._getColorOptions(options.colorOptions);
    this.options.opacity = typeof(options.opacity) === 'undefined' ? 1.0 : options.opacity;
    this.options.scroll = typeof(options.scroll) === 'undefined' ? true : options.scroll;
    this.options.scrollOffset = typeof(options.scrollOffset) === 'undefined' ? 100 : options.scrollOffset;
    this.options.wave = typeof(options.wave) === 'undefined' ? true : options.wave;
    this.options.ding = typeof(options.ding) === 'undefined' ? true : options.ding;
    this.options.pop = typeof(options.pop) === 'undefined' ? true : options.pop;
    this.options.enterAnimate = typeof(options.enterAnimate) === 'undefined' ? true : options.enterAnimate;
    this.options.position = typeof(options.position) === 'undefined' ? {
      right: '100px'
    } : options.position;

  };

  AtSkr.prototype._getColorOptions = function(opts) {
    var options = {
      red: {
        background: 'red',
        color: 'white',
        hoverBg: '#DF728F',
        hoverColor: 'white',
        wave : 'red'
      },
      green: {
        background: 'green',
        color: 'white',
        hoverBg: '#7D72DF',
        hoverColor: 'white',
        wave : 'green'
      },
      blue: {
        background: '#0081ff',
        color: 'white',
        hoverBg: '#7D72DF',
        hoverColor: 'white',
        wave : 'blue'
      }
    };

    if (!options[this.options.color]) {
      throw new Error('You have specified an invalid colorset');
      return false;
    }

    var colorOptions = options[this.options.color];
    colorOptions = defaults(colorOptions, opts);
    return colorOptions;
  };

  AtSkr.prototype._appendTemplate = function() {
    loadTemplate();
    //Apend template    
    document.querySelector(this.options.el).appendChild(
      document.importNode(template, true));
    this.el = document.querySelector(CONTAINER);
  };

  AtSkr.prototype._enterAnimate = function() {
    var container = this.el;
    container.className = container.className + ' enterAnimate';
  };


  AtSkr.prototype.setColors = function(colorOptions) {
    var iconContainer = this.el.querySelector(ICON_CONTAINER);
    iconContainer.style.backgroundColor = colorOptions.background;

    var circles = this.el.querySelectorAll(CIRCLES);
    Array.prototype.forEach.call(circles, function(circle){
      circle.style.borderColor = colorOptions.wave;
    });

    var path = this.el.querySelector('.atskr path');
    if (path) {
      path.style.fill = colorOptions.color;
    }

    var css = ICON_CONTAINER + ':hover{background-color:' + colorOptions.hoverBg + ' !important;}' + ' ' + ICON_CONTAINER + ':hover svg path{fill: ' + colorOptions.hoverColor + ' !important;}';

    var style = document.createElement('style');
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  };

  AtSkr.prototype.setPosition = function(position) {
    var container = this.el;
    Object.keys(position).forEach(function(key) {
      container.style[key] = position[key];
    });


  };

  AtSkr.prototype.setOpacity = function(opacity) {
    var iconContainer = this.el.querySelector(ICON_CONTAINER);
    iconContainer.style.opacity = opacity;
  };

  AtSkr.prototype.ding = function(active) {
    var iconContainer = this.el.querySelector(ICON_ELEMENT);
    if (active) {
      iconContainer.className = iconContainer.className.indexOf(' ding') !== -1 ? iconContainer.className : iconContainer.className + ' ding';
    } else {
      iconContainer.className = iconContainer.className.replace(' ding', '');
    }
  };

  AtSkr.prototype.pop = function(active) {
    var iconContainer = this.el.querySelector(ICON_CONTAINER);
    if (active) {
      iconContainer.className = iconContainer.className.indexOf(' pop') !== -1 ? iconContainer.className : iconContainer.className + ' pop';
    } else {
      iconContainer.className = iconContainer.className.replace(' pop', '');
    }
  };

  AtSkr.prototype.wave = function(active) {

    var iconContainer = this.el.querySelector(ELEMENT);
    if (active) {
      iconContainer.className = iconContainer.className.indexOf(' wave') !== -1 ? iconContainer.className : iconContainer.className + ' wave';
    } else {
      iconContainer.className = iconContainer.className.replace(' wave', '');
    }
  };

  AtSkr.prototype.scroll = function(scroll) {
    if (scroll) {
      window.addEventListener('scroll', this.scrollHandler, false);
    } else {
      window.removeEventListener('scroll', this.scrollHandler, false);
    }
  };

  AtSkr.prototype.on = function(eventName, cb) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(cb);

    this.el.addEventListener(eventName, cb, false);
  };

  AtSkr.prototype.off = function(eventName) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach(function(cb) {
      this.el.removeEventListener(eventName, cb, false);
    }.bind(this));
  };


  return AtSkr;
}(window));