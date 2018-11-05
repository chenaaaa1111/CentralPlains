
function GetCity(){
    var svalue = location.search.match(new RegExp("[\?\&]cityen=([^\&]*)(\&?)", "i"));
    return  svalue ? svalue[1] : svalue;
}
function GetUrl(){
// 从地址栏获取当前城市
    var currentCity=GetCity();
    cityen = '&cityen='+currentCity;
    if (currentCity == "sz" || currentCity == "gz") //全国一共有三种url sz、gz、集团
        return "https://api" + currentCity + ".centanet.com/v6/json/reply/";
    else
        return "https://mobileapi.centanet.com/v6/json/reply/";
}




/*
 * 算房价页面js代码开始
 */
$(function() {

    $('select').material_select();
    //$('.button-collapse').sideNav();
    //$('.goSearch').click(function () {
    //    $('#tipLayer').openModal();
    //});
    //显示出错提示
    function showTips(msg) {
        var tipLayer = $("#tipLayer");
        tipLayer.find(".collectH4").html(msg);
        $('#tipLayer').openModal();
    }
});

var communityname; // 小区名称
var houseType; // 户型
var floor; // 楼层
var houseDirect; // 朝向
var houseArea;
var houseTypeChoose;

/*点击当前li 获取text并赋值给input框*/
$(document).on("click",".layerList",function () {
    $("#communityname").val($(this).text());
    communityname = $(this).text();
    $(".resultLayer").css("display","none");
    findFun();
});
/*点击所有关闭弹框*/
$(document).on("click",function () {
    $(".resultLayer").css("display","none");
});
/*小区名称相关接口*/
function houseName() {
    communityname = $("#communityname").val();
    findFun();
    if(communityname==''){
        $(".resultLayer").css("display","none");
        return;
    }else{
        var needurl = GetUrl();
        $.ajax({
            url : needurl+'GetPublicRequest?Fun=GetHousesNameListRequest&Param=%7B%22HouseName%22:%22'+ communityname +'%22%7D&platform=wap&cityen='+GetCity(),
            dataType : "json",
            beforeSend: function(xhr){xhr.setRequestHeader('cityen', GetCity());}, //这里设置header
            async : false,
            success : function(data) {
                var layerHtml='';
                // console.log(data);
                $(".resultLayer").css("display","block");
                for(i=0;i<data.Result.length;i++){
                    layerHtml+="<li data-id="+i+" class='layerList'>"+data.Result[i]+"</li>";
                }
                $(".resultLayerIn").html(layerHtml);
            },
            error : function(errorThrown) {

            }
        });
    }
}
// 根据小区名称跟户型查找面积
function findFun() {
    var needurl = GetUrl();
    $.ajax({
        url : needurl +'GetPublicRequest?Fun=GetHousesIntervalRequest&Param=%7B%22HouseName%22:%22'+ communityname +'%22,%22Type%22:%22'+houseTypeChoose+'%22%7D&platform=wap&cityen='+GetCity(),
        dataType : "json",
        beforeSend: function(xhr){xhr.setRequestHeader('cityen', GetCity());}, //这里设置header
        async : false,
        success : function(data) {
            // console.log(data);
            if(data.Result){
                if(data.Result.length!=1){
                    $(".houseAreaIn").css("display","block");
                    $(".nohouse").css("display","none");
                    $(".areaSize").text(data.Result);
                }
            }else{
                $(".nohouse").css("display","block");
                $(".houseAreaIn").css("display","none");
            }


        },
        error : function(errorThrown) {
            layer.msg("失败")
        }
    });
}
$(function () {
    layui.use('layer', function(){
        var layer = layui.layer;
    });
    houseType = $("#houseType").val();
    houseDirect = $("#houseDirect").val();
    $(".select-dropdown").click(function () {
        communityname = $("#communityname").val();
        houseTypeChoose = $('#houseType option:selected').val();
        if(communityname == ""){
            layer.msg("请输入小区名称");
            $(".houseAreaIn").css("display","none");
            return;
        }
        if(houseTypeChoose == ""){
            layer.msg("请选择户型");
            $(".houseAreaIn").css("display","none");
            return;
        }else {
            findFun();
        }
    });

    $(".goSearch").click(function () {
        houseTypeChoose = $('#houseType option:selected').val();
        var houseDirectChoose = $('#houseDirect option:selected').val();
        communityname = $("#communityname").val();
        houseArea = $("#houseArea").val();
        floor = $("#floor").val();
        var reg="^[0-9]*[1-9][0-9]*$";
        if(communityname == ""){
            layer.msg("请输入小区名称");
            return;
        }else if(houseTypeChoose == ""){
            layer.msg("请选择户型");
            return;
        }else if(floor == ""){
            layer.msg("请输入楼层");
            return;
        }else if(houseArea == ""){
            layer.msg("请输入面积");
        }else if(!(/(^[1-9]\d*$)/.test(floor))){
            layer.msg("亲输入大于”0“的层数");
            return;
        }else if(!(/(^[1-9]\d*$)/.test(houseArea))){
            layer.msg("亲输入大于”0“的面积");
            return;
        }else if(houseDirectChoose == ""){
            layer.msg("请选择房屋朝向");
            return;
        }else {
            var needurl = GetUrl();
            $.ajax({
                url : needurl + 'GetPublicRequest?Fun=PriceInquiryRequest&Param=%7B%22HouseName%22:%22'+communityname+'%22,%22Area%22:%22'+houseArea+'%22,%22Floor%22:%22'+floor+'%22,%22Type%22:%22'+houseTypeChoose+'%22,%22Toward%22:%22'+houseDirectChoose+'%22%7D&platform=wap&cityen='+GetCity(),
                dataType : "json",
                beforeSend: function(xhr){xhr.setRequestHeader('cityen', GetCity());}, //这里设置header
                async : false,
                success : function(data) {
                    if(data.ResultNo=='0'){
                        var TotalPrice = data.Result.TotalPrice;
                        var UnitPrice = data.Result.UnitPrice;
                        var High = data.Result.High; // 偏高
                        var Low = data.Result.Low; // 偏低
                        var Middle = data.Result.Middle; // 合理
                        var RelativeRatio = data.Result.RelativeRatio;
                        var EstateCode = data.Result.EstateCode;
                        location.href="calhouseresult.html?"+"&communityname="+communityname+"&houseTypeChoose="+houseTypeChoose+"&floor="+floor+"&houseArea="+houseArea+"&houseDirectChoose="+houseDirectChoose+"&TotalPrice="+TotalPrice+"&UnitPrice="+UnitPrice+"&High="+High+"&Low="+Low+"&Middle="+Middle+"&RelativeRatio="+RelativeRatio+"&EstateCode="+EstateCode+"&cityen="+GetCity();
                        // 跳转之后清空列表数据
                        $('#houseType option:selected').val('');
                        $('#houseDirect option:selected').val('')
                        $("#communityname").val('');
                        $("#houseArea").val('');
                        $("#floor").val('');
                    }else{
                        layer.msg("暂无本小区相关消息");
                    }
                },
                error : function(errorThrown) {

                }
            });
        }

    })

});
/*
 * 算房价页面js代码结束
 */

