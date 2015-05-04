function Circle(elem) {
  this.diameter = 30 + Math.random() * 50;    //  A number between 30 and 80
  this.x = Math.random() * (500 - this.diameter); //  500 is the maximum (game width) - width of circle so that the circle is always inside the box
  this.y = Math.random() * (500 - this.diameter);
  this.speed = 500 + Math.random() * 1500;    //  Get a range between 500 and 2000 milliseconds
  this.elem = elem;     //  The div that represents a circle

  this.elem.css({
    width: this.diameter,
    height: this.diameter,
    top: this.y,
    left: this.x
  });

  this.move = function() {
    var that = this;
    this.elem.animate({
    top: Math.random() * (500 - this.diameter),
    left: Math.random() * (500 - this.diameter)
    }, {
    queue: false,
    duration: this.speed,
    complete: function() {
      that.move();  // Function inside of a function that encloses this, will remember the initial object that this is calling
      }
    });
  };

  this.listen = function() {
    var self = this;
    this.elem.on('click', function() {
      $(this).effect('explode', {
        pieces: 16,
        duration: 150,
        queue: false,
        complete: function() {
          // Increase score
          window.score.increase();
          $(self).off('click');
        }
      })
    });
  }
}

function Score(elem) {
  this.elem = elem;
  this.points = 0;

  this.reset = function() {
    this.points = 0;
  };

  this.increase = function() {
    this.points += 100;  //  parseInt: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    this.elem.html(this.points);
  };
}

$(document).ready(function(){
  window.score = new Score ($('#score'));

  var duration = 10000;
  var circles = [];

  $.each ($('.circle'), function(){    // https://api.jquery.com/jquery.each/
    var circle = new Circle($(this));    //  Keep track of the dom element
    circles.push(circle);
    circle.move();
    circle.listen();
  });

  setTimeout(function(){
    alert("GAME OVER: refresh page to start again");
    $.each($('.circle'), function() {
      $(this).off('click');
      $(this).hide();
    });
  }, duration);

});