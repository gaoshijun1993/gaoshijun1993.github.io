function DoorAction(){
  var $doorLeft=$('#doorLeft');
  var $doorRight=$('#doorRight');
  return{

    open:function () {
      var dfd=$.Deferred();
      $doorLeft.addClass('open-left');
      $doorRight.addClass('open-right');
      $doorLeft.on("webkitAnimationEnd",function () {
        lamp.bright();
        dfd.resolve();
      });
      return dfd;
    },

    close:function () {
      var dfd=$.Deferred();
      $doorLeft.addClass('close-left');
      $doorRight.addClass('close-right');
      $doorLeft.on("webkitAnimationEnd",function () {
        lamp.dark();
        dfd.resolve();
      });
      return dfd;
    }

  }
}
