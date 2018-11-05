function iFrameHeight(){
    if($("#iframe")){
        // $("#iframe").height($(document).height());  
        // $("#iframe").width($(document).width()); 
        $("#iframe").height($(window).height());  
        $("#iframe").width($(window).width()); 
    }  
    
     
}

window.onresize=function(){    
    iFrameHeight();    
} 