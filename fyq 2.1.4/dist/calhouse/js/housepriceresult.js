/*
 * 计算结果页面js代码开始
 */

// 基于准备好的dom，初始化echarts实例

var myChart = echarts.init(document.getElementById('main'));
let deal = {
    avglist1: [],
    avglist2: [],
    monthlist: [],
    numlist1: [],
    numlist2: [],
    monthtitle: []
};
//月份生成
let nowYear = new Date().getFullYear();
let nowMonth = new Date().getMonth() + 1;
for (let i = 1; i < 7; i++) {
    nowMonth - i > 0 &&
    deal.monthlist.unshift(nowMonth - i) &&
    deal.monthtitle.unshift(nowMonth - i + "月");
    nowMonth - i <= 0 &&
    deal.monthlist.unshift(nowMonth - i + 12) &&
    deal.monthtitle.unshift(nowMonth - i + 12 + "月");
}
// 指定图表的配置项和数据
option = {
    xAxis: {
        type: 'category',
        data: deal.monthtitle
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: function (value) {
                if (value >= 10000)
                    return (value / 10000).toFixed(1) + "万";
                else if (value <= 0) return 0;
                else return value + "元";
            }
        },
    },
    grid:{
        x:60,
        x2:40,
        y:20,
    },

};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
window.onresize = myChart.resize;
$(function() {
    var DealTimeBegin;
    var DealTimeEnd;
    var EstateCode;
    var PostType;
    var svalue;
    var currentCity;
    DealTimeBegin = parseInt((+new Date() - 15552000000) / 1000);
    DealTimeEnd = parseInt(+new Date() / 1000);
    PostType = "s";
    // 接受url的值
    function receptPreFun() {
        var loc = location.href;
        var arr = loc.split("&");
        var obj = new Object();
        var sWrr= [];

        for(var i = 0; i < arr.length; i++) {
            var tmp_arr = arr[i].split("=");
            obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
            sWrr.push(obj[decodeURIComponent(tmp_arr[0])]);
            // console.log(sWrr);
            communityname = $(".houseName").text(sWrr[1]);
            houseTypeChoose = $(".houseType").text(sWrr[2]);
            floor = $(".floor").text(sWrr[3]);
            houseArea = $(".houseArea").text(sWrr[4]);
            houseDirectChoose = sWrr[5];
            $(".TotalPrice").text(sWrr[6]);
            $(".UnitPrice").text(sWrr[7]);
            $(".High").text(sWrr[8]);
            $(".Low").text(sWrr[9]);
            $(".Middle").text(sWrr[10]);
            $(".RelativeRatio").text(sWrr[11]);
            EstateCode = sWrr[12];
            svalue = sWrr[13];

            // console.log("svalue:"+svalue)
            var sWrrDire = sWrr[5];
            if(sWrrDire =='1'){
                sWrrDire ='东'
            }else if(sWrrDire =='2'){
                sWrrDire ='南'
            }else if(sWrrDire =='3'){
                sWrrDire ='西'
            }else if(sWrrDire =='4'){
                sWrrDire ='北'
            }else if(sWrrDire =='5'){
                sWrrDire ='东南'
            }else if(sWrrDire =='6'){
                sWrrDire ='西南'
            }else if(sWrrDire =='7'){
                sWrrDire ='西北'
            }else if(sWrrDire =='8'){
                sWrrDire ='东北'
            }
            $(".houseDire").text(sWrrDire);
        }
    }
    receptPreFun();
    function GetUrl(){
      // 从地址栏获取当前城市
        currentCity = svalue;
        if (currentCity == "sz" || currentCity == "gz") //全国一共有三种url sz、gz、集团
            return "https://api" + currentCity + ".centanet.com/v6/json/reply/";
        else
            return "https://mobileapi.centanet.com/v6/json/reply/";
    }
    $.ajax({
        url : GetUrl()+'GetEstateDealAvgPriceNumHistoryRequest?&DealTimeBegin='+DealTimeBegin+'&DealTimeEnd='+DealTimeEnd+'&PostType=s&EstateCode='+EstateCode+'&platform=wap&cityen='+currentCity,
        dataType : "json",
        beforeSend: function(xhr){xhr.setRequestHeader('cityen', currentCity);}, //这里设置header
        async : false,
        success : function(data) {
            // console.log(data,1010);
            if (data.ResultNo == 0) {
                /*小区成交均价排序 */
                if (data.Result.EstateDealAvgPriceHistory) {
                    let has = false;
                    deal.monthlist.forEach(m => {
                        has = false;
                        data.Result.EstateDealAvgPriceHistory.forEach(g => {
                            if (g.DataMonth == m) {
                                deal.avglist1.push(parseInt(g.DealAvgPrice));
                                has = true;
                            }
                        });
                        has == false && deal.avglist1.push(null);
                    });
                }
            }else {
                $("#main").css("display","none");
                $(".nodata").css("display","block");
            }
            myChart.setOption({
                series: [{
                    type: 'line',
                    connectNulls:true,
                    data: deal.avglist1
                }]
            });

        },
        error : function(errorThrown) {

        }
    });
});
/*
 * 计算结果页面js代码结束
 */