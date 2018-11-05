$(function(){
	var contentObj;
	$.each( contentList, function(index,item){
		if(item.name==(window.location.hash.slice(1))){
			contentObj = item;
		}
	});
	if(contentObj){
		$('.title').html('<h1>'+contentObj.title+'</h1>')
		var contentLi='';
	
		$.each( contentObj.content, function(index,item){
			contentLi +='<p>'+item+'</p>'
		});
		$('.contentWord').html(contentLi)
	}
	
//	$('.contentWord').html('<p></p>')
})