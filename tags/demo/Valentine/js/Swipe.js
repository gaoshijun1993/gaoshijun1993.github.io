function Swipe(container){
  var $element=container.find(':first');
  // 此处的Promise无效,经过多次调试,无解
  function scrollTo(x,time) {
    return new Promise((resolve,reject)=>{
      $element.css({
        'transition-name':'transform',
        'transition-timing-function':'linear',
        'transition-duration':time+'ms',
        'transform':'translate3d(-'+x+'px,0px,0px)'
      });
      $element.on('transitionend',function () {
        resolve();
      })
    })
  };

  return {
    scrollTo:function (x,time) {
      return scrollTo(x,time)
    }
  }
}
