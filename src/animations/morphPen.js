// DOM id of the svg markup.
var hairStyles = [
  '', '#wintro', '#w1900',
  '#w1910', '#w1920', '#w1930',
  '#w1940', '#w1950', '#w1960',
  '#w1970', '#w1980', '#w1990',
  '#w2000'
];
// Which color to be applied to ^ dom element.
var colors = [
  '', '#000', '#d56c52', '#6f4143',
  '#490109', '#60767A', '#14270B',
  '#b54d7f', '#3b893b', '#6d2472',
  '#bb005f', '#989808', '#B565A7'
];

$('#timewrap').pagepiling({
  verticalCentered: false,
  anchors: ['intro', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'], //???
  navigation: {
    'bulletsColor': '#fff',
    'position': 'left',
    'tooltips': ['Intro', '1900\'s', '1910\'s', '1920\'s','1930\'s','1940\'s', '1950\'s', '1960\'s', '1970\'s', '1980\'s', '1990\'s', '2000\'s']
  },
  loopBottom: true,
  loopTop: true,

  afterLoad: function(anchorLink, index){
    TweenLite.to(
      "#wintro",
      1,
      {
        morphSVG: hairStyles[index],
        stroke: colors[index],
        ease: Bounce,
        delay: 0
      }
    );



    if(index != 1){
      $("#rose").hide();
    } else {
      $("#rose").fadeIn(1500);
    }
  }

});

//for preview
setTimeout(function () {
  $.fn.pagepiling.moveSectionDown();
}, 2000);



//auto scroll
//setInterval(function(){$.fn.pagepiling.moveSectionDown();}, 4500)










