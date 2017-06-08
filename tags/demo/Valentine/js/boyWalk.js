function boyWalk(){
  var $container=$('#content-wrapper');
  var visualWidth=$container.width();
  var visualHeight=$container.height();
  var $boy=$('#boy');
  var $road=$('#road');
  var $girl=$('#girl');

  $boy.width($boy.height()/2.15);
  var boyTop=$road.position().top+$road.height()*0.5-$boy.height()+18;
  $boy.css({top:boyTop});


  function slowWalk() {
    $boy.addClass('slow-walk');
  }
  function pauseWalk(){
    $boy.css({
      'animation-play-state':'paused'
    });
  }
  function restoreWalk() {
    $boy.css({
      'animation-play-state':'running'
    });
  }

  function startRun(options,runTime){
    var dfdPlay=$.Deferred();
    restoreWalk();
    $boy.transition(options,runTime,'linear',function(){
      dfdPlay.resolve();
    });
    return dfdPlay;
  }
  // 注意walkRun方法和startRun方法改变位置的不同，前者是通过left和top，后者是通过translate
  function walkRun(time,distX,distY) {
    time = time || 3000;
    slowWalk();
    var d1=startRun({
      'left':distX+'px',
      'top':distY?distY:undefined
    },time);
    return d1;
  }

  function intoShop(walkTime) {
    var dfd=$.Deferred();
    var $boy=$('#boy');
    var $door=$('.door').first();
    var shopDist=$door.offset().left+($door.width()/2-$boy.width()/2);
    var walkToShop=walkRun(walkTime,shopDist);
    var boyToDoorDist=$road.offset().top-$boy.height();
    walkToShop.done(function () {
      var walkIntoShop=startRun({
         transform: 'scale(0.5,0.5)',
         top:boyToDoorDist,
         opacity: 0.1
      }, 1000);
      walkIntoShop.done(function() {
        dfd.resolve();
      });
    });
    return dfd;
  }

  function outShop(){
    var dfd=$.Deferred();
    var walkOutShop=startRun({
       transform: 'scale(1,1)',
       top:boyTop,
       opacity: 1
    }, 1000);
    walkOutShop.done(function () {
      dfd.resolve();
    });
    return dfd;
  }

  function calculateDist(direction,proportion) {
    return (direction == "x" ? visualWidth : visualHeight) * proportion;
  }

  function getFlower() {
    var dfd=$.Deferred();
    $boy.removeClass('slow-walk');
    $boy.addClass('get-flower-walk');
    setTimeout(function () {
      // $boy.removeClass('slow-walk');
      // $boy.addClass('get-flower-walk');
      dfd.resolve();
    },1000);
    return dfd;
  }

  function ontoBridge(time1,time2,time3) {
    var dfd=$.Deferred();
    var distX1=$container.width()*0.25-$boy.width();
    var distX2=$container.width()*0.365-$boy.width();
    var distY2=$('.c-background-top').height()*0.92-$boy.height();
    var distX3=$girl.offset().left-$boy.width()*0.8;
    walkRun(time1,distX1).done(function () {
      walkRun(time2,distX2,distY2).done(function () {
        walkRun(time3,distX3).done(function () {
          dfd.resolve();
        })
      })
    })

    return dfd;
  }
  return {
    walkTo: function(time, proportionX, proportionY) {
        var distX = calculateDist('x', proportionX)
        var distY = calculateDist('y', proportionY)
        return walkRun(time, distX, distY);
    },
    pauseWalk:function(){
      pauseWalk();
    },
    restoreWalk:function () {
      restoreWalk();
    },
    intoShop:function (walkTime) {
      return intoShop(walkTime);
    },
    outShop:function () {
      return outShop();
    },
    getFlower:function () {
      return getFlower();
    },
    ontoBridge:function (time1,time2,time3) {
      return ontoBridge(time1,time2,time3);
    },
    walkRun:function (time,distX,distY) {
      return walkRun(time,distX,distY);
    },
    rotate:function () {
      $boy.addClass('boy-rotate');
      $boy.on('webkitAnimationEnd',function () {
        console.log($(this));
      });
    }
  }

}
