import {
	SORT_ANY,
	SORT_EXPIRES_ASCENDE,
	SORT_EXPIRES_DESCENDE,
	SORT_PRICE_ASCENDE,
	SORT_PRICE_DESCENDE,
	SORT_SIZE_ASCENDE,
	SORT_SIZE_DESCENDE,
	GROUP_TYPE_MULTI,
	GROUP_TYPE_SINGLE,
	GROUP_PLOT,
	GROUP_SORT,
	GROUP_MORE,
	GROUP_STATUS
} from './Const';
class FilterObj {
	constructor() {
		this.sorts = [];
		this.communitys = [];
		this.isNew = false;
		this.isFollow = false;
		this.isHot = false;
		this.notHot = false;
		this.community = '';
		this.sortvalue = 0;
		this.groupList = [];
		this.status = "S";
		this.hasGetEstNames = false;
		this.hasGetEstStatus = false;
	}
	setFilter(fltlist) {
		if (!fltlist || fltlist.length === 0) {
			throw new Error("筛选列表为空！");
		}
		fltlist.forEach((item, index) => {
			let group = new Group(item.id, item.groupName, item.value, item.list, item.type, item.active);
			this.groupList.push(group);
		});
	}
	getGroupById(groupid) {
		let group;
		this.groupList.forEach((item, index) => {
			if (item.id == groupid) {
				group = item;
			}
		});
		return group;
	}
	setGroupCondition(groupid, value, selected) {
		this.getGroupById(groupid).selectItem(value);
		//console.log(this.getGroupById(groupid));
	}
	setPlotList(plots) {
		let groupPlot = this.getGroupById(GROUP_PLOT);
		if (!groupPlot) {
			return;
		}
		groupPlot.clearList();
		groupPlot.addItem({
			label: "不限",
			value: "0",
			type: "single",
			selected: true
		});
		plots.forEach((item, index) => {
			let filteritem = new FilterItem(item.EstateName, item.KeyId, false);
			groupPlot.addItem(filteritem);
		});
	}
	setStatusList(status) {
		let groupStatus = this.getGroupById(GROUP_STATUS);
		if (!groupStatus) {
			return;
		}
		groupStatus.clearList();
		groupStatus.addItem({
			label: "不限",
			value: "0",
			type: "single",
			selected: true
		});
		status.forEach((item, index) => {
			let filteritem = new FilterItem(item.ItemText, item.ItemValue, false);
			groupStatus.addItem(filteritem);
		});
	}
	getFilter() {
		return this.groupList;
	}
	selectGroup(groupid) {
		this.groupList.forEach((item, index) => {
			if (groupid === item.id) {
				item.active = true;
			} else {
				item.active = false;
			}
		});
	}
	getPlotSelect() {
		let plots = this.getGroupById(GROUP_PLOT);
		if (!plots) {
			return;
		}
		let selectItems = plots.getSelectItems();
		return selectItems[0].value;
	}
	getSortSelect() {
		let sorts = this.getGroupById(GROUP_SORT);
		if (!sorts) {
			return;
		}
		let selectItems = sorts.getSelectItems();
		return selectItems[0].value;
	}
	getMoreSelect() {
		let more = this.getGroupById(GROUP_MORE);
		if (!more) {
			return;
		}
		let selectItems = more.getSelectItems();
		return selectItems.map((item, index) => item.value);
	}
	getStatusSelect() {
		let status = this.getGroupById(GROUP_STATUS);
		if (!status) {
			return;
		}
		let selectItems = status.getSelectItems();
		return selectItems[0].value;
	}
	getFilterResult() {
		let ret = {};
		let community = this.getPlotSelect();
		if (community && community != '0') {
			ret["EstateKeyId"] = community;
		}
		let sorts = this.getSortSelect();
		if (sorts) {
			let sortField = sorts.split(",")[0];
			let sortValue = Boolean(parseInt(sorts.split(",")[1]));
			let isHots = [];
			let isNew = [];
			if (sortField) {
				ret["SortField"] = sortField == '0' ? '' : sortField;
			}
			if (sortValue) {
				ret["Ascending"] = Boolean(sortValue);
			}
		}
		let mores = this.getMoreSelect();
		if (mores) {
			let isHots = [];
			let isNew = [];
			mores.forEach((item, index) => {
				if (item && item.indexOf("hot") != -1) {
					isHots.push(item.split(",")[1]);
					if (isHots.length < 2) {
						ret["IsHotProperty"] = Boolean(parseInt(isHots[0]));
					} else {
						ret["IsHotProperty"] = '';
					}
				} else if (item && item.indexOf("new") != -1) {
					isNew.push(item.split(",")[1]);
					if (isNew.length < 2) {
						ret["IsNewProperty"] = Boolean(parseInt(isNew[0]));
					} else {
						ret["IsNewProperty"] = '';
					}
				}
			});
		}
		let status = this.getStatusSelect();
		if (status) {
			ret["PropertyStatusKeyId"] = status;
		}
		return ret;
	}
	changeSortValue(value) {
		this.sortvalue = value;
	}
	resetFilters() {
		this.isNew = false;
		this.isFollow = false;
		this.isHot = false;
		this.notHot = false;
		this.community = '';
		this.sortvalue = 0;
		this.groupList.forEach((item, index) => {
			if (index === 0) {
				item.active = true;
			} else {
				item.active = false;
			}
			item.reset();
		});
	}
}

class Group {
	constructor(id, name, value, list, type, active = false) {
		this.id = id;
		this.type = type || GROUP_TYPE_SINGLE;
		this.value = value;
		this.active = active;
		this.groupName = name || "";
		this.groupList = list || [];
	}
	setGroupList(list = []) {
		if (!list || list.length === 0) {
			return;
		}
		list.forEach(function(item, index) {
			let filteritem = new FilterItem(item["label"], item["value"], item["selected"], item["type"]);
			this.groupList.push(filteritem);
		});
	}
	addItem(item) {
		this.groupList.push(item);
	}
	selectItem(value) {
		var t = this;
		this.groupList.forEach(function(item, index) {
			if (t.type === GROUP_TYPE_SINGLE) {
				if (item.value == value) {
					item.selected = true;
				} else {
					item.selected = false;
				}
			} else {
				if (value === 0) {
					if (item.value === 0) {
						item.selected = true;
					} else {
						item.selected = false;
					}
				} else {
					if (item.value === value) {
						item.selected = !item.selected;
					} else if (item.value === 0) {
						item.selected = false;
					}
				}
			}
		});
		let selectItemsCount = this.getSelectItems().length;
		if (selectItemsCount === 0) {
			let unlimited = this.groupList.filter((item, index) => {
				return item.value == 0;
			});
			unlimited[0].selected = true;
		}
	}
	getSelectItems() {
		return this.groupList.filter((item, index) => {
			return item.selected === true;
		});
	}
	clearList() {
		this.groupList = [];
	}
	reset() {
		this.groupList.forEach((item, index) => {
			if (item.value == 0) {
				item.selected = true;
			} else {
				item.selected = false;
			}
		});
	}
}

class FilterItem {
	constructor(label, value, selected, type) {
		this.label = label;
		this.value = value;
		this.type = type || GROUP_TYPE_SINGLE;
		this.selected = selected;
	}
}
export default FilterObj;