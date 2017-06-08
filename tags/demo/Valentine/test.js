function a() {
  b=2
  setTimeout(function () {
    b=4
    return b
  },3000);

}
b=a();
console.log(b);
