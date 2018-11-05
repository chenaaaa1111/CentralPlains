import ListItemObj from './ListItemObj';
import FilterObj from './FilterObj';
import ListData from './ListData';
import {
	PUTAWAY,
	ONPUTAWAY,
	PUSH
} from './Const';
import config from './FilterConfig';
class ListModel {
	constructor(type) {
		this.type = type;
		this.fltvisible = false;
		this.enablebatch = false;
		this.allselected = false;
		this.loadmore = false;
		//this.hasmore = false;
		this.pageindex = 1;
		this.pagesize = 10;
		this.saleCount = 0;
		this.rentCount = 0;
		this.list = new ListData();
		this.filters = new FilterObj();
		this.setFilters();
	}
	setFilters() {
		let type = this.type;
		this.filters.setFilter(config[type]);
	}
	getFilters() {
		return this.filters.getFilter();
	}
	getFilterStatus() {
		if (!this.filters)
			return;
		return this.filters.status;
	}
	setFilterStatus(status) {
		if (!this.filters)
			return;
		this.filters.status = status;
	}
	changeBatch(enabled) {
		let items = this.list.getItems();
		this.enablebatch = enabled;
		if (!this.enablebatch) {
			//document.getElementById("output").innerHTML += "<br>this.allselected112:" + this.allselected;
			this.allselected = false;
		}
		items.forEach((item, index) => {
			if (enabled) {
				item.isCheckable = true;
			} else {
				item.isCheckable = false;
				item.checked = false;
			}
		});
	}
	selectItem(adid, seleted) {
		let items = this.getItems();
		items.forEach((item, index) => {
			if (item.adid === adid) {
				item.checked = seleted;
			}
		});
		this.allselected = !items.some((item, index) => {
			return !item.checked;
		});
		//document.getElementById("output").innerHTML += "<br>this.allselected113:" + this.allselected;
	}
	selectAllItems(seleted) {
		let items = this.getItems();
		items.forEach((item, index) => {
			item.checked = seleted;
		});
		this.allselected = seleted;
		//document.getElementById("output").innerHTML += "<br>this.allselected11:" + this.allselected;
	}
	getCheckedNum() {
		let items = this.getItems();
		let num = 0;
		return !items.forEach((item, index) => {
			if (item.checked) {
				num++;
			}
		});
		return num;
	}
	testBatchHot(hot) {
		let items = this.getItems();
		return !items.some((item, index) => {
			return item.checked && item.isHot === hot;
		});
	}
	testBatchValid() {
		let items = this.getItems();
		return !items.some((item, index) => {
			return item.checked && !item.valid;
		});
	}
	setBatchHot(hot) {
		let items = this.getItems();
		items.forEach((item, index) => {
			if (item.checked) {
				item.isHot = hot;
			}
		});
	}
	setBatchOnOffline() {
		let t = this;
		var i = 0;
		var len = t.getItems().length;
		do {
			let items = t.getItems();
			let item = items[i];
			if (item.checked) {
				let adid = item.adid;
				t.removeItem(adid);
				len = t.getItems().length;
			} else {
				i++;
			}
		} while (i < len);
	}
	getCheckedKeyIds() {
		let keyids = [];
		this.getItems().forEach((item, index) => {
			if (item.checked) {
				keyids.push(item.adid);
			}
		});
		return keyids;
	}
	getItem(adid) {
		return this.list.getItem(adid);
	}
	getItems() {
		return this.list.getItems();
	}
	addItems(list) {
		//document.getElementById("output").innerHTML += "<br>this.allselected:" + this.allselected;
		this.list.addItems(list);
		this.changeBatch(this.enablebatch);
		this.selectAllItems(this.allselected);
	}
	removeItem(adid) {
		this.list.removeItem(adid);
	}
	removeItems(adids) {
		this.list.removeItems(adids);
	}
	removeAllItems() {
		this.list.removeAllItems();
	}
}

export default ListModel;