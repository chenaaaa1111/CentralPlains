$(function(){

})

function toggle(id){
  $(document.getElementById(id)).toggle();
  $(".popup_window").toggle();
}
function toggleClass(classNmae,event){
  event.stopPropagation();
  if($(event.target).is('button')){
    $(event.target).parent().siblings().removeClass(classNmae);
    $(event.target).parent().toggleClass(classNmae);
  }  
 
  
}
function GetQueryString(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}