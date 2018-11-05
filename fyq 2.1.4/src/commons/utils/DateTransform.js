/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-17 17:40:16
 * @version $Id$
 */
import Log from './Log';
class DateTransform {
	static timeToMothAndDate(time) {
		let month = new Date(time).getMonth() + 1;
		let date = new Date(time).getDate();
		return month + '月' + date + '日';
	}

	static GMTToLocale(time) {
		return new Date(time - new Date().getTimezoneOffset() * 60 * 1000);
	}

	static getMonths(minDate, maxDate) {
		let minYear = minDate.year;
		let maxYear = maxDate.year;
		let months = [];
		for (let i = maxYear; i >= minYear; i--) {
			for (let j = 12; j > 0; j--) {
				let m = {};
				if ((minYear === maxYear && j <= maxDate.month && j >= minDate.month) || (minYear !== maxYear && i === maxYear && j <= maxDate.month) || (i > minYear && i < maxYear) || (minYear !== maxYear && i === minYear && j >= minDate.month)) {
					m.year = i;
					m.month = j;
					months.push(m);
				}
			}
		}
		return months;
	}

	static timeToYearAndMonth(time) {
		let year = new Date(time).getFullYear();
		let month = new Date(time).getMonth() + 1;
		Log.log("year:", year, "month:", month);
		return year + "年" + month + "月";
	}

	static getYearAndMonth(year, month) {
		return year + "年" + month + "月";
	}

	static getCurYearStartTime() {
		let year = new Date().getFullYear();
		return new Date(year, 0, 0).getTime();
	}

	static getTodayWeek() {
		let time = new Date().getTime();
		let year = new Date().getFullYear();
		let yearStart = new Date(year, 0, 0).getTime();
		let week = Math.floor((time - yearStart) / (7 * 24 * 60 * 60 * 1000)) + 1;
		return week;
	}

	static timeGetWeek(time) {
		let day = new Date(time).getDay();
		let year = new Date(time).getFullYear();
		let month = new Date(time).getMonth();
		let date = new Date(time).getDate();
		let weekStart = new Date(year, month, date).getTime() - 24 * 60 * 60 * 1000 * (day - 1);
		let weekEnd = weekStart + 24 * 60 * 60 * 1000 * 7;
		return {
			QWeekStar: weekStart,
			QWeekEnd: weekEnd
		};
	}
	static  getFDate(timestamp){
        let date=new Date(timestamp);
        let nowDate=new Date();       
        
        let Y=date.getFullYear();
        let M=date.getMonth()+1;
        let d=date.getDate();
        let h=date.getHours();
        let nY=nowDate.getFullYear();
        let nM=nowDate.getMonth()+1;
        let nd=nowDate.getDate();
        let nh=nowDate.getHours();
        let year='';
        let month='';
        let day='';
        let hours='';
        month=M>=10?M:'0'+M;
        day=d>=10?d:'0'+d;
        hours=h>=10?h:'0'+h;
        let mi=date.getMinutes();
		nmi=mi>=10?mi:'0'+mi;
		console.log((nY-y)>0);
        // if((nY-Y)>0){
        //     year=Y;          
        //     return year+"-"+month+"-"+day+" "+hours+" : "+nmi;
        // }else{
               
        //         if(nM==M){
        //                 if((nd-d)==0){
        //                 return hours+':'+nmi;
        //                 }
        //                 if((nd-d)==1){
        //                     day='昨天 ';

        //                     return day+''+hours+':'+nmi;
        //                 }else　if((nd-d)==2){
        //                     day='前天 ' 
        //                     return day+''+hours+':'+nmi;
        //                 }else {
        //                    return month+'-'+day+' '+hours+':'+nmi;
        //                 }      
        //         }else{
        //             return month+'-'+day+' '+hours+':'+nmi;
        //         }
                                     
        // }
    }
	/*static getWeeks(start, end) {
		let num = Math.ceil((end - start) / (7 * 24 * 60 * 60 * 1000));
		let day = new Date(start).getDay();
		let year = new Date(start).getFullYear();
		let month = new Date(start).getMonth();
		let date = new Date(start).getDate();
		let time = new Date(year, month, date).getTime() - 24 * 60 * 60 * 1000 * (day - 1);
		let weeks = [];
		for (let i = 0; i < num; i++) {
			let weekStart = time + 24 * 60 * 60 * 1000 * 7 * i;
			let weekEnd = time + 24 * 60 * 60 * 1000 * 7 * (i + 1);
			weeks.push({
				QWeekStar: weekStart,
				QWeekEnd: weekEnd
			});
		}
		return weeks;
	}*/
	static getWeeks(start, end) {
		let num = Math.ceil((end - start) / (7 * 24 * 60 * 60 * 1000));
		let day = new Date(end).getDay();
		let year = new Date(end).getFullYear();
		let month = new Date(end).getMonth();
		let date = new Date(end).getDate();
		let time = new Date(year, month, date).getTime() - 24 * 60 * 60 * 1000 * (day - 1);
		let weeks = [];
		for (let i = 0; i < num; i++) {
			let weekStart = time - 24 * 60 * 60 * 1000 * 7 * i;
			let weekEnd = time - 24 * 60 * 60 * 1000 * 7 * (i - 1);
			weeks.push({
				QWeekStar: weekStart,
				QWeekEnd: weekEnd
			});
		}
		return weeks;
	}

	static getWeekTime(weekStart, weekEnd) {
		let wStart = DateTransform.timeToMothAndDate(weekStart);
		let wEnd = DateTransform.timeToMothAndDate(weekEnd);
		return wStart + '至' + wEnd;
	}

	static getZeroTime(time) {
		let date = new Date(time).getDate();
		let year = new Date(time).getFullYear();
		let month = new Date(time).getMonth();
		return new Date(year, month, date).getTime();
	}

	static getDayEndTime(time) {
		let date = new Date(time).getDate();
		let year = new Date(time).getFullYear();
		let month = new Date(time).getMonth();
		return new Date(year, month, date).getTime() + 24 * 60 * 60 * 1000 - 1;
	}

	static nDayBeforeTime(time, n) {
		let dayDuration = 24 * 60 * 60 * 1000; //毫秒数
		return time - n * dayDuration;
	}

	static nWeekBeforeTime(time, n) {
		let dayDuration = 7 * 24 * 60 * 60 * 1000; //毫秒数
		return time - n * dayDuration;
	}

	static nMonthBeforeTime(time, n) {
		let year = new Date(time).getFullYear();
		let month = new Date(time).getMonth();
		let mStart = new Date(year, month).getTime();
		if (month - n < 0) {
			year = year - Math.ceil((n - month) / 12);
			month = (12 - (n - month) % 12) % 12;
		} else {
			month = month - n + 1;
		}
		return new Date(year, month, 1).getTime();
	}

	static generateDTDTime(start, end) {
		let dayDuration = 24 * 60 * 60 * 1000; //毫秒数
		let time = start;
		let times = [];
		while (time > end) {
			times.push(time);
			time -= dayDuration;
		}
		return times;
	}

	// static prevWeek(startTime, endTime) {
	// 	let prevWeekStart = startTime - 7 * 24 * 60 * 60 * 1000;
    //     let prevWeekEnd = endTime - 7 * 24 * 60 * 60 * 1000;
    //     return {
	// 		weekStart: prevWeekStart,
	// 		weekEnd: prevWeekEnd
	// 	};
    // }
    static prevWeek(startTime, endTime) {
        let nowTime = this.getZeroTime(new Date().getTime());
        let  year;
        let  month; 
        let  nowdate;
        let  end;
        let prevWeekStart = startTime - 7 * 24 * 60 * 60 * 1000;
        let prevWeekEnd = endTime - 7 * 24 * 60 * 60 * 1000;
        let day = new Date(prevWeekEnd).getDay();
        end = prevWeekEnd;
        if(nowTime>=startTime&&nowTime<endTime+24 * 60 * 60 * 1000-1){
            year= new Date(prevWeekEnd).getFullYear();
            month= new Date(prevWeekEnd).getMonth();
            nowdate = new Date(prevWeekEnd).getDate() ;
            day -= 1 ;
            end = new Date(year,month,nowdate+(6-day)).getTime();
        }
		if(nowTime>=prevWeekStart&&nowTime<prevWeekEnd+24 * 60 * 60 * 1000-1){
            end = nowTime;
        }
        return {
			weekStart: prevWeekStart,
			weekEnd: end
		};
    }
    

	// static nextWeek(startTime, endTime) {
	// 	let nextWeekStart = startTime + 7 * 24 * 60 * 60 * 1000;
	// 	let nextWeekEnd = endTime + 7 * 24 * 60 * 60 * 1000;
	// 	return {
	// 		weekStart: nextWeekStart,
	// 		weekEnd: nextWeekEnd
	// 	};
    // }
    static nextWeek(startTime, endTime) {
		let nextWeekStart = startTime + 7 * 24 * 60 * 60 * 1000;
        let nextWeekEnd = endTime + 7 * 24 * 60 * 60 * 1000;
        let nowTime = this.getZeroTime(new Date().getTime());
        let  year;
        let  month; 
        let  nowdate;
        let  end;
        let day = new Date(nextWeekEnd).getDay();
        end = nextWeekEnd;
        if(nowTime>=startTime&&nowTime<endTime+24 * 60 * 60 * 1000-1){
            year= new Date(nextWeekEnd).getFullYear();
            month= new Date(nextWeekEnd).getMonth();
            nowdate = new Date(nextWeekEnd).getDate();
            day -= 1 ;
            end = new Date(year,month,nowdate+(6-day)).getTime();
        }

        if(nowTime>=nextWeekStart&&nowTime<nextWeekEnd+24 * 60 * 60 * 1000-1){
            end = nowTime;
        }
		
       
		return {
			weekStart: nextWeekStart,
			weekEnd: end
		};
	}

	static prevMonth(startTime, endTime) {
		let year = new Date(startTime).getFullYear();
		let month = new Date(startTime).getMonth();
		if (month === 0) {
			year = year - 1;
			month = 11;
		} else {
			month = month - 1;
		}
		let monthStart = new Date(year, month).getTime();
		let monthEnd = new Date(year, month + 1).getTime() - 1;
		return {
			monthStart: monthStart,
			monthEnd: monthEnd
		};
	}

	static nextMonth(startTime, endTime) {
		let year = new Date(startTime).getFullYear();
		let month = new Date(startTime).getMonth();
		if (month === 11) {
			year = year + 1;
			month = 0;
		} else {
			month = month + 1;
		}
		let monthStart = new Date(year, month).getTime();
		let monthEnd = new Date(year, month + 1).getTime() - 1;
		return {
			monthStart: monthStart,
			monthEnd: monthEnd
		};
	}
	static prevDay(startTime, endTime) {
		let prevDayStart = startTime - 24 * 60 * 60 * 1000;
		let prevDayEnd = endTime - 24 * 60 * 60 * 1000;
		return {
			start: prevDayStart,
			end: prevDayEnd
		}
	}
	static nextDay(startTime, endTime) {
		let nextDayStart = startTime + 24 * 60 * 60 * 1000;
		let nextDayEnd = endTime + 24 * 60 * 60 * 1000;
		return {
			start: nextDayStart,
			end: nextDayEnd
		}
	}

	static timformat(timstamp) { //时间格式转化
		Date.prototype.Format = function(fmt) { //author: meizz
			var o = {
				"M+": this.getMonth() + 1, //月份
				"d+": this.getDate(), //日
				"h+": this.getHours(), //小时
				"m+": this.getMinutes(), //分
				"s+": this.getSeconds(), //秒
				"q+": Math.floor((this.getMonth() + 3) / 3), //季度
				"S": this.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		}
		var time1 = new Date(timstamp).Format("yyyy-MM-dd");
		return time1;
	}


	static timeToString(time) {
		let dt = new Date(time);
		let year = dt.getFullYear();
		let month = dt.getMonth();
		let date = dt.getDate();
		let hour = DateTransform.getNNumString(dt.getHours(), 2);
		let minute = DateTransform.getNNumString(dt.getMinutes(), 2);
		let second = DateTransform.getNNumString(dt.getSeconds(), 2);
		let dtStr = [year, month + 1, date].join('-');
		let tmStr = [hour, minute, second].join(':');
		return [dtStr, tmStr].join(' ');
	}

	static getNNumString(num, n) {
		let str = '';
		for (let i = n - 1; i >= 0; i--) {
			let cur;
			if (i > 0) {
				cur = Math.floor(num / (i * 10));
			} else {
				cur = num % 10;
			}
			str += cur;
		}
		return str;
	}
	static getFDate(timestamp){
        var date=new Date(timestamp);
        var nowDate=new Date();       
        
        var Y=date.getFullYear();
        var M=date.getMonth()+1;
        var d=date.getDate();
        var h=date.getHours();
        var nY=nowDate.getFullYear();
        var nM=nowDate.getMonth()+1;
        var nd=nowDate.getDate();
        var nh=nowDate.getHours();
        var year='';
        var month='';
        var day='';
        var hours='';
        month=M>=10?M:'0'+M;
        day=d>=10?d:'0'+d;
        hours=h>=10?h:'0'+h;
        var mi=date.getMinutes();
        let nmi=mi>=10?mi:'0'+mi;
        if((nY-Y)>0){
            year=Y;
            
            return year+"-"+month+"-"+day+" "+hours+" : "+nmi;
        }else{
               
                if(nM==M){
                        if((nd-d)==0){
                        return hours+':'+nmi;
                        }
                        if((nd-d)==1){
                            day='昨天 ';

                            return day+''+hours+':'+nmi;
                        }else　if((nd-d)==2){
                            day='前天 ' 
                            return day+''+hours+':'+nmi;
                        }else {
                           return month+'-'+day+' '+hours+':'+nmi;
                        }      
                }else{
                    return month+'-'+day+' '+hours+':'+nmi;
                }
                                     
        }
    }
}

export default DateTransform;
