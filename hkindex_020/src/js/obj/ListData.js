import ListItemObj from './ListItemObj';
class ListData {
	constructor() {
		this.list = [];
	}
	getItem(adid) {
		//console.log("getItem");
		let items = this.list.filter((item, index) => {
			return item.adid === adid;
		});
		if (items) {
			return items[0];
		} else {
			throw new Error("找不到指定广告");
		}
	}
	getItems() {
		//console.log(this.list);
		return this.list;
	}
	setItem(info) {
		if (!info) {
			throw new Error("设置广告item为空！");
			return;
		}
	}
	addItem(info) {
		if (!info) {
			throw new Error("添加广告item为空！");
			return;
		}
		let item = new ListItemObj(info);
		this.list.push(item);
	}
	addItems(infos) {
		var t = this;
		let list = [...this.list];
		if (!infos) {
			throw new Error("添加广告list为空！");
			return;
		}
		infos.forEach((item, index) => {
			t.addItem(item);
		});
	}
	removeItem(adid) {
		let list = this.list;
		list.forEach((item, index) => {
			if (item["adid"] === adid) {
				list.splice(index, 1);
			}
		});
	}
	removeItems(ads) {
		var t = this;
		if (!ads || ads.length === 0) {
			throw new Error("待删除的广告list为空！");
			return;
		}
		let removeIds = [...ads];
		removeIds.forEach(function(id, index) {
			t.removeItem(id);
		});
	}
	removeAllItems() {
		this.list = [];
	}
}

export default ListData;