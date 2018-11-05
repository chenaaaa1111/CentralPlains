import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import Manager from './Manager';
import AppProxy from './../../../utils/AppProxy';
import {
	SHOW_PERMISSION,
	showPermission,
	load
} from './../../../Actions';
import {
	request
} from './../../../utils/ServerRequest';
const mapStateToProps = (state) => {
	console.log('state',state);
	let {
		total,
		putaway,
			rest,
			CountRentPropertyAd,
			CountSalePropertyAd,
			PackageCount,
			SalePackageCount,
			RamainNum
		} = state.permission;
	return {
		total: total,
		putaway: putaway,
		rest: rest,
		CountRentPropertyAd:CountRentPropertyAd,
		CountSalePropertyAd:CountSalePropertyAd,
		PackageCount:PackageCount,
		SalePackageCount:SalePackageCount,
		RamainNum:RamainNum
	};
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setTitle: (title) => {
			let proxy = new AppProxy(window);
			proxy.call("setTitle", title);
		},
		getToken: () => {
			console.log('getToken');
			let proxy = new AppProxy(window);
			proxy.addCallback("windowReady", (urlParams) => {
				let {
					platform,
					userNo,
					token
				} = urlParams;
				request.platform = platform;
				request.userNo = userNo;
				request.token = token;
				//alert("platform:" + ServerRequest.platform + "userNo:" + ServerRequest.userNo + "token:" + ServerRequest.token);
				dispatch((dispatch) => {
					dispatch(load());
					request.requestPermission({}, function(res) {
						console.log('res',res)
						let putaway;
						let total;
						let rest;
						let RamainNum=0;
						 let CountRentPropertyAd=0; //租房源数量
						let	CountSalePropertyAd=0;//售房源数量
						let	PackageCount=0;  //租套餐总数
						let	SalePackageCount=0;  //售套餐总数
						if (!res.AdmPermission) {
							putaway = total = rest = 0;
						} else {
							putaway = res.CountIsPropertyAd;
							rest = res.CountPropertyAd;
							RamainNum=res.RamainNum;
							total = res.PackageCount;
							CountRentPropertyAd=res.CountRentPropertyAd; //租房源数量
							CountSalePropertyAd=res.CountSalePropertyAd;//售房源数量
							PackageCount=res.PackageCount;  //租套餐总数
							SalePackageCount=res.SalePackageCount; //售套餐总数

						}
						console.log('CountRentPropertyAd',CountRentPropertyAd);
						dispatch(showPermission(total, putaway, rest,CountRentPropertyAd,CountSalePropertyAd,PackageCount,SalePackageCount,RamainNum));
					});
				});
			});
			proxy.call("getToken");
		}
	}
};

const ManagerContainer = connect(mapStateToProps, mapDispatchToProps)(Manager);
module.exports = ManagerContainer;