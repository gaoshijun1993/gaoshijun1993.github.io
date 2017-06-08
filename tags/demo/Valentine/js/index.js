
// 控制页面1太阳的位置
var $sun=$('#sun');
var $container=$('#content-wrapper');
var sunWidth=0.1*$container.width();
var $girl=$('#girl');
$sun.css({
  'width':sunWidth,
  'height':sunWidth,
  'background-size': '100% 100%'
});
$sun.addClass('sun-rotation');

// 控制云的形状位置
var $cloud1=$('#cloud1');
var $cloud2=$('#cloud2');
var cloud1Width=$container.width()*0.1;
var cloud2Width=$container.width()*0.15;
$cloud1.css({
  width:cloud1Width,
  height:cloud1Width/1.81
});
$cloud2.css({
  width:cloud2Width,
  height:cloud2Width*0.47,
});
$cloud1.addClass('cloud1-anim');
$cloud2.addClass('cloud2-anim');

// 控制灯的开关
var lamp={
  elem:$('.b-background'),
  bright:function () {
    console.log(this);
    this.elem.addClass('lamp-bright');
  },
  dark:function () {
    this.elem.removeClass('lamp-bright');
  }
}
//控制页面b的飞鸟
function birdFly() {
  var $bird=$('.bird').first();
  $bird.css({height:$bird.width()*0.9});
  $bird.transition({
    'right':'100%'
  },9000,'linear');
}

//控制小女孩尺寸大小：
var girl={
  ele:$('#girl'),
  offset:function () {
    this.ele.css({
      width:this.ele.height()*0.58+'px',
      top:$('.c-background-top').height()*0.92-this.ele.height()+"px",
      left:$('.c-background-middle').width()*0.5+"px"
    });
  },
  rotate:function () {
    this.ele.addClass('girl-rotate');
    this.ele.on('webkitAnimationEnd',function () {
      setInterval(function () {
        var newPetal=new Petal();
        newPetal.createPetalBox();
        newPetal.createPetal();
      },200)
    });
  }
}
girl.offset();

//控制星星的大小及闪烁效果；
var $star=$('.star');
$star.css({
  height:$star.width()
});

// 控制水波的流动效果
var $wave1=$('.wave1');
var $wave2=$('.wave2');
var $wave3=$('.wave3');
var $wave4=$('.wave4');
$wave1.css({height:$wave1.width()*0.1});
$wave2.css({height:$wave2.width()*0.1});
$wave3.css({height:$wave3.width()*0.1});
$wave4.css({height:$wave4.width()*0.05});

// 控制花雨
var $flowerRainWrapper=$('#flowerRainWrapper');
function randomPetal() {
  var petalImgUrl=[
    './images/flower1.png',
    './images/flower2.png',
    './images/flower3.png',
    './images/flower4.png',
    './images/flower5.png',
    './images/flower6.png',
  ];
  return 'url('+petalImgUrl[Math.floor(Math.random()*6+1)]+')';
}

function Petal() {
  this.createPetalBox=function () {
    return $("<div class='petalBox'>").css({
      'position':'absolute',
      // 'zIndex':1001,
      'top':-41,
      'width':41,
      'height':41,
      'backgroundImage':function () {
        return randomPetal();
      },
      'backgroundSize':'cover',
    }).addClass('petalRotate');
  };
  this.motionTrail=(function () {
    return {
      startPosLeft:function () {
        return Math.random()*window.innerWidth;
      },
      terminalPosTop:function () {
        return window.innerHeight-41;
      },
      terminalPosLeft:function () {
        // 在startPosLeft基础上随机加减100以内
        return Math.random()*window.innerWidth;
      },
      duration:function () {
        return window.innerHeight*100;
      },
      // 设置随机不透明度，如果小于0.5就设为1，否则为随机
      opacity:function () {
        var randomOpacity=Math.random;
        return randomOpacity<0.5?1:randomOpacity;
      }
    }
  })(),
  this.createPetal=function () {
    var $petalBox=this.createPetalBox();
    $petalBox.css({
      left:this.motionTrail.startPosLeft(),
      opacity:this.motionTrail.opacity(),
    });
    $flowerRainWrapper.append($petalBox);
    $petalBox.transition({
      top:this.motionTrail.terminalPosTop,
      left:this.motionTrail.terminalPosLeft,
      opacity:0.7
    },20000,'ease-out',function () {
      $(this).remove();
    });
  }
}
// setInterval(function () {
//   var newPetal=new Petal();
//   newPetal.createPetalBox();
//   newPetal.createPetal();
// },200)
